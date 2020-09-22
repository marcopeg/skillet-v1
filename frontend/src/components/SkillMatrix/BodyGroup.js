import React from "react";
import BodyResource from "./BodyResource";

const perc = (val) => `${Math.round(val * 100)}%`;

const BodyGroup = ({ data, group, onUpdate }) => {
  const { efficiency } = group;

  return (
    <>
      <tr>
        <td className="skm-body-group" colSpan={data.propValues.length + 1}>
          <span>{group.name}</span>
          <span>
            <small>
              rated: {perc(efficiency.real)}
              {"; "}
            </small>
            <small>full: {perc(efficiency.theoric)}</small>
            {"; "}
            <small>filled: {perc(efficiency.fill)}</small>
          </span>
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
