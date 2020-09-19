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
  IonBackButton,
  IonTextarea,
  IonButton,
  IonLabel,
  IonIcon
} from "@ionic/react";

import { trashOutline } from "ionicons/icons";

import useDeleteProfile from "../state/use-delete-profile";

const ProfileDeleteView = () => {
  const { message, setMessage, submit, loading } = useDeleteProfile();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/me" />
          </IonButtons>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Delete Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={"ion-padding"}>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>It's sad to see you going away.</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Please take this last opportunity to help me improving this
              product by writing an open feedback regarding this drastic
              decision of yours:
            </p>
            <IonTextarea
              placeholder="I am leaving because..."
              rows={3}
              value={message}
              onIonChange={(e) => setMessage(e.detail.value)}
              clearInput
              style={{ border: "1px solid #ddd" }}
            />
            {loading ? (
              <p className={"ion-float-right"}>Deleting your data...</p>
            ) : (
              <IonButton
                className={"ion-float-right"}
                color="danger"
                onClick={submit}
              >
                <IonLabel>Ok, that's it</IonLabel>
                <IonIcon icon={trashOutline} slot="end" />
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ProfileDeleteView;
