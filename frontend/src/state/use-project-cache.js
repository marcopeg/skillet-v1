import React, { useContext, createContext, useEffect } from "react";
import { gql, useQuery, useSubscription } from "@apollo/client";

const LOAD_PROJECT_CACHE = gql`
  query loadProjectCache($projectId: String!) {
    project: projects_cache_by_pk(project_id: $projectId) {
      data
      project_id
      updated_at
    }
  }
`;

const GET_PROJECT_CACHE = gql`
  subscription getProjectCache($projectId: String!) {
    project: projects_cache_by_pk(project_id: $projectId) {
      data
      project_id
      updated_at
    }
  }
`;

const getData = (load, sub) => {
  if (sub.data) return sub.data;
  if (load.data) return load.data;
  return null;
};

const ProjectCacheContext = createContext();

export const ProjectCacheProvider = ({ projectId, children }) => {
  const load = useQuery(LOAD_PROJECT_CACHE, {
    variables: { projectId }
  });

  const sub = useSubscription(GET_PROJECT_CACHE, {
    variables: { projectId }
  });

  const data = getData(load, sub);

  const value = {
    projectId,
    isReady: !!data,
    isLoading: load.loading || sub.loading,
    lastUpdate: data ? data.project.updated_at : null,
    data: data ? data.project.data : null
  };

  return <ProjectCacheContext.Provider value={value} children={children} />;
};

export const useProjectCache = () => useContext(ProjectCacheContext);
export default useProjectCache;
