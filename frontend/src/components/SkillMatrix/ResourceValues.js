/**
 * Iterates through the SkillMatrix properties to render each value's Cell
 * The value is alwaus related to a specific resource that is passed as prop
 */

import React from "react";
import Cell from "./Cell";

const ResourceValues = ({ resGroup, resValue, data, onUpdate }) => {
  return data.prop_groups.map((propGroup) => {
    return propGroup.prop_values.map((propValue) => {
      return (
        <Cell
          key={`gr-${propGroup.id}-${propValue.id}-${resValue.id}`}
          propGroup={propGroup}
          propValue={propValue}
          resGroup={resGroup}
          resValue={resValue}
          data={data}
          onUpdate={onUpdate}
        />
      );
    });
  });
};

export default ResourceValues;
