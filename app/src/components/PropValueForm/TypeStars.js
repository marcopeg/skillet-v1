import React from "react";
import { IonIcon } from "@ionic/react";
import { star, starOutline } from "ionicons/icons";

const TypeStars = ({
  settings: {
    options: { stars: options }
  },
  value,
  setValue
}) => {
  // console.log("@@", settings);

  const getStarValue = idx => Math.round((100 / options.top) * (idx + 1));
  const getStarIcon = idx => (value >= getStarValue(idx) ? star : starOutline);
  const applyStarValue = idx => {
    const starValue = getStarValue(idx);
    return starValue === value ? 0 : starValue;
  };

  const stars = new Array(options.top)
    .fill(null)
    .map((_, idx) => (
      <IonIcon
        key={`star-${idx}`}
        icon={getStarIcon(idx)}
        style={options.style}
        onClick={() => setValue(applyStarValue(idx))}
      />
    ));

  return <div>{stars}</div>;
};

export default TypeStars;
