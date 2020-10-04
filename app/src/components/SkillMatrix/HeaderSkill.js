import React from "react";
import ScoreProgressBar from "./ScoreProgressBar";

const HeaderSkill = ({ skill }) => {
  return (
    <td className="skm-header-skill">
      <span>{skill.name}</span>
      <ScoreProgressBar value={skill.stats.score} color="medium" />
    </td>
  );
};

export default HeaderSkill;
