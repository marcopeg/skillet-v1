import React from "react";

const Properties = ({ data }) => {
  // console.log(data);

  return (
    <>
      <tr>
        <th rowSpan={2} className="skm-header-c1">
          x
        </th>
        {data.prop_groups.map((group) => {
          return (
            <th
              key={`gr-${group.id}`}
              colSpan={group.prop_values.length}
              className="skm-header-prop-group"
            >
              {group.name}
            </th>
          );
        })}
      </tr>
      <tr>
        {data.prop_groups.map((group) => {
          return group.prop_values.map((value) => {
            return (
              <th
                key={`gr-${group.id}-${value.id}`}
                className="skm-header-prop-value"
              >
                <span>{value.name}</span>
              </th>
            );
          });
        })}
      </tr>
    </>
  );
};

export default Properties;
