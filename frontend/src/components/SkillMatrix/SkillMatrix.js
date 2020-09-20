import React from "react";
import "./skill-matrix.css";

import Properties from "./Properties";
import Resources from "./Resources";

const SkillMatrix = ({ data, onUpdate }) => {
  return (
    <table className="skm-table">
      <Properties data={data} />
      <Resources data={data} onUpdate={onUpdate} />
    </table>
  );
};

export default SkillMatrix;
