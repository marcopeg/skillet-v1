import React from "react";

import { IonItem, IonIcon, IonLabel } from "@ionic/react";

import { logoGithub, chevronForwardOutline } from "ionicons/icons";

const GithubIssue = () => (
  <IonItem
    href="https://github.com/marcopeg/skill-matrix/issues/new"
    rel="external"
    target="_blank"
    lines="none"
    detail={false}
  >
    <IonIcon slot="start" icon={logoGithub} />
    <IonLabel>Add a GitHub Issue</IonLabel>
    <IonIcon slot="end" icon={chevronForwardOutline} />
  </IonItem>
);

export default GithubIssue;
