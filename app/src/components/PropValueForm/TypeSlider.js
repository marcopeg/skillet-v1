/* eslint-disable */
import React, { useMemo } from "react";
import "./TypeSlider.css";

import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonRange,
  IonButton,
  IonIcon,
  IonSpinner,
  IonText
} from "@ionic/react";

const TypeSlider = ({
  settings: {
    options: { slider: options }
  },
  value,
  setValue,
  requestLockSlides,
  requestUnlockSlides
}) => {
  // Calculate the current threshold of the cell
  const threshold = useMemo(() => {
    if (value === null) return options.thresholds._null;
    const item = options.thresholds.values.find($ => $.applyFrom >= value);
    return item || options.thresholds._error;
  }, [options, value]);

  const onChange = evt => {
    console.log("@@change", evt.target.value);
    setValue(evt.target.value);
  };

  return (
    <div className="prop-value-form__type-slider">
      <div className="prop-value-form__type-slider--label">
        <IonText color="primary">{threshold.label}</IonText>
      </div>
      <div className="prop-value-form__type-slider--control">
        <IonRange
          {...options.props.range}
          value={value}
          onIonChange={onChange}
          onIonFocus={requestLockSlides}
          onIonBlur={requestUnlockSlides}
        />
      </div>
    </div>
  );
};

export default TypeSlider;
