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
import usePropertiesList from "../state/properties/use-properties-list";
import usePropertiesCreateGroup from "../state/properties/use-properties-create-group";
import usePropertiesCreateValue from "../state/properties/use-properties-create-value";

const PropertiesView = () => {
  const { groups, refresh } = usePropertiesList();
  const createGroup = usePropertiesCreateGroup();
  const createValue = usePropertiesCreateValue();

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
          <IonTitle>{"Properties"}</IonTitle>
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
                    Add new property
                  </IonButton>
                </React.Fragment>
              );
            })}
          </IonList>
        ) : (
          <>
            <h4>What is a Property?</h4>
            <p>
              A <b>property</b> is something you want to track, such as{" "}
              <i>weight lifting</i> or <i>guitar playing</i>.
            </p>
            <p>
              Skillet organizes properties into <b>groups</b> for simpler
              organization and data visualization. <br />
              Create your first group using the button below, then add
              properties to it.
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
                <IonTitle>New Group</IonTitle>
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
                <IonTitle>New Property</IonTitle>
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
