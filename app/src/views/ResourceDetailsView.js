/* eslint-disable */

import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/react";

import useResourceValue from "../state/resources/use-resource-value";
import SlidingQuestions from "../containers/SlidingQuestions";
import Gauge from "../components/base/Gauge";
import Markdown from "../components/base/Markdown";
import BoardStrengths from "../components/board/BoardStrengths";

const ResourceDetailsView = () => {
  const {
    data,
    board,
    projectId,
    resourceId,
    isLoading,
    isReady,
    refetch
  } = useResourceValue();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              routerLink={`/p/${projectId}/resources`}
              routerDirection="back"
            >
              Close
            </IonButton>
          </IonButtons>
          <IonTitle>
            {isLoading ? (
              <IonSpinner name="dots" />
            ) : isReady ? (
              <>
                <small>
                  {data.group.name}
                  {" / "}
                </small>
                {data.name}
              </>
            ) : (
              "error"
            )}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLoading ? (
          <div className="ion-padding">
            <IonSpinner name="dots" />
          </div>
        ) : isReady ? (
          <IonGrid>
            <IonRow>
              <IonCol>
                <h1>{data.name}</h1>
              </IonCol>
            </IonRow>
            {data.description ? (
              <IonRow>
                <IonCol>
                  <Markdown source={data.description} />
                </IonCol>
              </IonRow>
            ) : null}
            <IonRow>
              <IonCol>
                <Gauge
                  value={Math.round(data.stats.fillRate * 100)}
                  label="Fill Rate"
                />
              </IonCol>
              <IonCol>
                <Gauge
                  value={Math.round(data.stats.score * 10000)}
                  label="Score"
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <BoardStrengths board={board} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol sizeLg={12}>
                <SlidingQuestions
                  resourceId={resourceId}
                  board={board}
                  onSubmit={refetch}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-end">
                <IonButton
                  fill="outline"
                  // expand="block"
                  routerLink={`/p/${projectId}/resources/v/${resourceId}/edit`}
                >
                  Edit
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        ) : (
          "error"
        )}
      </IonContent>
    </IonPage>
  );
};

export default ResourceDetailsView;
