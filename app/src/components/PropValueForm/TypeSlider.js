/* eslint-disable */
import React, { useMemo } from "react";

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

  const onChange = evt => setValue(evt.target.value);

  return (
    <div style={{ textAlign: "left" }}>
      <p>{threshold.label}</p>
      <IonRange
        {...options.props.range}
        value={value}
        onIonChange={onChange}
        onIonFocus={requestLockSlides}
        onIonBlur={requestUnlockSlides}
      />
    </div>
  );
};

export default TypeSlider;
