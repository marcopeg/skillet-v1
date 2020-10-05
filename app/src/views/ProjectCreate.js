import React from "react";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonButton,
  IonInput,
  IonTextarea
} from "@ionic/react";

import { add } from "ionicons/icons";

import useProjectCreate from "../state/project/use-project-create";

const ProjectCreate = () => {
  const {
    isModalOpen,
    isFormValid,
    isFormLoading,
    title,
    setTitle,
    description,
    setDescription,
    openModal,
    closeModal,
    submitForm
  } = useProjectCreate();
  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={openModal}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
      <IonModal isOpen={isModalOpen}>
        <IonPage>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>New Skill Matrix</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={closeModal}>Cancel</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList lines="full">
              <IonItem>
                <IonLabel position="floating">Project Name:</IonLabel>
                <IonInput
                  value={title}
                  onIonChange={(e) => setTitle(e.detail.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Project Description:</IonLabel>
                <IonTextarea
                  rows="5"
                  value={description}
                  onIonChange={(e) => setDescription(e.detail.value)}
                />
              </IonItem>
            </IonList>
            <div className="ion-padding">
              <IonButton
                className="ion-margin-top"
                expand="block"
                disabled={!isFormValid || isFormLoading}
                onClick={submitForm}
              >
                {isFormLoading ? "saving..." : "Save"}
              </IonButton>
            </div>
          </IonContent>
        </IonPage>
      </IonModal>
    </>
  );
};

export default ProjectCreate;
