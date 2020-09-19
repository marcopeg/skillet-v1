import React from "react";

const Properties = ({ data }) => {
  console.log(data);

  return (
    <thead>
      <tr>
        <th rowSpan={2}>x</th>
        {data.prop_groups.map((group) => {
          return (
            <th key={`gr-${group.id}`} colSpan={group.prop_values.length}>
              {group.name}
            </th>
          );
        })}
      </tr>
      <tr>
        {data.prop_groups.map((group) => {
          return group.prop_values.map((value) => {
            return <th key={`gr-${group.id}-${value.id}`}>{value.name}</th>;
          });
        })}
      </tr>
    </thead>
  );
};

export default Properties;
