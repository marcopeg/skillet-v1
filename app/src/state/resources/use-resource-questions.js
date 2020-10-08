/* eslint-disable */

import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";

import useBoardByResourceId from "../board/use-board-by-resource-id";

const useResourceQuestions = (resourceId) => {
  const { data: board, ...otherDetails } = useBoardByResourceId(resourceId);

  const questions = useMemo(() => {
    if (!board) return [];

    console.log(board);

    const sorted = board.entries.sort((a, b) => {
      if (a.value === null) return -1;
      // @TODO: updatedAt should already come back as date
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return sorted.map((answer) => ({
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
