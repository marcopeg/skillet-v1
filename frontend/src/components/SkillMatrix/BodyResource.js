import React from "react";
import Cell from "./Cell";

const BodyResource = ({ resource, group }) => {
  //   console.log(resource);
  return (
    <tr>
      <td>{resource.name}</td>
      {resource.groups.map(($group) =>
        $group.skills.map(($skill) => (
          <Cell
            key={`skm-body-skill-${$skill.id}-${resource.id}`}
            propGroup={$group}
            propValue={$skill}
            resGroup={group}
            resValue={resource}
            data={{}}
            onUpdate={() => {}}
          />
        ))
      )}
    </tr>
  );
};

export default BodyResource;
