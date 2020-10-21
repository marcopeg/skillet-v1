import React, { useRef, useState } from "react";
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
  IonSlide,
  IonText
} from "@ionic/react";

import { checkmarkOutline, chevronBackOutline } from "ionicons/icons";

const QuestionSlideWithDescription = ({
  slide,
  getValue,
  setValue,
  lockSlides
}) => (
  <IonRow>
    <IonCol
      sizeMd={6}
      sizeXs={12}
      className="sliding-questions--control-wrapper"
    >
      <div className="ion-margin-top ion-padding skillet-break-long-word sliding-questions--description">
        {slide.question.description.length ? (
          <Markdown source={slide.question.description.trim()} />
        ) : null}
      </div>
      {slide.question.url_docs !== null ? (
        <Markdown
          className="ion-padding sliding-questions--slide-url"
          source={`[Read the doc page](${slide.question.url_docs}) »`}
        />
      ) : null}
    </IonCol>
    <IonCol sizeMd={6} sizeXs={12} className="ion-justify-content-center">
      <div className="sliding-questions--control-wrapper">
        <div className="ion-margin-vertical sliding-questions--title">
          <IonText color="primary">{slide.question.name}</IonText>
          <small>{slide.group.name}</small>
        </div>
        <div className="sliding-questions--control">
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
);

const QuestionSlideWithoutDescription = ({
  slide,
  getValue,
  setValue,
  lockSlides
}) => (
  <IonRow>
    <IonCol className="sliding-questions--control-wrapper">
      <div className="ion-margin-vertical sliding-questions--title">
        <IonText color="primary">{slide.question.name}</IonText>
        <small>{slide.group.name}</small>
      </div>
      <div className="ion-margin-bottom sliding-questions--control">
        <PropValueForm
          settings={slide.question.settings.question}
          value={getValue(slide)}
          setValue={setValue(slide)}
          requestLockSlides={lockSlides(true)}
          requestUnlockSlides={lockSlides(false)}
        />
      </div>
    </IonCol>
  </IonRow>
);

const QuestionSlide = ({ slide, ...props }) => (
  <IonSlide key={`q-${slide.group.id}-${slide.question.id}`}>
    <IonGrid>
      {Boolean(slide.question.description) ? (
        <QuestionSlideWithDescription {...props} slide={slide} />
      ) : (
        <QuestionSlideWithoutDescription {...props} slide={slide} />
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
  const [isFinalSlide, setIsFinalSlide] = useState(false);
  const getActiveIndex = () => slidesRef.current.getActiveIndex();
  const onSlideChange = () =>
    getActiveIndex().then(activeIndex => {
      if (activeIndex >= slides.length) {
        setIsFinalSlide(true);
      } else {
        setActiveIndex(activeIndex);
      }
    });
  const lockSlides = value => () => slidesRef.current.lockSwipes(value);
  const requestSubmit = () =>
    onRequestSubmit().then(() => slidesRef.current.slideNext());

  return (
    <IonCard className="sliding-questions">
      <IonCardHeader color="primary">
        <IonCardTitle>
          <small>Self Evaluation</small>
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
                {slides.map(slide => (
                  <QuestionSlide
                    key={`q-${slide.group.id}-${slide.question.id}`}
                    slide={slide}
                    getValue={getValue}
                    setValue={setValue}
                    lockSlides={lockSlides}
                  />
                ))}
                <IonSlide key={"last"}>
                  <div>
                    <h2>
                      <IonText color="primary">Well Done</IonText>
                    </h2>
                    <p>
                      You are all set for now, please come back every now and
                      then to check if there are new skills you can evaluate, or
                      to refresh your evaluation on the existing ones!
                    </p>
                  </div>
                </IonSlide>
              </IonSlides>
            </IonCol>
          </IonRow>
          {isFinalSlide ? null : (
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
          )}
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default SlidingQuestions;
