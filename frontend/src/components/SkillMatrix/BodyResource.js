import React from "react";
import Cell from "./Cell";

const BodyResource = ({ resource, data, onUpdate }) => {
  return (
    <tr>
      <td className="skm-body-resource">
        <span>{resource.name}</span>
      </td>
      {resource.props.map(($prop) => (
        <Cell
          key={`skm-body-skill-${$prop.id}-${resource.id}`}
          propGroup={$prop.group}
          propValue={$prop}
          resGroup={resource.group}
          resValue={resource}
          data={data}
          onUpdate={onUpdate}
        />
      ))}
    </tr>
  );
};

export default BodyResource;
