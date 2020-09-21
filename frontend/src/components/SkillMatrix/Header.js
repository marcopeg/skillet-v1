import React from "react";

import HeaderGroup from "./HeaderGroup";
import HeaderSkill from "./HeaderSkill";

const Header = ({ data }) => {
  const { propValues, propGroups } = data;

  return (
    <thead>
      <tr>
        <td rowSpan={2} className="skm-header-total">
          <span>x</span>
        </td>
        {propGroups.map(($group) => (
          <HeaderGroup key={`skm-header-group-${$group.id}`} group={$group} />
        ))}
      </tr>
      <tr>
        {propValues.map(($skill) => (
          <HeaderSkill key={`skm-header-skill-${$skill.id}`} skill={$skill} />
        ))}
      </tr>
    </thead>
  );
};

export default Header;
