/**
 * Renders a single entry for the SkillMatrix.
 *
 */

import React, { useState, useMemo } from "react";
import deepmerge from "deepmerge";

import { IonPopover } from "@ionic/react";

import CellView from "./CellView";
import CellEdit from "./CellEdit";

const defaultSettings = {
  thresholds: {
    _null: {
      style: { backgroundColor: "#f9caca" },
      label: "Damn it, fill this stuff"
    },
    _error: {
      style: { backgroundColor: "#ff1c1c" },
      label: "Damn it, fill this stuff"
    },
    values: [
      {
        value: 0,
        style: { backgroundColor: "#fff" },
        label: "I have no idea"
      },
      {
        value: 20,
        style: { backgroundColor: "#DFEED4" },
        label: "I know the pourpose of it"
      },
      {
        value: 40,
        style: { backgroundColor: "#CCE8B5" },
        label: "I have Hello World experience"
      },
      {
        value: 60,
        style: { backgroundColor: "#B2DD8B" },
        label: "I can handle tasks"
      },
      {
        value: 80,
        style: { backgroundColor: "#97D35E" },
        label: "I feel I'm an expert"
      },
      {
        value: 100,
        style: { backgroundColor: "#97D35E" },
        label: "I'm a master of it"
      }
    ]
  }
};

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

  // Extract the entry that is related to this specific cell.
  const entry = useMemo(() => {
    const entryFilter = ($) => $.prop_value_id === propValue.id;
    return resValue.entries.find(entryFilter);
  }, [resValue.entries, propValue.id]);

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
        mode={"ios"}
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
  // const [isLoading, setIsLoading] = useState(false);
  // const [isEditing, setIsEditing] = useState(null);
  // const [currValue, setCurrValue] = useState(null);

  // const startEdit = (evt) => {
  //   evt.persist();
  //   setCurrValue(entry ? entry.value : 0);
  //   setIsEditing(evt);
  // };

  // const updateValue = (evt) => setCurrValue(evt.target.value);

  // const handleGestoures = (evt) => {
  //   if (evt.keyCode === 27 || evt.keyCode === 13) {
  //     setIsEditing(null);
  //   }
  //   if (evt.keyCode === 13) {
  //     setIsLoading(true);
  //     const p = onUpdate({
  //       detail: {
  //         prop_value_id: propValue.id,
  //         res_value_id: resValue.id,
  //         value: currValue
  //       }
  //     });

  //     try {
  //       p.finally(() => setIsLoading(null));
  //     } catch (err) {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  // if (isLoading) {
  //   return <td>...</td>;
  // }

  // return (
  //   <>
  //     <td onClick={startEdit} className="skm-body-cell-mode-view">
  //       {entry ? entry.value : "-"}
  //     </td>
  //     {/* <IonPopover isOpen={isEditing !== null} event={isEditing}>
  //       <IonInput
  //         autofocus
  //         type="number"
  //         value={currValue}
  //         onIonChange={updateValue}
  //         min={0}
  //         max={100}
  //         size={4}
  //         step={20}
  //         onKeyUp={handleGestoures}
  //       />
  //     </IonPopover> */}
  //   </>
  // );
};

export default Cell;
