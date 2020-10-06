/**
 * Loads a Project's full data set and keeps it in sync
 * with the server when changes happen in the current client or others.
 *
 * It keeps a subscription to a complex query and in the future we will
 * likely need to simplify this query to reduce load on Postgres.
 */

import React, { useContext, createContext, useEffect, useMemo } from "react";
import {
  gql,
  useMutation,
  useLazyQuery,
  useSubscription
} from "@apollo/client";
import useAuth from "../../hooks/use-auth";
import { formatProjectData } from "./format-project-data";

/*
Gets only part of a Skill Matrix isolating data by listing the visible groups.

Good article about EXPLAIN/ANALYZE
http://www.louisemeta.com/blog/explain-2/

QUERY:
query MyQuery($propGroups: [Int!], $resGroups: [Int!]) {
  projects {
    id
    title
    description
  }
  propGroups: prop_groups(where: {id: {_in: $propGroups}}, order_by: {order: desc, id: asc}) {
    id
    name
  }
  propValues: prop_values(order_by: {order: desc, id: asc}, where: {prop_group: {id: {_in: $propGroups}}}) {
    id
    name
    groupId: prop_group_id
  }
  resGroups: res_groups(order_by: {order: desc, id: asc}, where: {id: {_in: $resGroups}}) {
    id
    name
  }
  resValues: res_values(order_by: {order: desc, id: asc}, where: {res_group: {id: {_in: $resGroups}}}) {
    id
    name
    groupId: res_group_id
  }
  entries(where: {_and: {prop_value: {prop_group: {id: {_in: $propGroups}}}, res_value: {res_group: {id: {_in: $resGroups}}}}}) {
    propId: prop_value_id
    resId: res_value_id
    value
    updatedAt: updated_at
  }
}

VARIABLES:
{
  "propGroups": [21],
  "resGroups":[6, 7]
}
*/

export const GET_PROJECT_BY_ID = gql`
  query getProjectById {
    projects {
      id
      title
      description
      settings
    }
    propGroups: prop_groups(order_by: { order: desc, id: asc }) {
      id
      name
      settings
    }
    propValues: prop_values(order_by: { order: desc, id: asc }) {
      id
      name
      settings
      groupId: prop_group_id
    }
    resGroups: res_groups(order_by: { order: desc, id: asc }) {
      id
      name
    }
    resValues: res_values(order_by: { order: desc, id: asc }) {
      id
      name
      groupId: res_group_id
    }
    entries {
      propId: prop_value_id
      resId: res_value_id
      value
      updatedAt: updated_at
    }
  }
`;

export const CREATE_PROJECT_TOKEN = gql`
  mutation createProjectToken($projectId: String!) {
    project: createProjectToken(projectId: $projectId) {
      accessToken
    }
  }
`;

export const GET_PROJECT_UPDATES = gql`
  subscription projectUpdates($projectId: String!) {
    projects_cache_by_pk(project_id: $projectId) {
      updated_at
    }
  }
`;

const ProjectContext = createContext();

export const ProjectProvider = ({ projectId, children }) => {
  const { token, setToken } = useAuth();

  const [loadProject, { data, loading, refetch }] = useLazyQuery(
    GET_PROJECT_BY_ID,
    {
      fetchPolicy: "network-only"
    }
  );

  const [createProjectToken] = useMutation(CREATE_PROJECT_TOKEN, {
    variables: { projectId }
  });

  const { data: subData } = useSubscription(GET_PROJECT_UPDATES, {
    variables: { projectId },
    fetchPolicy: "network-only"
  });

  const value = useMemo(
    () => ({
      projectId,
      isReady: !!data,
      isLoading: loading,
      data: formatProjectData(data) // does all the calculations, could get SLOW!
    }),
    [data, loading, projectId]
  );

  // console.log(value);

  // Generate the project's token to scope the data access
  useEffect(() => {
    createProjectToken()
      .then(res => {
        setToken(res.data.project.accessToken);
        return loadProject();
      })
      .catch(err => {
        console.error("Could not generate the project token");
        console.error(err.message);
      });

    return () => setToken(null);
  }, [createProjectToken, setToken, loadProject]);

  // Forces to reload the SkillMatrix when it detects a change from the websocket
  useEffect(() => {
    refetch && refetch();
  }, [subData, refetch]);

  const renderEl = token ? children : "Loading project...";
  return <ProjectContext.Provider value={value} children={renderEl} />;
};

export const useProject = () => useContext(ProjectContext);
export default useProject;
