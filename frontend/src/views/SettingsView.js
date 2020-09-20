/* eslint-disable */

import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton
} from "@ionic/react";

// Hooks
import useProject from "../state/project/use-project";
import useEntryUpsert from "../state/use-entry-upsert";

import SkillMatrix from "../components/SkillMatrix/SkillMatrix";

const SettingsView = ({ match }) => {
  //   console.log(match);
  //   const projectId = match.params.projectId;
  //   const { isReady, data } = useProject(projectId);
  //   const { upsertEntry } = useEntryUpsert(projectId);
  //   const title = isReady ? data.project.title : "Loading skills...";

  //   const onUpdate = (evt) =>
  //     upsertEntry({
  //       ...evt.detail,
  //       project_id: projectId
  //     });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{"Project Settings"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>...</IonContent>
    </IonPage>
  );
};

export default SettingsView;
