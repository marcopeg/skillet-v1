/* eslint-disable */
import "./SlidingQuestions.css";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  IonSlides,
  IonSlide,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonButton,
  IonIcon,
  IonToolbar,
  IonTitle
} from "@ionic/react";

import { checkmarkOutline, chevronBackOutline } from "ionicons/icons";

import useResourceQuestions from "../state/resources/use-resource-questions";
import useEntryUpsert from "../state/use-entry-upsert";

import PropValueForm from "../components/PropValueForm";

const slideOpts = {
  initialSlide: 0,
  speed: 400,
  allowTouchMove: false
};

const useDeferredFlag = (delay = 250) => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setValue(true), delay);
    return () => clearTimeout(timer);
  }, []);

  return value;
};

const SlidingQuestions = ({ resourceId }) => {
  const slidesRef = useRef(null);
  const isVisible = useDeferredFlag();
  const [activeIndex, setActiveIndex] = useState(slideOpts.initialSlide);
  const { upsertEntry } = useEntryUpsert();

  // Load the questions to run and freeze the data
  const { questions, staticQuestions, values, setValue } = useResourceQuestions(
    resourceId
  );

  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex >= questions.length - 1;

  const onSetValue = slide => value => {};

  const onUpdate = slide => value => {
    upsertEntry({
      prop_value_id: slide.answer.propId,
      res_value_id: slide.answer.resId,
      value
    });
    slidesRef.current.slideNext();
  };

  const requestSkip = () => slidesRef.current.slideNext();

  const requestPrev = () => slidesRef.current.slidePrev();

  const onSlideChange = async evt => {
    const activeIndex = await slidesRef.current.getActiveIndex();
    setActiveIndex(activeIndex);
  };

  const requestSubmit = () => {
    const slide = questions[activeIndex];

    upsertEntry({
      prop_value_id: slide.answer.propId,
      res_value_id: slide.answer.resId,
      value: values[slide.question.id]
    }).then(() => {
      slidesRef.current.slideNext();
    });
  };

  // console.log(questions[activeIndex]);
  // const canSubmit = values[questions[activeIndex].question.id] !== null;
  const canSubmit = useMemo(() => {
    const slide = questions[activeIndex];
    return slide ? values[slide.question.id] !== null : false;
  }, [activeIndex, questions, values]);

  if (!isVisible) {
    return false;
  }

  return (
    <IonCard>
      <IonCardHeader color="primary">Self Evaluation:</IonCardHeader>
      <IonCardContent style={{ padding: 0 }}>
        <IonGrid className="sliding-question-inner">
          <IonRow>
            <IonCol>
              <IonSlides
                ref={slidesRef}
                pager={false}
                options={slideOpts}
                style={{ height: 250 }}
                onIonSlideDidChange={onSlideChange}
              >
                {questions.map(slide => (
                  <IonSlide key={`q-${slide.group.id}-${slide.question.id}`}>
                    <PropValueForm
                      settings={slide.question.settings.question}
                      value={values[slide.question.id]}
                      setValue={setValue(slide)}
                      propGroup={slide.group}
                      propValue={slide.question}
                      requestSkip={requestSkip}
                      requestSubmit={onUpdate(slide)}
                      requestLockSlides={() =>
                        slidesRef.current.lockSwipes(true)
                      }
                      requestUnlockSlides={() =>
                        slidesRef.current.lockSwipes(false)
                      }
                    />
                  </IonSlide>
                ))}
                <IonSlide>You are done!</IonSlide>
              </IonSlides>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size={2} className="ion-justify-content-start">
              {isFirstSlide ? null : (
                <IonButton size={"small"} fill={"clear"} onClick={requestPrev}>
                  <IonIcon icon={chevronBackOutline} />
                </IonButton>
              )}
            </IonCol>
            <IonCol size={4} className="ion-justify-content-center">
              <IonButton size={"small"} fill={"clear"} onClick={requestSkip}>
                skip
              </IonButton>
            </IonCol>
            <IonCol size={6}>
              <IonButton
                disabled={canSubmit === false}
                size={"small"}
                expand={"block"}
                onClick={requestSubmit}
              >
                <IonIcon icon={checkmarkOutline} slot={"end"} /> Save
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default SlidingQuestions;
