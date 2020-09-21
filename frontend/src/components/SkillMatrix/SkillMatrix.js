import React from "react";
import "./skill-matrix.css";

import Header from "./Header";
import Body from "./Body";

const SkillMatrix = ({ data, onUpdate }) => {
  const style = {
    width: 130 + data.propValues.length * 31
  };

  return (
    <div className="skm-container" style={style}>
      <table className="skm-table skm-table-headers">
        <Header data={data} />
      </table>
      <table className="skm-table skm-table-body">
        <Body data={data} onUpdate={onUpdate} />
      </table>
    </div>
  );
};

export default SkillMatrix;
