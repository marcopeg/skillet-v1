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

const DashboardView = () => {
  const { isReady, data } = useProject();
  const { upsertEntry } = useEntryUpsert();
  const title = isReady ? data.project.title : "Loading skills...";

  const onUpdate = (evt) => upsertEntry(evt.detail);

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
      <IonContent scrollX={true}>
        {isReady && <SkillMatrix data={data} onUpdate={onUpdate} />}
      </IonContent>
    </IonPage>
  );
};

export default DashboardView;
