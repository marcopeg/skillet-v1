import React from "react";

const HeaderGroup = ({ group }) => {
  const style = {
    width: 30 * group.skills.length
  };
  return (
    <td colSpan={group.skills.length} className="skm-header-group">
      <span style={style}>{group.name}</span>
    </td>
  );
};

export default HeaderGroup;
