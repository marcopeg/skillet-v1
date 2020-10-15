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

const ResourceDetailsView = () => {
  const { data, projectId, resourceId, isDataLoading } = useResourceDetails();

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
            {data ? (
              <>
                <small>
                  {data.group.name}
                  {" / "}
                </small>
                {data.name}
              </>
            ) : (
              <IonSpinner name="dots" />
            )}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isDataLoading ? (
          <div className="ion-padding">
            <IonSpinner name="dots" />
          </div>
        ) : (
          <IonGrid>
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
