/**
 * Renders a single entry for the SkillMatrix.
 *
 */

import React, { useState, useMemo } from "react";
import deepmerge from "deepmerge";

import { IonPopover } from "@ionic/react";

import CellView from "./CellView";
import CellEdit from "./CellEdit";

// Static default settings are now part of the data model
const defaultSettings = {};

const Cell = ({ propGroup, propValue, resGroup, resValue, data, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [currValue, setCurrValue] = useState(null);

  // Extract the current settings to apply to this cell.
  const settings = useMemo(
    () =>
      deepmerge(
        defaultSettings,
        data.settings || {},
        propGroup.settings || {},
        propValue.settings || {}
      ),
    [propValue.settings, propGroup.settings, data.settings]
  );

  // TODO: filter by "point of view"?
  const entry = propValue.entries[0];

  // Calculate the current used value to represent while editing
  const useValue = useMemo(
    () => (currValue !== null ? currValue : entry ? entry.value : null),
    [entry, currValue]
  );

  // Calculate the current threshold of the cell
  const threshold = useMemo(() => {
    if (useValue === null) return settings.thresholds._null;
    const value = settings.thresholds.values.find(($) => $.value >= useValue);
    return value || settings.thresholds._error;
  }, [settings.thresholds, useValue]);

  // console.log(threshold);

  // Persist the event so the Popover can mount in relation to it.
  const onRequestEdit = (evt) => {
    evt.persist();
    setCurrValue(entry ? entry.value : 0);
    setIsEditing(evt);
  };

  // Reset the current value to null so that the original value
  // could be represented instead.
  const requestCancel = () => {
    setIsLoading(false);
    setIsEditing(null);
    setCurrValue(null);
  };

  const requestSubmit = () => {
    setIsLoading(true);
    const p = onUpdate({
      detail: {
        prop_value_id: propValue.id,
        res_value_id: resValue.id,
        value: currValue
      }
    });

    // Slow down save time to allow the push update to be
    // applied to the SkillMatrix.
    // It's kinda of a cheap trick, but it should do the job.
    try {
      p.finally(() => setTimeout(requestCancel, 500));
    } catch (err) {
      requestCancel();
    }
  };

  return (
    <>
      <CellView
        entry={entry}
        value={useValue}
        settings={settings}
        threshold={threshold}
        requestEdit={onRequestEdit}
      />
      <IonPopover
        isOpen={!!isEditing}
        event={isEditing}
        onDidDismiss={requestCancel}
      >
        <CellEdit
          propGroup={propGroup}
          propValue={propValue}
          resGroup={resGroup}
          resValue={resValue}
          isEditing={!!isEditing}
          isLoading={isLoading}
          value={currValue}
          settings={settings}
          threshold={threshold}
          setValue={setCurrValue}
          requestCancel={requestCancel}
          requestSubmit={requestSubmit}
        />
      </IonPopover>
    </>
  );
};

export default Cell;
