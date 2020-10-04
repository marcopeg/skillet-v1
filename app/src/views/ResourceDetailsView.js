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

const ResourceDetailsView = () => {
  const { data, projectId, resourceId, isDataLoading } = useResourceDetails();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
      <IonContent className="ion-padding">
        {isDataLoading ? (
          <div className="ion-padding">
            <IonSpinner name="dots" />
          </div>
        ) : (
          <div>[[ TO BE COMPLETED ]]</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ResourceDetailsView;
