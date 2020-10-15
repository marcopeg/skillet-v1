import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon
} from "@ionic/react";

import { homeOutline } from "ionicons/icons";

// Hooks
import useIsMobile from "../hooks/use-is-mobile";
import useBoardByProjectId from "../state/board/use-board-by-project-id";

import SkillMatrix from "../components/SkillMatrix/SkillMatrix";

const DashboardView = () => {
  const isMobile = useIsMobile();
  const { isReady, data } = useBoardByProjectId();

  const title = isReady ? data.project.title : "Loading skills...";
  const showMatrix =
    isReady && data.prop.values.length && data.res.values.length;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            {isMobile ? (
              <IonButton routerLink="/" routerDirection="back">
                <IonIcon icon={homeOutline} />
              </IonButton>
            ) : (
              <IonMenuButton />
            )}
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollX={true} className="ion-padding">
        {showMatrix ? (
          <>
            <div className="ion-margin-bottom">
              <b>NOTE:</b> The data collected will be used only in an aggregate
              way to generate metrics and statistics.
            </div>
            <SkillMatrix data={data} />
          </>
        ) : (
          <div>
            Welcome to a new Skill Matrix project,
            <br />
            please navigate to <b>resources</b> and <b>properties</b> to
            populate the structure of this project.
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DashboardView;
