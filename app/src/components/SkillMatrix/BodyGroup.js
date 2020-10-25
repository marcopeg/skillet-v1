import React from "react";
import BodyResource from "./BodyResource";
import ScoreProgressBar from "./ScoreProgressBar";

const BodyGroup = ({ data, resGroup, onUpdate }) => {
  return (
    <>
      <tr>
        <td className="skm-body-group" colSpan={data.prop.values.length + 1}>
          <span>{resGroup.name}</span>
          <div style={{ maxWidth: 130 }}>
            <ScoreProgressBar value={resGroup.stats.fillRate} color="medium" />
          </div>
        </td>
      </tr>
      {resGroup.values.map(resValue => (
        <BodyResource
          key={`skm-body-resValue-${resValue.id}`}
          data={data}
          resGroup={resGroup}
          resValue={resValue}
          onUpdate={onUpdate}
        />
      ))}
    </>
  );
};

export default BodyGroup;
