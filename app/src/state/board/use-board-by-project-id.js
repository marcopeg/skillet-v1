import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { formatProjectData } from "../project/format-project-data";

export const LOAD_BOARD_BY_PROJECT_ID = gql`
  query loadBoardById {
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
      settings
      groupId: prop_group_id
    }
    resGroups: res_groups(order_by: { order: desc, id: asc }) {
      id
      name
    }
    resValues: res_values(order_by: { order: desc, id: asc }) {
      id
      name
      groupId: res_group_id
    }
    entries {
      propId: prop_value_id
      resId: res_value_id
      value
      updatedAt: updated_at
    }
  }
`;

const useBoardByProjectId = resourceId => {
  const { projectId } = useParams();
  const { data, loading } = useQuery(LOAD_BOARD_BY_PROJECT_ID, {
    fetchPolicy: "network-only"
  });

  return useMemo(
    () => ({
      projectId,
      isReady: !!data,
      isLoading: loading,
      data: formatProjectData(data, "byId")
    }),
    [data, loading, projectId]
  );
};

export default useBoardByProjectId;
