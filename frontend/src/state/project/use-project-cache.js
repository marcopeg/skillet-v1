/**
 * Loads a Project's full data set and keeps it in sync
 * with the server when changes happen in the current client or others.
 *
 * It keeps a subscription to a complex query and in the future we will
 * likely need to simplify this query to reduce load on Postgres.
 */

import React, { useContext, createContext } from "react";
import { gql, useSubscription } from "@apollo/client";

export const GET_PROJECT_BY_ID = gql`
  subscription getProjectById($projectId: String!) {
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
  const { data, loading } = useSubscription(GET_PROJECT_BY_ID, {
    variables: { projectId },
    fetchPolicy: "network-only"
  });

  const value = {
    projectId,
    isReady: !!data,
    isLoading: loading,
    lastUpdate:
      data && data.project.lastUpdate.length
        ? data.project.lastUpdate[0].updated_at
        : null,
    data: formatProjectData(data)
  };

  return <ProjectCacheContext.Provider value={value} children={children} />;
};

export const useProjectCache = () => useContext(ProjectCacheContext);
export default useProjectCache;
