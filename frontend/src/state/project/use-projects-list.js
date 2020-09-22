import { gql, useQuery } from "@apollo/client";

export const LOAD_PROJECTS_LIST = gql`
  query projectsList {
    projects: projects_public_list {
      id
      created_at
      description
      title
      updated_at
    }
  }
`;

const useProjectsList = () => {
  const { data, error, loading, refetch } = useQuery(LOAD_PROJECTS_LIST, {
    fetchPolicy: "network-only"
  });

  return {
    isLoading: loading,
    items: data ? data.projects : null,
    error,
    refetch
  };
};

export default useProjectsList;
