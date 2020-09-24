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
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonModal,
  IonInput,
  IonTextarea,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonAlert
} from "@ionic/react";

import { add } from "ionicons/icons";

// import useResourcesList from "../state/resources/use-resources-list";
// import useResourcesCreateGroup from "../state/resources/use-resources-create-group";
import useResourceEditValue from "../state/properties/use-property-edit-value";

const PropertiesView = () => {
  //   const { groups, refresh } = useResourcesList();
  //   const createGroup = useResourcesCreateGroup();
  const editValue = useResourceEditValue();

  //   const showList = groups && groups.length;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={editValue.openModal}>Edit</IonButton>
          </IonButtons>
          <IonTitle>{"Property name"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {"[[ TO BE COMPLETED ]]"}

        {/**
         * Edit Value Modal
         */}
        <IonModal
          isOpen={editValue.isModalOpen}
          onDidDismiss={editValue.closeModal}
        >
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>New Resource</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={editValue.closeModal}>Cancel</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              {editValue.isDataLoading ? (
                <div className="ion-padding">
                  <IonSpinner name="dots" />
                </div>
              ) : (
                <>
                  <IonList lines="full">
                    <IonItem>
                      <IonLabel position="floating">Name:</IonLabel>
                      <IonInput
                        value={editValue.values.name}
                        onIonChange={(e) =>
                          editValue.setValue("name", e.detail.value)
                        }
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Description:</IonLabel>
                      <IonTextarea
                        rows="5"
                        value={editValue.values.description}
                        onIonChange={(e) =>
                          editValue.setValue("description", e.detail.value)
                        }
                      />
                    </IonItem>
                  </IonList>
                  <div className="ion-padding">
                    <IonButton
                      className="ion-margin-top"
                      expand="block"
                      disabled={editValue.isFormDisabled}
                      onClick={editValue.submitForm}
                    >
                      {editValue.isFormLoading ? "saving..." : "Save"}
                    </IonButton>
                    <IonButton
                      className="ion-margin-top"
                      expand="block"
                      color="danger"
                      fill="clear"
                      disabled={editValue.isFormDisabled}
                      onClick={editValue.submitForm}
                    >
                      {editValue.isFormLoading
                        ? "saving..."
                        : "remove from project"}
                    </IonButton>
                  </div>
                </>
              )}
            </IonContent>
          </IonPage>
        </IonModal>

        <IonAlert
          isOpen={true}
          onDidDismiss={() => {}}
          header={"foobar"}
          subHeader={"hohoho"}
          message={"hihihi"}
          buttons={["Cancel", "Confirm"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default PropertiesView;
