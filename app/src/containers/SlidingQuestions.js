/* eslint-disable */
import React from "react";
import { IonSlides, IonSlide, IonContent } from "@ionic/react";

import useResourceQuestions from "../state/resources/use-resource-questions";

const SlidingQuestions = ({ resourceId }) => {
  const { questions } = useResourceQuestions(resourceId);
  console.log(
    questions.map((slide) => `q-${slide.group.id}-${slide.question.id}`)
  );

  return (
    <IonSlides pager={true}>
      {questions.map((slide) => (
        <IonSlide key={`q-${slide.group.id}-${slide.question.id}`}>
          {slide.group.name}/{slide.question.name}
        </IonSlide>
      ))}
      <IonSlide>
        <h1>Slide 1</h1>
      </IonSlide>
      <IonSlide>
        <h1>Slide 2</h1>
      </IonSlide>
      <IonSlide>
        <h1>Slide 3</h1>
      </IonSlide>
    </IonSlides>
  );
};

export default SlidingQuestions;
