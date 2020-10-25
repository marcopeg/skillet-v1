import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { formatProjectData } from "../project/format-project-data";

export const LOAD_BOARD_BY_RESOURCE_VALUE_ID = gql`
  query loadBoardByResourceValueId($resourceId: Int!) {
    projects {
      id
      title
      description
      settings
    }
    propGroups: prop_groups(order_by: { order: desc, id: asc }) {
      id
      name
      settings
    }
    propValues: prop_values(order_by: { order: desc, id: asc }) {
      id
      name
      groupId: prop_group_id
      description
      url_docs: data(path: "url_docs")
      settings
    }
    resGroups: res_groups(
      order_by: { order: desc, id: asc }
      where: { res_values: { id: { _eq: $resourceId } } }
    ) {
      id
      name
    }
    resValues: res_values(
      order_by: { order: desc, id: asc }
      where: { id: { _eq: $resourceId } }
    ) {
      id
      name
      description
      groupId: res_group_id
    }
    entries(where: { res_value_id: { _eq: $resourceId } }) {
      propId: prop_value_id
      resId: res_value_id
      value
      updatedAt: updated_at
    }
  }
`;

const useBoardByResourceValueId = resourceId => {
  const { projectId } = useParams();
  const { data, loading, refetch } = useQuery(LOAD_BOARD_BY_RESOURCE_VALUE_ID, {
    variables: { resourceId },
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

export default useBoardByResourceValueId;
