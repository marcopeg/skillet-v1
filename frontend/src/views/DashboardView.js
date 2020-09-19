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
import useProjectCache from "../state/use-project-cache";
import useEntryUpsert from "../state/use-entry-upsert";

import SkillMatrix from "../components/SkillMatrix/SkillMatrix";

const DashboardView = ({ match }) => {
  console.log(match);
  const projectId = match.params.projectId;
  const { isReady, data } = useProjectCache(projectId);
  const { upsertEntry } = useEntryUpsert(projectId);
  const title = isReady ? data.project.title : "Loading skills...";

  const onUpdate = (evt) =>
    upsertEntry({
      ...evt.detail,
      project_id: projectId
    });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isReady && <SkillMatrix data={data} onUpdate={onUpdate} />}
      </IonContent>
    </IonPage>
  );
};

export default DashboardView;
