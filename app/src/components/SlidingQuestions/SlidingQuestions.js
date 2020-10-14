import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import "./SlidingQuestions.css";

import {
  IonContent,
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
  questions,
  activeQuestion,
  activeIndex,
  setActiveIndex,
  requestSubmit
}) => {
  const slidesRef = useRef(null);
  const onSlideChange = () =>
    slidesRef.current.getActiveIndex().then(setActiveIndex);
  return (
    <IonCard>
      <IonCardHeader color="primary">
        <IonCardSubtitle>{activeQuestion.group.name}</IonCardSubtitle>
        <IonCardTitle>{activeQuestion.question.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid className="sliding-questions--grid">
          <IonRow>
            <IonCol>
              <IonSlides
                ref={slidesRef}
                pager={true}
                options={{
                  initialSlide: activeIndex,
                  speed: 400,
                  allowTouchMove: false
                }}
                onIonSlideWillChange={onSlideChange}
              >
                {questions.map($item => (
                  <IonSlide key={`q-${$item.group.id}-${$item.question.id}`}>
                    <div className="sliding-questions--slide">
                      <div className="ion-margin-vertical ion-padding-bottom sliding-questions--description">
                        <ReactMarkdown source={$item.question.description} />
                      </div>
                      <div className="ion-margin-bottom sliding-questions--control">
                        [control]
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
