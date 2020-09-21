import React, { useMemo } from "react";

import HeaderGroup from "./HeaderGroup";
import HeaderSkill from "./HeaderSkill";

const Header = ({ data }) => {
  const groups = useMemo(
    () =>
      data.propGroups.map(($group) => {
        const skills = data.propValues.filter(($) => $.groupId === $group.id);
        const skillsIds = skills.map(($) => $.id);
        const entries = data.entries.filter(($) =>
          skillsIds.includes($.propId)
        );

        return {
          ...$group,
          skills,
          entries
        };
      }),
    [data]
  );

  const skills = useMemo(
    () => groups.reduce((acc, $group) => [...acc, ...$group.skills], []),
    [groups]
  );

  return (
    <thead>
      <tr>
        <td rowSpan={2} className="skm-header-total">
          <span>x</span>
        </td>
        {groups.map(($group) => (
          <HeaderGroup key={`skm-header-group-${$group.id}`} group={$group} />
        ))}
      </tr>
      <tr>
        {skills.map(($skill) => (
          <HeaderSkill key={`skm-header-skill-${$skill.id}`} skill={$skill} />
        ))}
      </tr>
    </thead>
  );
};

export default Header;
