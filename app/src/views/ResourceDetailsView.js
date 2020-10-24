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

import useResourceDetails from "../state/resources/use-resource-details";
import SlidingQuestions from "../containers/SlidingQuestions";
import Gauge from "../components/base/Gauge";

const ResourceDetailsView = () => {
  const {
    data,
    board,
    projectId,
    resourceId,
    isLoading
  } = useResourceDetails();

  const stats = board ? board.map.res.values[resourceId].stats : null;

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
            ) : (
              <>
                <small>
                  {data.group.name}
                  {" / "}
                </small>
                {data.name}
              </>
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
                  value={stats ? stats.fillRate * 100 : 0}
                  label="Fill Rate"
                  units="%"
                />
              </IonCol>
              <IonCol>
                <Gauge
                  value={stats ? stats.score * 100 : 0}
                  label="Score"
                  units="%"
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol sizeLg={12}>
                <SlidingQuestions resourceId={resourceId} />
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
        )}
      </IonContent>
    </IonPage>
  );
};

export default ResourceDetailsView;
