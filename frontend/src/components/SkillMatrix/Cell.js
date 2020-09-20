/* eslint-disable */
/**
 * Renders a single entry for the SkillMatrix.
 *
 */

import React, { useState, useMemo } from "react";

import { IonInput, IonPopover, Popover } from "@ionic/react";

import CellView from "./CellView";
import CellEdit from "./CellEdit";

const noop = () => {};

const Cell = ({ propGroup, propValue, resGroup, resValue, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [currValue, setCurrValue] = useState(null);

  // Extract the entry that is related to this specific cell.
  const entry = useMemo(() => {
    const entryFilter = ($) => $.prop_value_id === propValue.id;
    return resValue.entries.find(entryFilter);
  }, [resValue.entries]);

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
      <CellView entry={entry} value={currValue} requestEdit={onRequestEdit} />
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
