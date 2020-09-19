import React, { useState } from "react";

const Cell = ({ propValue, resource, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currValue, setCurrValue] = useState(null);

  const filter = (entry) => entry.prop_value_id === propValue.id;
  const entry = resource.entries.find(filter);

  const startEdit = () => {
    setCurrValue(entry ? entry.value : 0);
    setIsEditing(true);
  };

  const updateValue = (evt) => setCurrValue(evt.target.value);

  const handleGestoures = (evt) => {
    if (evt.keyCode === 27 || evt.keyCode === 13) {
      setIsEditing(false);
    }
    if (evt.keyCode === 13) {
      setIsLoading(true);
      const p = onUpdate({
        detail: {
          prop_value_id: propValue.id,
          res_value_id: resource.id,
          value: currValue
        }
      });

      try {
        p.finally(() => setIsLoading(false));
      } catch (err) {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <td>...</td>;
  }

  if (isEditing) {
    return (
      <td>
        <input
          type="number"
          value={currValue}
          onChange={updateValue}
          onKeyUp={handleGestoures}
        />
      </td>
    );
  }

  return <td onClick={startEdit}>{entry ? entry.value : "-"}</td>;
};

export default Cell;
