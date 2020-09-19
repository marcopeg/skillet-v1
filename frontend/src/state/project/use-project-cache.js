import React, { useContext, createContext } from "react";
import { gql, useQuery } from "@apollo/client";

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
    }
  }
`;

const getData = (load, sub) => {
  if (sub.data) return sub.data;
  if (load.data) return load.data;
  return null;
};

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

  const value = {
    projectId,
    isReady: !!load.data,
    isLoading: load.loading,
    lastUpdate: null,
    data: formatProjectData(load.data)
  };

  return <ProjectCacheContext.Provider value={value} children={children} />;
};

export const useProjectCache = () => useContext(ProjectCacheContext);
export default useProjectCache;
