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

const useProjectCache = (projectId) => {
  const load = useQuery(LOAD_PROJECT_CACHE, {
    variables: { projectId }
  });

  const sub = useSubscription(GET_PROJECT_CACHE, {
    variables: { projectId }
  });

  const data = getData(load, sub);

  return {
    isReady: !!data,
    isLoading: load.loading || sub.loading,
    id: projectId,
    lastUpdate: data ? data.project.updated_at : null,
    data: data ? data.project.data : null
  };
};

export default useProjectCache;
