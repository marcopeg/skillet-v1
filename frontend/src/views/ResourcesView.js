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
  IonRefresherContent
} from "@ionic/react";

import { add } from "ionicons/icons";
import useResourcesList from "../state/resources/use-resources-list";
import useResourcesCreateGroup from "../state/resources/use-resources-create-group";
import useResourcesCreateValue from "../state/resources/use-resources-create-value";

const PropertiesView = () => {
  const { groups, refresh } = useResourcesList();
  const createGroup = useResourcesCreateGroup();
  const createValue = useResourcesCreateValue();

  const showList = groups && groups.length;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={createGroup.openModal}>New Group</IonButton>
          </IonButtons>
          <IonTitle>{"Resources"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={showList ? null : "ion-padding"}>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {showList ? (
          <IonList lines="full">
            {groups.map((group, idx) => {
              return (
                <React.Fragment key={`gr-${group.id}`}>
                  <IonListHeader className={idx > 0 ? "ion-padding-top" : null}>
                    <IonToolbar>
                      <h3>{group.name}</h3>
                      {/* <IonButtons slot="end">
                        <IonButton
                          onClick={() => createValue.openModal(group.id)}
                        >
                          <IonIcon icon={add}></IonIcon>
                        </IonButton>
                      </IonButtons> */}
                    </IonToolbar>
                  </IonListHeader>

                  {group.values.map((value) => {
                    return (
                      <IonItem key={`gr-${group.id}-${value.id}`}>
                        <IonLabel>{value.name}</IonLabel>
                      </IonItem>
                    );
                  })}

                  <IonButton
                    expand="full"
                    fill="clear"
                    size="small"
                    className="ion-margin"
                    onClick={() => createValue.openModal(group.id)}
                  >
                    <IonIcon icon={add} />
                    Add new resource
                  </IonButton>
                </React.Fragment>
              );
            })}
          </IonList>
        ) : (
          <>
            <h4>What is a Resource?</h4>
            <p>
              Think a resource in terms of a <b>team member</b> and a group in
              terms of a <b>team</b>.
            </p>
            <IonButton
              expand="full"
              size="small"
              onClick={createGroup.openModal}
            >
              <IonIcon icon={add} /> Create the first group
            </IonButton>
          </>
        )}

        {/**
         * Create Group Modal
         */}
        <IonModal
          isOpen={createGroup.isModalOpen}
          onDidDismiss={createGroup.closeModal}
        >
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>New Resource Group</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={createGroup.closeModal}>Cancel</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList lines="full">
                <IonItem>
                  <IonLabel position="floating">Name:</IonLabel>
                  <IonInput
                    value={createGroup.values.name}
                    onIonChange={(e) =>
                      createGroup.setValue("name", e.detail.value)
                    }
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Description:</IonLabel>
                  <IonTextarea
                    rows="5"
                    value={createGroup.values.description}
                    onIonChange={(e) =>
                      createGroup.setValue("description", e.detail.value)
                    }
                  />
                </IonItem>
              </IonList>
              <div className="ion-padding">
                <IonButton
                  className="ion-margin-top"
                  expand="block"
                  disabled={createGroup.isFormDisabled}
                  onClick={createGroup.submitForm}
                >
                  {createGroup.isFormLoading ? "saving..." : "Save"}
                </IonButton>
              </div>
            </IonContent>
          </IonPage>
        </IonModal>

        {/**
         * Create Value Modal
         */}
        <IonModal
          isOpen={createValue.isModalOpen}
          onDidDismiss={createValue.closeModal}
        >
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>New Resource</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={createValue.closeModal}>Cancel</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList lines="full">
                <IonItem>
                  <IonLabel position="floating">Name:</IonLabel>
                  <IonInput
                    value={createValue.values.name}
                    onIonChange={(e) =>
                      createValue.setValue("name", e.detail.value)
                    }
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Description:</IonLabel>
                  <IonTextarea
                    rows="5"
                    value={createValue.values.description}
                    onIonChange={(e) =>
                      createValue.setValue("description", e.detail.value)
                    }
                  />
                </IonItem>
              </IonList>
              <div className="ion-padding">
                <IonButton
                  className="ion-margin-top"
                  expand="block"
                  disabled={createValue.isFormDisabled}
                  onClick={createValue.submitForm}
                >
                  {createValue.isFormLoading ? "saving..." : "Save"}
                </IonButton>
              </div>
            </IonContent>
          </IonPage>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default PropertiesView;
