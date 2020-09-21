import React from "react";
import "./skill-matrix.css";

import Header from "./Header";
import Body from "./Body";

const SkillMatrix = ({ data, onUpdate }) => {
  const style = {
    // width: 100 + data.propValues.length * 31
  };

  return (
    <div className="skm-container">
      <table className="skm-table skm-table-headers" style={style}>
        <Header data={data} />
      </table>
      <table className="skm-table skm-table-body" style={style}>
        <Body data={data} onUpdate={onUpdate} />
      </table>
    </div>
  );
};

export default SkillMatrix;
