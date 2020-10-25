import React from "react";
import useSlidingQuestions from "./use-sliding-questions";
import SlidingQuestionsUI from "../components/SlidingQuestions";

const SlidingQuestions = ({ resourceId, board, onSubmit }) => {
  const { requestSubmit, ...props } = useSlidingQuestions({
    resourceId,
    board,
    onSubmit
  });
  return <SlidingQuestionsUI {...props} onRequestSubmit={requestSubmit} />;
};

export default SlidingQuestions;
