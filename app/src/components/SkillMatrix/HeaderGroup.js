import React from "react";
import ScoreProgressBar from "./ScoreProgressBar";

const HeaderGroup = ({ propGroup }) => {
  const style = {
    width: 30 * propGroup.values.length
  };
  return (
    <td colSpan={propGroup.values.length} className="skm-header-group">
      <span style={style}>{propGroup.name}</span>
      <ScoreProgressBar value={propGroup.stats.fillRate} color="medium" />
    </td>
  );
};

export default HeaderGroup;
