import { useMemo } from "react";
import useBoardByResourceId from "../board/use-board-by-resource-id";

const useResourceQuestions = resourceId => {
  const { data: board, isLoading, ...otherDetails } = useBoardByResourceId(
    resourceId
  );

  const questions = useMemo(() => {
    if (!board) return [];

    const sorted = board.entries.sort((a, b) => {
      if (a.value === null) return -1;
      return a.updatedAt - b.updatedAt;
    });

    return sorted.map(answer => ({
      group:
        board.map.prop.groups[board.map.prop.values[answer.propId].groupId],
      question: board.map.prop.values[answer.propId],
      answer
    }));
  }, [board]);

  return {
    ...otherDetails,
    board,
    questions
  };
};

export default useResourceQuestions;
