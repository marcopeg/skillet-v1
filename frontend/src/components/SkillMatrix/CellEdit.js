import React from "react";

import { IonInput } from "@ionic/react";

const CellEdit = ({
  isEditing,
  isLoading,
  value,
  setValue,
  requestSubmit,
  requestCancel
}) => {
  if (!isEditing) return null;
  if (isLoading) return "saving...";

  const onChange = (evt) => setValue(evt.target.value);

  const onKeyUp = (evt) => {
    // ESC to cancel
    if (evt.keyCode === 27) {
      requestCancel();
    }

    // Enter to submit
    if (evt.keyCode === 13) {
      requestSubmit();
    }
  };

  return (
    <IonInput
      autofocus
      type="number"
      value={value}
      onIonChange={onChange}
      min={0}
      max={100}
      size={4}
      step={20}
      onKeyUp={onKeyUp}
    />
  );
};

export default CellEdit;
