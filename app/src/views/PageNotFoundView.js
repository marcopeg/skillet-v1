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
  IonRouterLink
} from "@ionic/react";

import { homeOutline } from "ionicons/icons";

const PageNotFoundView = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="primary">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Oh, a unicorn!</IonTitle>
        <IonButtons slot="secondary">
          <IonButton routerLink="/">
            <IonIcon slot="icon-only" icon={homeOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>
            This page seems to be unavailable :-|
          </IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          <IonRouterLink
            href="/"
            routerLink="/"
            routerAnimation="none"
            routerDirection="root"
          >
            {"Visit our home page"}
          </IonRouterLink>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
);

export default PageNotFoundView;
