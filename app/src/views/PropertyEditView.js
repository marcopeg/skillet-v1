/* eslint-disable */

import React from "react";
import ReactMarkdown from "react-markdown";
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
  IonAlert,
  IonGrid,
  IonRow,
  IonCol
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
              <IonItem className="ion-no-padding">
                <IonGrid style={{ width: "100%" }}>
                  <IonRow>
                    <IonCol>
                      <IonLabel position="floating">Name:</IonLabel>
                      <IonInput
                        value={values.name}
                        onIonChange={e => setValue("name", e.detail.value)}
                      />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
              <IonItem className="ion-no-padding">
                <IonGrid style={{ width: "100%" }}>
                  <IonRow>
                    <IonCol sizeSm={6} sizeXs={12}>
                      <IonLabel position="floating">Description:</IonLabel>
                      <IonTextarea
                        rows="5"
                        value={values.description}
                        onIonChange={e =>
                          setValue("description", e.detail.value)
                        }
                      />
                    </IonCol>
                    <IonCol sizeSm={6} sizeXs={12} className="ion-hide-sm-down">
                      <div
                        className="ion-padding ion-margin-top"
                        style={{
                          border: "1px solid var(--ion-color-medium)",
                          background: "var(--vapor-color-white-smoke)",
                          borderRadius: 4,
                          maxHeight: 150,
                          overflow: "auto"
                        }}
                      >
                        <ReactMarkdown source={values.description} />
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>
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
