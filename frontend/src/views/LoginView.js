/* eslint-disable */

import React, { useState } from "react";
import useAuth from "../hooks/use-auth";
import useLogin from "../state/use-login";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonInput,
  IonItem,
  IonList
} from "@ionic/react";

const HomeView = () => {
  const {
    isLoading,
    email,
    secret,
    emailWasConfirmed,
    confirmEmail,
    confirmSecret,
    setEmail,
    setSecret
  } = useLogin();

  const body = (() => {
    if (isLoading) {
      return "loading....";
    }

    if (emailWasConfirmed)
      return (
        <IonList>
          <IonItem>
            <IonInput
              placeholder="Enter confirm code"
              value={secret}
              onIonChange={(e) => setSecret(e.detail.value)}
            />
            {secret && <IonButton onClick={confirmSecret}>Continue</IonButton>}
          </IonItem>
        </IonList>
      );

    return (
      <IonList>
        <IonItem>
          <IonInput
            placeholder="Enter your email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value)}
          />
          {email && <IonButton onClick={confirmEmail}>Continue</IonButton>}
        </IonItem>
      </IonList>
    );
  })();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{"Login"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{body}</IonContent>
    </IonPage>
  );
};

export default HomeView;
