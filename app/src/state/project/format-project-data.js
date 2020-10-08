/* eslint-disable */

import { PROJECT_DEFAULTS } from "./project-default-settings";
import { calculateStats, normalizeScore } from "./calculate-stats";
import { deepmerge } from "./deepmerge";

// Filtering utilities to remove the "__typename" from the received data
const filterTypename = ["__typename"];
const removeProps = (data = {}, props = []) =>
  Object.keys(data)
    .filter((key) => !props.includes(key))
    .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {});
const removeTypename = ($) => removeProps($, filterTypename);

const mapById = (list) =>
  list.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});

const mapEntry = (list) =>
  list.reduce(
    (acc, curr) => ({ ...acc, [`${curr.propId}:${curr.resId}`]: curr }),
    {}
  );

export const getObsolescenceValue = (
  updatedAt,
  settings,
  refDate = new Date() // used in unit test
) => {
  const elapsed = refDate - updatedAt;
  const item = settings.efficiency.obsolescence.find(
    ($) => elapsed >= $.elapsed
  );

  return item ? item.value : 0;
};

const decorateEntry = (prop, res, entry, settings) => {
  const updatedAt = entry ? new Date(entry.updatedAt) : null;

  return entry
    ? {
        ...entry,
        updatedAt,
        score: normalizeScore(
          entry.value - getObsolescenceValue(updatedAt, settings)
        )
      }
    : {
        propId: prop.id,
        resId: res.id,
        updatedAt,
        value: null,
        score: normalizeScore(settings.efficiency.voidValue)
      };
};

export const formatProjectData = (data) => {
  if (!data) return null;

  const raw = {
    project: {
      ...removeProps(data.projects[0], filterTypename),
      settings: deepmerge(PROJECT_DEFAULTS, data.projects[0].settings || {}),
      stats: null
    },
    prop: {
      groups: data.propGroups.map(removeTypename),
      values: data.propValues.map(removeTypename)
    },
    res: {
      groups: data.resGroups.map(removeTypename),
      values: data.resValues.map(removeTypename)
    },
    entries: null
  };

  const map = {
    prop: {
      groups: mapById(raw.prop.groups),
      values: mapById(raw.prop.values)
    },
    res: {
      groups: mapById(raw.res.groups),
      values: mapById(raw.res.values)
    },
    entries: mapEntry(data.entries.map(removeTypename))
  };

  // Apply settings project -> propGroup
  raw.prop.groups.forEach((propGroup) => {
    const $propGroup = map.prop.groups[propGroup.id];

    $propGroup.settings = deepmerge(
      raw.project.settings,
      $propGroup.settings || {}
    );

    $propGroup.values = raw.prop.values.filter(
      ($) => $.groupId === propGroup.id
    );
  });

  // Apply settings propGroup -> propValues
  raw.prop.values.forEach((propValue) => {
    map.prop.values[propValue.id].settings = deepmerge(
      map.prop.groups[propValue.groupId].settings,
      map.prop.values[propValue.id].settings || {}
    );
  });

  // ENTRIES
  // Calculates all the cells with the values and applied scores
  raw.prop.values.forEach((prop) =>
    raw.res.values.forEach((res) => {
      const entryId = `${prop.id}:${res.id}`;
      map.entries[entryId] = decorateEntry(
        prop,
        res,
        map.entries[entryId],
        map.prop.values[prop.id].settings
      );
    })
  );

  // Get all the entries in a list format so we can decorate other entities
  raw.entries = Object.values(map.entries);

  // Distribute entries to propGroups/propValues
  raw.prop.groups.forEach((propGroup) => {
    const values$ = ($) => $.groupId === propGroup.id;
    propGroup.values = raw.prop.values.filter(values$);

    propGroup.entries = propGroup.values.reduce((acc, propValue) => {
      const entries$ = (entry) => entry.propId === propValue.id;
      propValue.entries = raw.entries.filter(entries$);
      propValue.stats = calculateStats(propValue.entries);
      return [...acc, ...propValue.entries];
    }, []);

    propGroup.stats = calculateStats(propGroup.entries);
  });

  // Distribute entries to resGroups/resValues
  raw.res.groups.forEach((resGroup) => {
    const values$ = ($) => $.groupId === resGroup.id;
    resGroup.values = raw.res.values.filter(values$);

    resGroup.entries = resGroup.values.reduce((acc, resValue) => {
      const entries$ = (entry) => entry.resId === resValue.id;
      resValue.entries = raw.entries.filter(entries$);
      resValue.stats = calculateStats(resValue.entries);
      return [...acc, ...resValue.entries];
    }, []);

    resGroup.stats = calculateStats(resGroup.entries);
  });

  raw.project.stats = calculateStats(raw.entries);

  const decoratedData = {
    ...raw,
    map
  };

  // console.log(decoratedData);
  return decoratedData;
};
