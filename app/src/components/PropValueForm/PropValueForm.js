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

const PropValueForm = ({ settings, ...props }) => {
  const Element = types[settings.type];
  return <Element settings={settings} {...props} />;
};

export default PropValueForm;
