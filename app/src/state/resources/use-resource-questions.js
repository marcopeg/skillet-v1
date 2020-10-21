import { useMemo, useState, useEffect } from "react";
import useBoardByResourceId from "../board/use-board-by-resource-id";
import useEntryUpsert from "../use-entry-upsert";

// STATIC QUESTIONS
// The slider doesn't work well with dynamic contents.
// here we use a cheap trick so to lock the questions data
// after first data load:
const useStaticQuestions = dynamicQuestions => {
  const [etag, setEtag] = useState(0);

  // Observe the first data load to force the memo to update
  useEffect(() => {
    if (etag === 0 && dynamicQuestions.length > 0) {
      setEtag(1);
    }
  }, [dynamicQuestions]); // eslint-disable-line

  // Only the `etag`can change the value of this memo
  return useMemo(() => [...dynamicQuestions], [etag]); // eslint-disable-line
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

  const getValue = slide => values[slide.question.id];

  return {
    values,
    getValue,
    setValue
  };
};

const useSortedQuestions = board =>
  useMemo(() => {
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

const useResourceQuestions = resourceId => {
  const { upsertEntry } = useEntryUpsert();
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: board } = useBoardByResourceId(resourceId);

  const questions = useSortedQuestions(board);
  const slides = useStaticQuestions(questions);
  const { values, setValue, getValue } = useQuestionsValues(slides);

  const activeSlide = slides[activeIndex];
  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex >= slides.length - 1;

  const canSubmit = useMemo(() => {
    return activeSlide ? values[activeSlide.question.id] !== null : false;
  }, [activeSlide, values]);

  const requestSubmit = () =>
    upsertEntry({
      prop_value_id: activeSlide.answer.propId,
      res_value_id: activeSlide.answer.resId,
      value: values[activeSlide.question.id]
    });

  console.log(">>", slides);

  return {
    isReady: Boolean(activeSlide),
    board,
    slides,
    values,
    setValue,
    getValue,
    activeSlide,
    isFirstSlide,
    isLastSlide,
    setActiveIndex,
    canSubmit,
    requestSubmit
  };
};

export default useResourceQuestions;
