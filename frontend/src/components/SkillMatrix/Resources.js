/**
 * Iterates through the SkillMatrix resources to present groups and lines
 */
import React from "react";
import ResourceValues from "./ResourceValues";

const Resources = ({ data, onUpdate }) => {
  return (
    <tbody>
      {data.res_groups.map((resGroup) => {
        return (
          <React.Fragment key={`rg-${resGroup.id}`}>
            <tr>
              <th
                colSpan={data.prop_values.length + 1}
                className="skm-body-res-group"
              >
                {resGroup.name}
              </th>
            </tr>
            {resGroup.res_values.map((resValue) => {
              return (
                <tr key={`rg-${resGroup.id}-${resValue.id}`}>
                  <th className="skm-body-res-value">{resValue.name}</th>
                  <ResourceValues
                    data={data}
                    resGroup={resGroup}
                    resValue={resValue}
                    onUpdate={onUpdate}
                  />
                </tr>
              );
            })}
          </React.Fragment>
        );
      })}
    </tbody>
  );
};

export default Resources;
