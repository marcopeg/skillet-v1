import React from "react";

import Cell from "./Cell";

const Values = ({ data, resource, onUpdate }) => {
  return data.prop_groups.map((prop_group) => {
    return prop_group.prop_values.map((prop_value) => {
      //   console.log(group.name, value.name, value);

      return (
        <Cell
          key={`gr-${prop_group.id}-${prop_value.id}-${resource.id}`}
          data={data}
          propGroup={prop_group}
          propValue={prop_value}
          resource={resource}
          onUpdate={onUpdate}
        />
      );
    });
  });
};

export default Values;
