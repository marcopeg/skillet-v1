import React, { useMemo } from "react";

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonNote
} from "@ionic/react";

const BoardHeroes = ({ board }) => {
  const { minScore } = board.project.settings.appearance.BoardHeroes;
  const $heroes = $ => $.stats.score >= minScore;
  const $order = (a, b) => b.stats.score - a.stats.score;

  const heroes = useMemo(() => board.res.values.filter($heroes).sort($order), [
    board
  ]);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Heroes:</IonCardTitle>
      </IonCardHeader>

      {heroes.map(resValue => (
        <IonItem
          key={resValue.id}
          lines="full"
          routerLink={`/p/${board.project.id}/resources/v/${resValue.id}`}
          routerDirection="forward"
        >
          <IonLabel>{resValue.name}</IonLabel>
          <IonNote slot="end" color="success">
            {Math.round(resValue.stats.score * 10000)}
          </IonNote>
        </IonItem>
      ))}
    </IonCard>
  );
};

export default BoardHeroes;
