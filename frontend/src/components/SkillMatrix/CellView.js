/**
 * It renders the current value of a cell using the configuration that
 * comes (will come) from the property / group / project.
 *
 * It is also responsible for the initiation of the editing activity.
 */

import React from "react";

const CellView = ({ value, threshold, requestEdit }) => {
  return (
    <td onClick={requestEdit} className="skm-body-cell" style={threshold.style}>
      <span>{value || "-"}</span>
    </td>
  );
};

export default CellView;
