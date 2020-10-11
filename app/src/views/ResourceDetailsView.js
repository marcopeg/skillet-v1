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
  IonSpinner
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
              routerLink={`/p/${projectId}/resources/v/${resourceId}/edit`}
            >
              Edit
            </IonButton>
          </IonButtons>
          <IonTitle>
            {data ? (
              `${data.group.name} - ${data.name}`
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
          <>
            <SlidingQuestions resourceId={resourceId} />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ResourceDetailsView;
