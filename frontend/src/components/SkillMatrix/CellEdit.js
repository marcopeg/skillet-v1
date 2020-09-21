import React from "react";

import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonRange,
  IonButton,
  IonIcon,
  IonSpinner
} from "@ionic/react";
import { checkmarkOutline } from "ionicons/icons";

const CellEdit = ({
  propGroup,
  propValue,
  resGroup,
  resValue,
  isEditing,
  isLoading,
  value,
  threshold,
  setValue,
  requestSubmit,
  requestCancel
}) => {
  if (!isEditing) return null;
  if (isLoading)
    return (
      <div className="skm-saving">
        <IonSpinner name="dots" />
      </div>
    );

  const onChange = (evt) => setValue(evt.target.value);

  return (
    <IonContent className={"ion-padding"}>
      <p className={"skm-body-cell-mode-edit-info"}>
        <b>{resValue.name}</b> on <b>{propValue.name}</b>
        <br />
        <small>
          {resGroup.name} / {propGroup.name}
        </small>
      </p>
      <p className="skm-body-cell-mode-edit-label">{threshold.label}</p>
      <IonRange
        min={0}
        max={100}
        step={20}
        snaps={true}
        value={value}
        onIonChange={onChange}
      />
      <IonGrid>
        <IonRow>
          <IonCol size={6}>
            <IonButton
              size={"small"}
              fill={"clear"}
              expand={"block"}
              onClick={requestCancel}
            >
              cancel
            </IonButton>
          </IonCol>
          <IonCol size={6}>
            <IonButton size={"small"} expand={"block"} onClick={requestSubmit}>
              <IonIcon icon={checkmarkOutline} slot={"end"} /> Save
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default CellEdit;
