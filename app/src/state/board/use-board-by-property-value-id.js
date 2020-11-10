import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { formatProjectData } from "../project/format-project-data";

export const LOAD_BOARD_BY_PROPERTY_VALUE_ID = gql`
  query loadBoardByPropertyValueId($propertyId: Int!) {
    projects {
      id
      title
      description
      settings
    }
    propGroups: prop_groups(
      where: { prop_values: { id: { _eq: $propertyId } } }
      order_by: { order: desc, id: asc }
    ) {
      id
      name
      settings
    }
    propValues: prop_values(
      where: { id: { _eq: $propertyId } }
      order_by: { order: desc, id: asc }
    ) {
      id
      name
      groupId: prop_group_id
      description
      url_docs: data(path: "url_docs")
      settings
      group: prop_group {
        id
        name
        settings
      }
      project {
        settings
      }
    }
    resGroups: res_groups(order_by: { order: desc, id: asc }) {
      id
      name
    }
    resValues: res_values(order_by: { order: desc, id: asc }) {
      id
      name
      description
      groupId: res_group_id
    }
    entries(where: { prop_value_id: { _eq: $propertyId } }) {
      propId: prop_value_id
      resId: res_value_id
      value
      updatedAt: updated_at
    }
  }
`;

const useBoardByPropertyValueId = propertyId => {
  const { projectId } = useParams();
  const { data, loading, refetch } = useQuery(LOAD_BOARD_BY_PROPERTY_VALUE_ID, {
    variables: { propertyId },
    fetchPolicy: "network-only"
  });

  // Calculate the board and memorize the value for performances
  const board = useMemo(() => formatProjectData(data, "byId"), [data]);

  return {
    isLoading: loading,
    isReady: loading === false && data !== null,
    projectId,
    board,
    refetch: () => refetch()
  };
};

export default useBoardByPropertyValueId;
