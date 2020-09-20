import { gql, useQuery } from "@apollo/client";

import useProject from "../project/use-project";

export const LOAD_RESOURCES_LIST = gql`
  query propertiesList($projectId: String) {
    groups: res_groups(
      where: { project_id: { _eq: $projectId } }
      order_by: { order: desc, id: asc }
    ) {
      id
      name
      description
      order
      values: res_values(order_by: { order: desc, id: asc }) {
        id
        res_group_id
        name
        description
        tags
        order
      }
    }
  }
`;

const useResourcesList = () => {
  const { projectId } = useProject();

  const { loading, data, refetch } = useQuery(LOAD_RESOURCES_LIST, {
    variables: { projectId },
    fetchPolicy: "cache-first"
  });

  const refresh = (event) => {
    refetch()
      .then(() => event.detail.complete())
      .catch((err) => console.error(err));
  };

  return {
    isLoading: loading,
    groups: data ? data.groups : [],
    refresh
  };
};

export default useResourcesList;
