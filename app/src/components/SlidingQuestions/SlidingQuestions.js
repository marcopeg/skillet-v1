import React, { useRef } from "react";
import "./SlidingQuestions.css";

import PropValueForm from "../PropValueForm";
import Markdown from "../base/Markdown";

import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSlides,
  IonSlide
} from "@ionic/react";

import { checkmarkOutline, chevronBackOutline } from "ionicons/icons";

const QuestionSlide = ({ slide, getValue, setValue, lockSlides }) => (
  <IonSlide key={`q-${slide.group.id}-${slide.question.id}`}>
    <IonGrid>
      {Boolean(slide.question.description) ? (
        <IonRow>
          <IonCol
            sizeMd={6}
            sizeXs={12}
            className="ion-align-items-center sliding-questions--col-info"
          >
            <div className="ion-margin-vertical ion-padding skillet-break-long-word sliding-questions--description">
              <h4>
                <small>
                  {slide.group.name}
                  {" / "}
                  {slide.question.name}
                </small>
              </h4>
              {slide.question.description.length ? (
                <Markdown source={slide.question.description} />
              ) : null}
              {slide.question.url_docs !== null ? (
                <Markdown source={slide.question.url_docs} />
              ) : null}
            </div>
          </IonCol>
          <IonCol sizeMd={6} sizeXs={12}>
            <div className="sliding-questions--slide">
              <div className="ion-margin-vertical sliding-questions--control-wrapper">
                <div className="ion-margin-vertical sliding-questions--control">
                  <PropValueForm
                    settings={slide.question.settings.question}
                    value={getValue(slide)}
                    setValue={setValue(slide)}
                    requestLockSlides={lockSlides(true)}
                    requestUnlockSlides={lockSlides(false)}
                  />
                </div>
              </div>
            </div>
          </IonCol>
        </IonRow>
      ) : (
        <IonRow>
          <IonCol>
            <div className="ion-margin-vertical sliding-questions--control-wrapper">
              <div className="ion-margin-vertical sliding-questions--control">
                <PropValueForm
                  settings={slide.question.settings.question}
                  value={getValue(slide)}
                  setValue={setValue(slide)}
                  requestLockSlides={lockSlides(true)}
                  requestUnlockSlides={lockSlides(false)}
                />
              </div>
            </div>
          </IonCol>
        </IonRow>
      )}
    </IonGrid>
  </IonSlide>
);

const SlidingQuestions = ({
  isFirstSlide,
  canSubmit,
  slides,
  activeSlide,
  setActiveIndex,
  onRequestSubmit,
  getValue,
  setValue
}) => {
  const slidesRef = useRef(null);
  const getActiveIndex = () => slidesRef.current.getActiveIndex();
  const onSlideChange = () => getActiveIndex().then(setActiveIndex);
  const lockSlides = (value) => () => slidesRef.current.lockSwipes(value);
  const requestSubmit = () =>
    onRequestSubmit().then(() => slidesRef.current.slideNext());

  return (
    <IonCard className="sliding-questions">
      <IonCardHeader color="primary">
        <IonCardTitle>
          <small>
            {activeSlide.group.name}
            {" / "}
          </small>
          {activeSlide.question.name}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid className="sliding-questions--grid">
          <IonRow>
            <IonCol>
              <IonSlides
                ref={slidesRef}
                pager={false}
                options={{
                  initialSlide: activeSlide.__index,
                  speed: 400,
                  allowTouchMove: false
                }}
                onIonSlideWillChange={onSlideChange}
                className="sliding-questions--slides"
              >
                {slides.map((slide) => (
                  <QuestionSlide
                    key={`q-${slide.group.id}-${slide.question.id}`}
                    slide={slide}
                    getValue={getValue}
                    setValue={setValue}
                    lockSlides={lockSlides}
                  />
                ))}
              </IonSlides>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size={2} className="ion-justify-content-start">
              {isFirstSlide ? null : (
                <IonButton
                  size={"small"}
                  fill={"clear"}
                  onClick={() => slidesRef.current.slidePrev()}
                >
                  <IonIcon icon={chevronBackOutline} />
                </IonButton>
              )}
            </IonCol>
            <IonCol size={4} className="ion-justify-content-center">
              <IonButton
                size={"small"}
                fill={"clear"}
                onClick={() => slidesRef.current.slideNext()}
              >
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
