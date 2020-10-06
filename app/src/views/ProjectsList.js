import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonRefresher,
  IonRefresherContent
} from "@ionic/react";

import useProjectsList from "../state/project/use-projects-list";
import ProjectCreate from "./ProjectCreate";

const ProjectsList = () => {
  const { items, refetch } = useProjectsList();

  const doRefresh = (event) => {
    refetch()
      .then(() => event.detail.complete())
      .catch((err) => console.error(err));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Skillet</IonTitle>
        </IonToolbar>
        <IonToolbar color="primary">
          <IonTitle>
            <small>Know your team, know what to expect</small>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {items && (
          <IonList lines="full">
            {items.map((item) => (
              <IonItem key={item.id} routerLink={`/p/${item.id}`}>
                <IonLabel>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        <ProjectCreate />
      </IonContent>
    </IonPage>
  );
};

export default ProjectsList;
