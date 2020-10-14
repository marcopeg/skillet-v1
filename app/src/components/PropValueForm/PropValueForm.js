/* eslint-disable */
import "./index.css";
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
    <IonContent
      scrollX={false}
      scrollY={false}
      className="ion-content-v-center"
    >
      <div className="prop-value-form-inner">
        <div className="prop-value-form--header">
          <h1>
            <small>{propGroup.name}</small>
            {propValue.name}
          </h1>
          <p>foobar</p>
        </div>
        <div className="prop-value-form--body">
          <Element
            settings={settings}
            value={value}
            setValue={setValue}
            {...props}
          />
        </div>
      </div>
    </IonContent>
  );
};

export default PropValueForm;
