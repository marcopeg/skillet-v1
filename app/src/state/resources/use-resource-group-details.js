/* eslint-disable */

import { useParams } from "react-router-dom";
import useBoardByResourceGroupId from "../board/use-board-by-resource-group-id";

const useResourceGroupDetails = () => {
  const { projectId, groupId } = useParams();
  const { data, isLoading, isReady } = useBoardByResourceGroupId(groupId);

  const group = isReady ? data.map.res.groups[groupId] : null;

  return {
    projectId,
    groupId,
    isReady,
    isLoading,
    hasError: !isReady && !isLoading,
    board: data,
    group
  };
};

export default useResourceGroupDetails;
