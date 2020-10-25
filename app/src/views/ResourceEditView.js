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

import useResourceEditValue from "../state/resources/use-resource-edit-value";
import useResourceDeleteValue from "../state/resources/use-resource-delete-value";

const ResourceEditView = () => {
  const editValue = useResourceEditValue();
  const {
    projectId,
    resourceId,
    isDataLoading,
    isFormDisabled,
    isFormLoading,
    data,
    values,
    setValue,
    submitForm
  } = editValue;

  const {
    isConfirmOpen,
    openConfirm,
    closeConfirm,
    submitDelete
  } = useResourceDeleteValue({ projectId, resourceId, data });

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
              routerLink={`/p/${projectId}/resources/v/${resourceId}`}
              routerDirection="back"
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
          message={`Type the resource name to confirm you understand what you are doing:`}
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

export default ResourceEditView;
