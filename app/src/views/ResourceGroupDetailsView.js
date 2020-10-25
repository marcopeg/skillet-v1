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

import useResourceGroupDetails from "../state/resources/use-resource-group-details";
import Gauge from "../components/base/Gauge";

const ResourceGroupDetailsView = () => {
  const { projectId, isLoading, isReady, group } = useResourceGroupDetails();

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
                  units="%"
                />
              </IonCol>
              <IonCol>
                <Gauge
                  value={isReady ? Math.round(group.stats.score * 100) : 0}
                  label="Score"
                  units="%"
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ResourceGroupDetailsView;
