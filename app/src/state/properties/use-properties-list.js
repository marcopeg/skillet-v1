import { gql, useQuery } from "@apollo/client";

export const LOAD_PROPERTIES_LIST = gql`
  query propertiesList {
    groups: prop_groups(order_by: { order: desc, id: asc }) {
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
  const { loading, data, refetch } = useQuery(LOAD_PROPERTIES_LIST, {
    fetchPolicy: "network-only"
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
