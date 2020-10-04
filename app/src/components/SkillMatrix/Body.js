import React from "react";
import BodyGroup from "./BodyGroup";

const Body = ({ data, onUpdate }) => {
  return (
    <tbody>
      {data.res.groups.map(($resGroup) => (
        <BodyGroup
          key={`skm-body-group-${$resGroup.id}`}
          data={data}
          resGroup={$resGroup}
          onUpdate={onUpdate}
        />
      ))}
    </tbody>
  );
};

export default Body;
