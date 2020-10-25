import React from "react";
import ScoreProgressBar from "./ScoreProgressBar";
import { useHistory, useParams } from "react-router-dom";

const HeaderSkill = ({ skill }) => {
  const { projectId } = useParams();
  const history = useHistory();

  const navigateToProp = () => {
    history.push(`/p/${projectId}/properties/v/${skill.id}`);
  };

  return (
    <td className="skm-header-skill" onClick={navigateToProp}>
      <span>{skill.name}</span>
      <ScoreProgressBar value={skill.stats.fillRate} color="medium" />
    </td>
  );
};

export default HeaderSkill;
