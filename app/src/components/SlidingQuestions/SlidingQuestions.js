import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import "./SlidingQuestions.css";

import PropValueForm from "../PropValueForm";

import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonSlides,
  IonSlide
} from "@ionic/react";

import { checkmarkOutline, chevronBackOutline } from "ionicons/icons";

const SlidingQuestions = ({
  isFirstSlide,
  canSubmit,
  slides,
  activeSlide,
  setActiveIndex,
  getValue,
  setValue,
  submitSlide
}) => {
  const slidesRef = useRef(null);
  const getActiveIndex = () => slidesRef.current.getActiveIndex();
  const onSlideChange = () => getActiveIndex().then(setActiveIndex);
  const lockSlides = value => () => slidesRef.current.lockSwipes(value);
  const requestSubmit = () => submitSlide().then(slidesRef.current.slideNext);

  return (
    <IonCard>
      <IonCardHeader color="primary">
        <IonCardSubtitle>{activeSlide.group.name}</IonCardSubtitle>
        <IonCardTitle>{activeSlide.question.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid className="sliding-questions--grid">
          <IonRow>
            <IonCol>
              <IonSlides
                ref={slidesRef}
                pager={true}
                options={{
                  initialSlide: activeSlide.__index,
                  speed: 400,
                  allowTouchMove: false
                }}
                onIonSlideWillChange={onSlideChange}
                className="sliding-questions--slides"
              >
                {slides.map($slide => (
                  <IonSlide key={`q-${$slide.group.id}-${$slide.question.id}`}>
                    <div className="sliding-questions--slide">
                      {$slide.question.description && (
                        <div className="ion-margin-top ion-padding-bottom sliding-questions--description">
                          <ReactMarkdown source={$slide.question.description} />
                        </div>
                      )}
                      <div className="ion-margin-vertical sliding-questions--control">
                        <PropValueForm
                          settings={$slide.question.settings}
                          value={getValue($slide)}
                          setValue={setValue($slide)}
                          requestLockSlides={lockSlides(true)}
                          requestUnlockSlides={lockSlides(false)}
                        />
                      </div>
                    </div>
                  </IonSlide>
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
