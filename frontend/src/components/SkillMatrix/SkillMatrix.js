import React from "react";
import "./skill-matrix.css";

import Properties from "./Properties";
import Resources from "./Resources";

const SkillMatrix = ({ data, onUpdate }) => {
  return (
    <div class="skm-container">
      <table className="skm-table skm-table-headers">
        <Properties data={data} />
      </table>
      <table className="skm-table skm-table-body">
        <Resources data={data} onUpdate={onUpdate} />
      </table>
    </div>
  );
};

export default SkillMatrix;
