/**
 * It renders the current value of a cell using the configuration that
 * comes (will come) from the property / group / project.
 *
 * It is also responsible for the initiation of the editing activity.
 */

import React, { useMemo } from "react";

const CellView = ({ entry, value, requestEdit }) => {
  const showValue = useMemo(() => {
    if (value !== null) return value;
    return entry ? entry.value : "-";
  }, [entry, value]);

  return (
    <td onClick={requestEdit} className="skm-body-cell-mode-view">
      {showValue}
    </td>
  );
};

export default CellView;
