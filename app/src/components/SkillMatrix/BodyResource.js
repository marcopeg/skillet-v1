import React from "react";
import Cell from "./Cell";
import ScoreProgressBar from "./ScoreProgressBar";
import { useHistory, useParams } from "react-router-dom";

const BodyResource = ({ resGroup, resValue, data, onUpdate }) => {
  const { projectId } = useParams();
  const history = useHistory();
  const { score } = resValue.stats;

  const navigateToUser = () => {
    history.push(`/p/${projectId}/resources/v/${resValue.id}`);
  };

  return (
    <tr>
      <td className="skm-body-resource" onClick={navigateToUser}>
        <span>{resValue.name}</span>
        <ScoreProgressBar value={score} />
      </td>
      {data.prop.groups.map(propGroup =>
        propGroup.values.map(propValue => {
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
