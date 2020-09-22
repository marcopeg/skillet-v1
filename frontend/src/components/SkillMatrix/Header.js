import React from "react";

import HeaderGroup from "./HeaderGroup";
import HeaderSkill from "./HeaderSkill";

const perc = (val) => `${Math.round(val * 100)}%`;

const Header = ({ data }) => {
  const {
    propValues,
    propGroups,
    project: { efficiency }
  } = data;

  return (
    <thead>
      <tr>
        <td rowSpan={2} className="skm-header-total">
          <span>
            rated: {perc(efficiency.real)}
            <br />
            <small>full: {perc(efficiency.theoric)}</small>
            <br />
            <small>filled: {perc(efficiency.fill)}</small>
          </span>
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
