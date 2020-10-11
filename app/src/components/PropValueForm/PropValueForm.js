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
  propGroup,
  propValue,
  requestSkip,
  requestSubmit,
  ...props
}) => {
  const [currentValue, setValue] = useState(value);

  const Element = types[settings.type];

  const requestCancel = () => {
    setValue(null);
    requestSkip();
  };

  return (
    <IonContent>
      <IonCard>
        <IonCardHeader color="primary">
          <IonCardTitle>
            <small>{propGroup.name} </small>
            {propValue.name}
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow
              className={"ion-align-items-center"}
              style={{ height: 100, overflow: "hidden" }}
            >
              <IonCol size={12}>
                <Element
                  settings={settings}
                  value={currentValue}
                  setValue={setValue}
                  {...props}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid>
            <IonRow>
              <IonCol size={6}>
                <IonButton
                  size={"small"}
                  fill={"clear"}
                  expand={"block"}
                  onClick={requestCancel}
                >
                  skip
                </IonButton>
              </IonCol>
              <IonCol size={6}>
                <IonButton
                  disabled={currentValue === null}
                  size={"small"}
                  expand={"block"}
                  onClick={() => requestSubmit(currentValue)}
                >
                  <IonIcon icon={checkmarkOutline} slot={"end"} /> Save
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default PropValueForm;
