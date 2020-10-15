/* eslint-disable */

import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSpinner,
  IonAlert
} from "@ionic/react";

import usePropertyEditValue from "../state/properties/use-property-edit-value";
import usePropertyDeleteValue from "../state/properties/use-property-delete-value";

const PropertyEditView = () => {
  const {
    projectId,
    propertyId,
    isDataLoading,
    isFormDisabled,
    isFormLoading,
    data,
    values,
    setValue,
    submitForm
  } = usePropertyEditValue();

  const {
    isConfirmOpen,
    openConfirm,
    closeConfirm,
    submitDelete
  } = usePropertyDeleteValue();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            {data ? (
              `EDIT: ${data.group.name} - ${data.name}`
            ) : (
              <IonSpinner name="dots" />
            )}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              routerLink={`/p/${projectId}/properties/v/${propertyId}`}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {isDataLoading ? (
          <div className="ion-padding">
            <IonSpinner name="dots" />
          </div>
        ) : (
          <>
            <IonList lines="full">
              <IonItem>
                <IonLabel position="floating">Name:</IonLabel>
                <IonInput
                  value={values.name}
                  onIonChange={e => setValue("name", e.detail.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Description:</IonLabel>
                <IonTextarea
                  rows="5"
                  value={values.description}
                  onIonChange={e => setValue("description", e.detail.value)}
                />
              </IonItem>
            </IonList>
            <div className="ion-padding">
              <IonButton
                className="ion-margin-top"
                expand="block"
                disabled={isFormDisabled}
                onClick={submitForm}
              >
                {isFormLoading ? "saving..." : "Save"}
              </IonButton>
              <IonButton
                className="ion-margin-top"
                expand="block"
                color="danger"
                fill="clear"
                onClick={openConfirm}
              >
                {isFormLoading ? "saving..." : "remove from project"}
              </IonButton>
            </div>
          </>
        )}

        <IonAlert
          isOpen={isConfirmOpen}
          onDidDismiss={closeConfirm}
          header={"👉 Please think twice"}
          subHeader={"This action can NOT be undone!"}
          message={`Type the property name to confirm you understand what you are doing:`}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary"
            },
            {
              text: "Delete",
              role: "confirm",
              handler: submitDelete
            }
          ]}
          inputs={[
            {
              name: "name",
              type: "text",
              placeholder: "Property name"
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default PropertyEditView;
