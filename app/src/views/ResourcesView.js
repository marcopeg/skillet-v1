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
  IonText
} from "@ionic/react";

import { add } from "ionicons/icons";
import useResourcesList from "../state/resources/use-resources-list";
import useResourcesCreateGroup from "../state/resources/use-resources-create-group";
import useResourcesCreateValue from "../state/resources/use-resources-create-value";

const WelcomeMsg = ({ createGroup }) => (
  <>
    <h4>What is a Resource?</h4>
    <p>
      Think a resource in terms of a <b>team member</b> and a group in terms of
      a <b>team</b>.
    </p>
    <IonButton expand="full" size="small" onClick={createGroup}>
      <IonIcon icon={add} /> Create the first group
    </IonButton>
  </>
);

const GroupWelcomeMsg = ({ createResource }) => (
  <IonItem lines="none" type="button" onClick={createResource}>
    <IonLabel style={{ cursor: "pointer" }}>
      This group is empty, please <IonText color="primary">click here</IonText>{" "}
      to add new resources to it.
    </IonLabel>
  </IonItem>
);

const GroupsList = ({ groups, baseUrl, createResource }) => (
  <IonList lines="full">
    {groups.map((group, idx) => {
      return (
        <React.Fragment key={`gr-${group.id}`}>
          <IonListHeader
            lines="full"
            className={idx > 0 ? "ion-padding-top" : null}
          >
            <IonLabel>{group.name}</IonLabel>
            <IonButton routerLink={`${baseUrl}/g/${group.id}`}>Open</IonButton>
          </IonListHeader>

          {group.values.length ? (
            <>
              {group.values.map(value => {
                return (
                  <IonItem
                    key={`gr-${group.id}-${value.id}`}
                    routerLink={`${baseUrl}/v/${value.id}`}
                  >
                    <IonLabel>{value.name}</IonLabel>
                  </IonItem>
                );
              })}
              <IonButton
                expand="full"
                fill="clear"
                size="small"
                className="ion-margin"
                onClick={() => createResource(group.id)}
              >
                <IonIcon icon={add} />
                Add new resource
              </IonButton>
            </>
          ) : (
            <GroupWelcomeMsg createResource={() => createResource(group.id)} />
          )}
        </React.Fragment>
      );
    })}
  </IonList>
);

const PropertiesView = ({ match }) => {
  const { isLoading, groups, refresh } = useResourcesList();
  const createGroup = useResourcesCreateGroup();
  const createValue = useResourcesCreateValue();

  const usePadding = isLoading || !groups || !groups.length;
  const content = (() => {
    if (groups && groups.length) {
      return (
        <GroupsList
          groups={groups}
          baseUrl={match.url}
          createResource={createValue.openModal}
        />
      );
    }

    return <WelcomeMsg createGroup={createGroup.openModal} />;
  })();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={createGroup.openModal}>New Group</IonButton>
          </IonButtons>
          <IonTitle>{"Resources"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={usePadding ? "ion-padding" : null}>
        {isLoading ? null : (
          <IonRefresher slot="fixed" onIonRefresh={refresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
        )}

        {isLoading ? <IonSpinner name="dots" /> : content}

        {/**
         * Create Group Modal
         */}
        <IonModal
          isOpen={createGroup.isModalOpen}
          onDidDismiss={createGroup.closeModal}
        >
          <IonPage>
            <IonHeader>
              <IonToolbar color="primary">
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
                    onIonChange={e =>
                      createGroup.setValue("name", e.detail.value)
                    }
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Description:</IonLabel>
                  <IonTextarea
                    rows="5"
                    value={createGroup.values.description}
                    onIonChange={e =>
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
              <IonToolbar color="primary">
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
                    onIonChange={e =>
                      createValue.setValue("name", e.detail.value)
                    }
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Description:</IonLabel>
                  <IonTextarea
                    rows="5"
                    value={createValue.values.description}
                    onIonChange={e =>
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
