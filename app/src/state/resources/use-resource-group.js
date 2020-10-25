import { useParams } from "react-router-dom";
import useBoardByResourceGroupId from "../board/use-board-by-resource-group-id";

const useResourceGroup = () => {
  const { projectId, groupId } = useParams();
  const { board, isLoading, isReady } = useBoardByResourceGroupId(groupId);

  const group = board ? board.map.res.groups[groupId] : null;

  return {
    projectId,
    groupId,
    isReady,
    isLoading,
    hasError: !isReady && !isLoading,
    board,
    group
  };
};

export default useResourceGroup;
