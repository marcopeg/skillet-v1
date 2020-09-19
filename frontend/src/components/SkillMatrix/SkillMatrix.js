import React from "react";

import Properties from "./Properties";
import Resources from "./Resources";

const SkillMatrix = ({ data, onUpdate }) => {
  return (
    <table border={1}>
      <Properties data={data} />
      <Resources data={data} onUpdate={onUpdate} />
    </table>
  );
};

export default SkillMatrix;
