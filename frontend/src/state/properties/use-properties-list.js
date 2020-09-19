import { gql, useQuery } from "@apollo/client";

import useProjectCache from "../use-project-cache";

export const LOAD_PROPERTIES_LIST = gql`
  query propertiesList($projectId: String) {
    groups: prop_groups(
      where: { project_id: { _eq: $projectId } }
      order_by: { order: desc, id: asc }
    ) {
      id
      name
      description
      order
      values: prop_values(order_by: { order: desc, id: asc }) {
        id
        prop_group_id
        name
        description
        tags
        order
      }
    }
  }
`;

const usePropertiesList = () => {
  const { projectId } = useProjectCache();

  const { loading, data, refetch } = useQuery(LOAD_PROPERTIES_LIST, {
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

export default usePropertiesList;
