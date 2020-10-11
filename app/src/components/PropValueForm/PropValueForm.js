/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from "@ionic/react";
import { checkmarkOutline } from "ionicons/icons";

import TypeSlider from "./TypeSlider";
import TypeStars from "./TypeStars";

const types = {
  slider: TypeSlider,
  stars: TypeStars
};

const PropValueForm = ({
  settings,
  value,
  setValue,
  propGroup,
  propValue,
  requestSkip,
  requestSubmit,
  ...props
}) => {
  const Element = types[settings.type];
  return (
    <IonContent scrollX={false} scrollY={false} className="ion-content-center">
      <div className="prop-value-form-inner">
        <h1>
          {propValue.name}
          <small>{propGroup.name}</small>
        </h1>
        <Element
          settings={settings}
          value={value}
          setValue={setValue}
          {...props}
        />
      </div>
    </IonContent>
  );
};

export default PropValueForm;
