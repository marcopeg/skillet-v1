import React from "react";
import { IonProgressBar } from "@ionic/react";
import Cell from "./Cell";

const getProgressColor = (value) => {
  if (value < 0.4) return "danger";
  if (value < 0.5) return "warning";
  if (value > 0.95) return "success";
  if (value > 0.7) return "primary";
  return "medium";
};

const BodyResource = ({ resource, data, onUpdate }) => {
  const { score } = resource.stats;

  return (
    <tr>
      <td className="skm-body-resource">
        <span>{resource.name}</span>
        <IonProgressBar
          value={score}
          color={getProgressColor(score)}
        ></IonProgressBar>
      </td>
      {resource.propGroups.map(($group) =>
        $group.values.map(($prop) => (
          <Cell
            key={`skm-body-skill-${$prop.id}-${resource.id}`}
            propGroup={$prop.group}
            propValue={$prop}
            resGroup={resource.group}
            resValue={resource}
            data={data}
            onUpdate={onUpdate}
          />
        ))
      )}
    </tr>
  );
};

export default BodyResource;
