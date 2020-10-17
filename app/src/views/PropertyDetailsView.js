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

import Markdown from "../components/base/Markdown";
import usePropertyDetails from "../state/properties/use-property-details";

const PropertiesView = () => {
  const { data, projectId, propertyId, isDataLoading } = usePropertyDetails();
  console.log(data);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              routerLink={`/p/${projectId}/properties`}
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
      <IonContent className="ion-padding">
        {isDataLoading ? (
          <div className="ion-padding">
            <IonSpinner name="dots" />
          </div>
        ) : (
          <IonGrid>
            <IonRow>
              <IonCol>
                <Markdown source={data.description} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-end">
                <IonButton
                  fill="outline"
                  // expand="block"
                  routerLink={`/p/${projectId}/properties/v/${propertyId}/edit`}
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

export default PropertiesView;
