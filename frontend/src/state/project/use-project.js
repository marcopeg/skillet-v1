/**
 * Loads a Project's full data set and keeps it in sync
 * with the server when changes happen in the current client or others.
 *
 * It keeps a subscription to a complex query and in the future we will
 * likely need to simplify this query to reduce load on Postgres.
 */

import React, { useContext, createContext, useEffect, useMemo } from "react";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import useAuth from "../../hooks/use-auth";

export const GET_PROJECT_BY_ID = gql`
  query getProjectById($projectId: String!) {
    project: projects_by_pk(id: $projectId) {
      id
      title
      description
    }
    lastUpdate: projects_cache_by_pk(project_id: $projectId) {
      date: updated_at
    }
    propGroups: prop_groups(order_by: { order: desc, id: asc }) {
      id
      name
    }
    propValues: prop_values(order_by: { order: desc, id: asc }) {
      id
      name
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

// Filtering utilities to remove the "__typename" from the received data
const filterTypename = ["__typename"];
const removeProps = (data = {}, props = []) =>
  Object.keys(data)
    .filter((key) => !props.includes(key))
    .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {});
const removeTypename = ($) => removeProps($, filterTypename);

const formatProjectData = (data) => {
  if (!data) return null;

  return {
    project: removeProps(data.project, filterTypename),
    lastUpdate: removeProps(data.lastUpdate, filterTypename),
    propGroups: data.propGroups.map(removeTypename),
    propValues: data.propValues.map(removeTypename),
    resGroups: data.resGroups.map(removeTypename),
    resValues: data.resValues.map(removeTypename),
    entries: data.entries.map(removeTypename)
  };
};

export const ProjectProvider = ({ projectId, children }) => {
  const { token, setToken } = useAuth();

  const { data, loading, refetch } = useQuery(GET_PROJECT_BY_ID, {
    variables: { projectId },
    fetchPolicy: "network-only"
  });

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
      data: formatProjectData(data)
    }),
    [data]
  );

  // Generate the project's token to scope the data access
  useEffect(() => {
    createProjectToken()
      .then((res) => {
        setToken(res.data.project.accessToken);
        return refetch();
      })
      .catch((err) => {
        console.error("Could not generate the project token");
        console.error(err.message);
      });

    return () => setToken(null);
  }, [createProjectToken, setToken, refetch]);

  // Forces to reload the SkillMatrix when it detects a change from the websocket
  useEffect(() => {
    refetch();
  }, [subData, refetch]);

  const renderEl = token ? children : "Loading project...";
  return <ProjectContext.Provider value={value} children={renderEl} />;
};

export const useProject = () => useContext(ProjectContext);
export default useProject;
