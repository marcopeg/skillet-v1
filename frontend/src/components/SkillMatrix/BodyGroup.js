import React from "react";
import BodyResource from "./BodyResource";

const BodyGroup = ({ data, group, onUpdate }) => {
  return (
    <>
      <tr>
        <td className="skm-body-group" colSpan={data.propValues.length + 1}>
          <span>{group.name}</span>
        </td>
      </tr>
      {group.resources.map(($resource) => (
        <BodyResource
          key={`skm-body-resource-${$resource.id}`}
          data={data}
          resource={$resource}
          onUpdate={onUpdate}
        />
      ))}
    </>
  );
};

export default BodyGroup;
