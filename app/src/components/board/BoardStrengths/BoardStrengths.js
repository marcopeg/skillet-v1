import React, { useMemo } from "react";

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonNote
} from "@ionic/react";

const BoardStrengths = ({ board }) => {
  const { minScore } = board.project.settings.appearance.BoardStrengths;
  const $strengths = $ => $.stats.score >= minScore;
  const $order = (a, b) => b.stats.score - a.stats.score;

  const strengths = useMemo(
    () => board.prop.values.filter($strengths).sort($order),
    [board]
  );

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Strengths:</IonCardTitle>
      </IonCardHeader>

      {strengths.map(propValue => (
        <IonItem
          key={propValue.id}
          lines="full"
          routerLink={`/p/${board.project.id}/properties/v/${propValue.id}`}
          routerDirection="forward"
        >
          <IonLabel>{propValue.name}</IonLabel>
          <IonNote slot="end" color="success">
            {Math.round(propValue.stats.score * 10000)}
          </IonNote>
        </IonItem>
      ))}
    </IonCard>
  );
};

export default BoardStrengths;
