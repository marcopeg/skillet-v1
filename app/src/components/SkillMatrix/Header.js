import React from "react";

import HeaderGroup from "./HeaderGroup";
import HeaderSkill from "./HeaderSkill";

const perc = (val) => Math.round(val * 100);

const Header = ({ data }) => {
  return (
    <thead>
      <tr>
        <td rowSpan={2} className="skm-header-total">
          <span>
            {"score: "}
            <b>{perc(data.project.stats.score)}%</b>
            <br />
            <small>
              {"fill rate:"} {perc(data.project.stats.fillRate)}%
            </small>
          </span>
        </td>
        {data.prop.groups.map(($group) => (
          <HeaderGroup
            key={`skm-header-group-${$group.id}`}
            propGroup={$group}
          />
        ))}
      </tr>
      <tr>
        {data.prop.groups.map(($group) =>
          $group.values.map(($skill) => (
            <HeaderSkill key={`skm-header-skill-${$skill.id}`} skill={$skill} />
          ))
        )}
      </tr>
    </thead>
  );
};

export default Header;
