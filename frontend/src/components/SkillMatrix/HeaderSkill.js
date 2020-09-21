import React, { useMemo } from "react";

const HeaderSkill = ({ skill }) => {
  return (
    <td className="skm-header-skill">
      <span>{skill.name}</span>
    </td>
  );
};

export default HeaderSkill;
