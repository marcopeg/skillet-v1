import React from "react";

import Values from "./Values";

const Resources = ({ data, onUpdate }) => {
  return (
    <tbody>
      {data.res_groups.map((group) => {
        return (
          <React.Fragment key={`rg-${group.id}`}>
            <tr>
              <th colSpan={data.prop_values.length + 1}>{group.name}</th>
            </tr>
            {group.res_values.map((value) => {
              return (
                <tr key={`rg-${group.id}-${value.id}`}>
                  <th>{value.name}</th>
                  <Values data={data} resource={value} onUpdate={onUpdate} />
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
