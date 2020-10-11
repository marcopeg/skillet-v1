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

import usePropertyDetails from "../state/properties/use-property-details";

const PropertiesView = () => {
  const { data, projectId, propertyId, isDataLoading } = usePropertyDetails();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              routerLink={`/p/${projectId}/properties/v/${propertyId}/edit`}
            >
              Edit
            </IonButton>
          </IonButtons>
          <IonTitle>
            {data ? (
              <>
                {data.name} <small>- {data.group.name}</small>
              </>
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

export default PropertiesView;
