import React, { useMemo } from "react";
import BodyResource from "./BodyResource";

const BodyGroup = ({ group }) => {
  return (
    <>
      <tr>
        <td className="skm-body-group">
          <span>{group.name}</span>
        </td>
      </tr>
      <tr>
        <td>
          <table>
            <tbody>
              {group.resources.map(($resource) => (
                <BodyResource
                  key={`skm-body-resource-${$resource.id}`}
                  resource={$resource}
                  group={group}
                />
              ))}
            </tbody>
          </table>
        </td>
      </tr>
    </>
  );
};

export default BodyGroup;
