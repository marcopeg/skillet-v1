import React from "react";
import { IonProgressBar } from "@ionic/react";

const getProgressColor = (value) => {
  if (value < 0.4) return "danger";
  if (value < 0.5) return "warning";
  if (value > 0.95) return "success";
  if (value > 0.7) return "primary";
  return "medium";
};

const ScoreProgressBar = ({ value, color, ...props }) => (
  <IonProgressBar
    {...props}
    value={value}
    color={color || getProgressColor(value)}
    style={{ height: 2 }}
  ></IonProgressBar>
);

export default ScoreProgressBar;
