import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { formatProjectData } from "../project/format-project-data";

export const LOAD_BOARD_BY_RESOURCE_GROUP_ID = gql`
  query loadBoardByResourceGroupId($groupId: Int!) {
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
      where: { id: { _eq: $groupId } }
    ) {
      id
      name
    }
    resValues: res_values(
      order_by: { order: desc, id: asc }
      where: { res_group_id: { _eq: $groupId } }
    ) {
      id
      name
      groupId: res_group_id
    }
    entries(where: { res_value: { res_group_id: { _eq: $groupId } } }) {
      propId: prop_value_id
      resId: res_value_id
      value
      updatedAt: updated_at
    }
  }
`;

const useBoardByResourceGroupId = groupId => {
  const { projectId } = useParams();
  const { data, loading } = useQuery(LOAD_BOARD_BY_RESOURCE_GROUP_ID, {
    variables: { groupId },
    fetchPolicy: "network-only"
  });

  return useMemo(
    () => ({
      projectId,
      isLoading: loading,
      isReady: loading === false && data !== null,
      data: formatProjectData(data, "byId")
    }),
    [data, loading, projectId]
  );
};

export default useBoardByResourceGroupId;
