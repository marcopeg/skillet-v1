HELLO WORLD

```js
import { useState } from "react";
const useFakeProps = () => {
  const questions = [
    {
      question: {
        id: 1,
        name: "CRUD",
        description: `As a developer, I'm able to **R**ead, **W**rite, **U**pdate and **D**elete data from a table that I've set up.`,
        settings: {
          question: {}
        }
      },
      group: {
        id: 1,
        name: "Postgres"
      }
    },
    {
      question: {
        id: 2,
        name: "Indexes",
        description: `As a developer, I'm able to optimize data access to a table by **defining indexes** on one or multiple columns.`,
        settings: {
          question: {}
        }
      },
      group: {
        id: 1,
        name: "Postgres"
      }
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return {
    isFirstSlide: activeIndex === 0,
    canSubmit: false,
    questions,
    activeIndex,
    activeQuestion: questions[activeIndex],
    setActiveIndex,
    requestSubmit: () => {}
  };
};
<IonWrapper>
  <SlidingQuestions {...useFakeProps()} />
</IonWrapper>;
```
