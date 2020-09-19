import React, { useContext, createContext } from "react";
import { gql, useQuery, useSubscription } from "@apollo/client";

export const LOAD_PROJECT_BY_ID = gql`
  query getProjectById($projectId: String!) {
    project: projects_by_pk(id: $projectId) {
      id
      title
      updated_at
      prop_groups(order_by: { order: desc, id: asc }) {
        id
        name
        description
        order
        prop_values(order_by: { order: desc, id: asc }) {
          id
          name
          description
          order
          tags
        }
      }
      prop_values(order_by: { order: desc, id: asc }) {
        id
        prop_group_id
        name
        description
        order
        tags
      }
      res_groups(order_by: { order: desc, id: asc }) {
        id
        name
        description
        order
        res_values(order_by: { order: desc, id: asc }) {
          id
          name
          description
          order
          tags
          entries {
            prop_value_id
            res_value_id
            updated_at
            description
            value
          }
        }
      }
      lastUpdate: entries(
        limit: 1
        order_by: { updated_at: desc }
        where: { project_id: { _eq: $projectId } }
      ) {
        updated_at
      }
    }
  }
`;

const SUBSCRIBE_PROJECT_CACHE = gql`
  subscription getProjectCache($projectId: String!) {
    project: projects_cache_by_pk(project_id: $projectId) {
      data
      project_id
      updated_at
    }
  }
`;

const ProjectCacheContext = createContext();

const formatProjectData = (data) => {
  if (!data) return null;
  const { prop_groups, prop_values, res_groups, ...project } = data.project;
  return {
    project,
    prop_groups,
    prop_values,
    res_groups
  };
};

export const ProjectCacheProvider = ({ projectId, children }) => {
  const load = useQuery(LOAD_PROJECT_BY_ID, {
    variables: { projectId },
    fetchPolicy: "network-only"
  });

  const sub = useSubscription(SUBSCRIBE_PROJECT_CACHE, {
    variables: { projectId }
  });

  const data = (() => {
    const loadLastUpdate =
      load.data &&
      load.data.project.lastUpdate &&
      load.data.project.lastUpdate.length
        ? load.data.project.lastUpdate[0].updated_at
        : null;

    const subLastUpdate =
      sub.data &&
      sub.data.project.data.lastUpdate &&
      sub.data.project.data.lastUpdate.length
        ? sub.data.project.data.lastUpdate[0].updated_at
        : null;

    console.log(
      "load",
      loadLastUpdate,
      "sub",
      subLastUpdate,
      loadLastUpdate > subLastUpdate,
      sub.data
    );

    return loadLastUpdate > subLastUpdate
      ? load.data
      : sub.data
      ? { project: sub.data.project.data }
      : null;
  })();

  const value = {
    projectId,
    isReady: !!data,
    isLoading: load.loading || sub.loading,
    lastUpdate: null,
    data: formatProjectData(data)
  };

  return <ProjectCacheContext.Provider value={value} children={children} />;
};

export const useProjectCache = () => useContext(ProjectCacheContext);
export default useProjectCache;
