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

import useResourceGroup from "../state/resources/use-resource-group";
import Gauge from "../components/base/Gauge";
import BoardStrengths from "../components/board/BoardStrengths";

const ResourceGroupDetailsView = () => {
  const { projectId, isLoading, isReady, group, board } = useResourceGroup();

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
              <>{group.name}</>
            ) : (
              "Error"
            )}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLoading ? (
          <div className="ion-padding">
            <IonSpinner name="dots" />
          </div>
        ) : (
          <IonGrid>
            <IonRow>
              <IonCol>
                <Gauge
                  value={isReady ? Math.round(group.stats.fillRate * 100) : 0}
                  label="Fill Rate"
                />
              </IonCol>
              <IonCol>
                <Gauge
                  value={isReady ? Math.round(group.stats.score * 10000) : 0}
                  label="Score"
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <BoardStrengths board={board} />
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ResourceGroupDetailsView;
