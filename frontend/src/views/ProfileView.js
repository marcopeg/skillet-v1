import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList
} from "@ionic/react";

import { logOutOutline, trashOutline } from "ionicons/icons";
import useLogout from "../state/use-logout";

const ProfileView = () => {
  const { logout } = useLogout();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{"{{ username }}"}</IonTitle>
          <IonButtons slot="primary">
            <IonButton onClick={logout}>
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Hello User!</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>{"{{ user profile stuff }}"}</IonCardContent>
        </IonCard>

        <IonList>
          <IonItem routerLink="/me/delete" lines="none">
            <IonIcon slot="start" icon={trashOutline} />
            <IonLabel>Delete my profile permanently</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ProfileView;
