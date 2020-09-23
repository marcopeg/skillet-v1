import React from "react";

import HeaderGroup from "./HeaderGroup";
import HeaderSkill from "./HeaderSkill";

const perc = (val) => Math.round(val * 100);

const Header = ({ data }) => {
  const {
    propGroups,
    project: { stats }
  } = data;

  return (
    <thead>
      <tr>
        <td rowSpan={2} className="skm-header-total">
          <span>
            <b>{perc(stats.score)}</b>
            <br />
            <small>board: {perc(stats.boardScore)}%</small>
            <br />
            <small>entries: {perc(stats.entriesScore)}%</small>
            <br />
            <small>completion: {perc(stats.completionRate)}%</small>
          </span>
        </td>
        {propGroups.map(($group) => (
          <HeaderGroup key={`skm-header-group-${$group.id}`} group={$group} />
        ))}
      </tr>
      <tr>
        {propGroups.map(($group) =>
          $group.values.map(($skill) => (
            <HeaderSkill key={`skm-header-skill-${$skill.id}`} skill={$skill} />
          ))
        )}
      </tr>
    </thead>
  );
};

export default Header;
