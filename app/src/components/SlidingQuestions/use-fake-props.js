import { useState } from "react";
import { PROJECT_DEFAULTS } from "../../state/project/project-default-settings";

const DEFAULT_SLIDES = [
  {
    answer: {
      value: 20,
      propId: 1,
      resId: 22
    },
    question: {
      id: 1,
      name: "CRUD",
      description: `
As a developer, I'm able to **R**ead, **W**rite, **U**pdate and **D**elete data from a table that I've set up.`,
      settings: {
        question: {
          type: "slider",
          options: PROJECT_DEFAULTS.question.options
        }
      }
    },
    group: {
      id: 1,
      name: "Postgres"
    }
  },
  {
    answer: {
      value: null,
      propId: 1,
      resId: 22
    },
    question: {
      id: 2,
      name: "Indexes",
      _description: `As a developer, I'm able to optimize data access to a table by **defining indexes** on one or multiple columns.`,
      settings: {
        question: {
          type: "stars",
          options: PROJECT_DEFAULTS.question.options
        }
      }
    },
    group: {
      id: 1,
      name: "Postgres"
    }
  },
  {
    answer: {
      value: null,
      propId: 3,
      resId: 22
    },
    question: {
      id: 3,
      name: "Triggers",
      description: `https://en.wikipedia.org/wiki/Single-responsibility_principle`,
      settings: {
        question: {
          type: "stars",
          options: PROJECT_DEFAULTS.question.options
        }
      }
    },
    group: {
      id: 1,
      name: "Postgres"
    }
  }
];

const useFakeProps = (slides = DEFAULT_SLIDES, initialSlide = 0) => {
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const getCurrentQuestion = () => slides[activeIndex];

  const [values, setValues] = useState(
    slides.reduce((acc, $) => ({ ...acc, [$.question.id]: $.answer.value }), {})
  );
  const setValue = slide => value =>
    setValues({
      ...values,
      [slide.question.id]: value
    });
  const getValue = slide => (slide ? values[slide.question.id] : null);

  return {
    isFirstSlide: activeIndex === 0,
    canSubmit: getValue(slides[activeIndex]) !== null,
    slides: slides,
    activeSlide: {
      ...slides[activeIndex],
      __index: activeIndex
    },
    getValue,
    setValue,
    setActiveIndex,
    submitSlide: async () => {
      const slide = slides[activeIndex];

      console.log("@submit", slide, {
        prop_value_id: slide.answer.propId,
        res_value_id: slide.answer.resId,
        value: values[slide.question.id]
      });
    }
  };
};

export default useFakeProps;
