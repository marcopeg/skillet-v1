import React, { useMemo } from "react";
import BodyGroup from "./BodyGroup";

const Body = ({ data, onUpdate }) => {
  return (
    <tbody>
      {data.resGroups.map(($group) => (
        <BodyGroup
          key={`skm-body-group-${$group.id}`}
          data={data}
          group={$group}
          onUpdate={onUpdate}
        />
      ))}
    </tbody>
  );
};

export default Body;
