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
  IonCol,
  IonText
} from "@ionic/react";

import Markdown from "../components/base/Markdown";
import usePropertyDetails from "../state/properties/use-property-details";
// import BoardHeroes from '../components/board/BoardHeroes'

const PropertiesView = () => {
  const {
    data,
    values,
    projectId,
    propertyId,
    isDataLoading
  } = usePropertyDetails();

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
                <IonText>
                  <h4>Description:</h4>
                </IonText>
                {values.description ? (
                  <Markdown source={values.description} />
                ) : (
                  <Markdown source="✏️ Please edit this document and provide a description." />
                )}
              </IonCol>
            </IonRow>
            {values.url_docs ? (
              <IonRow>
                <IonCol>
                  <IonText>
                    <h4>Documentation:</h4>
                  </IonText>
                  <Markdown source={`👉 ${values.url_docs}`} />
                </IonCol>
              </IonRow>
            ) : null}
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
