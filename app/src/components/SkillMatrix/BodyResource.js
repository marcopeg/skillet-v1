import React from "react";
import Cell from "./Cell";
import ScoreProgressBar from "./ScoreProgressBar";

const BodyResource = ({ resGroup, resValue, data, onUpdate }) => {
  const { score } = resValue.stats;

  return (
    <tr>
      <td className="skm-body-resource">
        <span>{resValue.name}</span>
        <ScoreProgressBar value={score} />
      </td>
      {data.prop.groups.map((propGroup) =>
        propGroup.values.map((propValue) => {
          return (
            <Cell
              key={`skm-body-skill-${propValue.id}-${resValue.id}`}
              propGroup={propGroup}
              propValue={propValue}
              resGroup={resGroup}
              resValue={resValue}
              data={data}
              onUpdate={onUpdate}
            />
          );
        })
      )}
    </tr>
  );
};

export default BodyResource;
