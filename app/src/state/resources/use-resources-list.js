import { gql, useQuery } from "@apollo/client";

export const LOAD_RESOURCES_LIST = gql`
  query loadResourcesList {
    groups: res_groups(order_by: { order: desc, id: asc }) {
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
  const { loading, data, refetch } = useQuery(LOAD_RESOURCES_LIST, {
    fetchPolicy: "network-only"
  });

  const refresh = event => {
    refetch()
      .then(() => event.detail.complete())
      .catch(err => console.error(err));
  };

  return {
    isLoading: loading,
    groups: data ? data.groups : [],
    refresh
  };
};

export default useResourcesList;
