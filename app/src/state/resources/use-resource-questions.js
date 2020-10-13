import { useMemo, useState, useEffect } from "react";
import useBoardByResourceId from "../board/use-board-by-resource-id";

// STATIC QUESTIONS
// The slider doesn't work well with dynamic contents.
// here we use a cheap trick so to lock the questions data
// after first data load:
const useStaticQuestions = dynamicQuestions => {
  const [etag, setEtag] = useState(0);
  const staticQuestions = useMemo(() => [...dynamicQuestions], [etag]);
  useEffect(() => {
    if (etag === 0 && dynamicQuestions.length > 0) {
      setEtag(1);
    }
  }, [dynamicQuestions]);

  return staticQuestions;
};

const useQuestionsValues = questions => {
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues(
      questions.reduce(
        (acc, $) => ({ ...acc, [$.question.id]: $.answer.value }),
        {}
      )
    );
  }, [questions]);

  const setValue = slide => value =>
    setValues({
      ...values,
      [slide.question.id]: value
    });

  return {
    values,
    setValue
  };
};

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
    questions,
    ...useQuestionsValues(questions),
    staticQuestions: useStaticQuestions(questions)
  };
};

export default useResourceQuestions;
