import React from "react";
import useResourceQuestions from "../state/resources/use-resource-questions";
import SlidingQuestionsUI from "../components/SlidingQuestions";

// TODO: return loading spinner while awaitng for data.
const SlidingQuestions = ({ resourceId }) => {
  const { isReady, requestSubmit, ...props } = useResourceQuestions(resourceId);
  return isReady ? (
    <SlidingQuestionsUI {...props} onRequestSubmit={requestSubmit} />
  ) : null;
};

export default SlidingQuestions;
