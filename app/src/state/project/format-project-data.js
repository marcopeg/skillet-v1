import { PROJECT_DEFAULTS } from "./project-default-settings";
import { calculateStats } from "./calculate-stats";

// Filtering utilities to remove the "__typename" from the received data
const filterTypename = ["__typename"];
const removeProps = (data = {}, props = []) =>
  Object.keys(data)
    .filter((key) => !props.includes(key))
    .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {});
const removeTypename = ($) => removeProps($, filterTypename);

const mapById = (list) =>
  list.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});

export const formatProjectData = (data) => {
  if (!data) return null;

  // console.log(data);

  const project = removeProps(data.project, filterTypename);
  const propGroups = data.propGroups.map(removeTypename);
  const propValues = data.propValues.map(removeTypename);
  const resGroups = data.resGroups.map(removeTypename);
  const resValues = data.resValues.map(removeTypename);
  const entries = data.entries.map(removeTypename);
  const settings = { ...PROJECT_DEFAULTS };

  const map = {
    propGroups: mapById(propGroups),
    propValues: mapById(propValues),
    resGroups: mapById(resGroups),
    resValues: mapById(resValues)
  };

  // Entries with associated entities
  const decoratedEntries = entries.map(($entry) => {
    const prop = map.propValues[$entry.propId];
    const propGroup = map.propGroups[prop.groupId];
    const res = map.resValues[$entry.resId];
    const resGroup = map.resGroups[res.groupId];

    return {
      ...$entry,
      updatedAt: new Date($entry.updatedAt),
      prop,
      propGroup,
      res,
      resGroup
    };
  });

  // Decorate mapped items with their own filtered entries
  // and associated entities
  resValues.forEach(($item) => {
    map.resValues[$item.id].group = map.resGroups[$item.groupId];
    map.resValues[$item.id].entries = decoratedEntries.filter(
      ($entry) => $entry.resId === $item.id
    );
  });

  resGroups.forEach(($item) => {
    map.resGroups[$item.id].entries = decoratedEntries.filter(
      ($entry) => $entry.resGroup.id === $item.id
    );

    map.resGroups[$item.id].resources = resValues
      .filter(($) => $.groupId === $item.id)
      .map(($) => map.resValues[$.id]);

    // Calculate group's stats
    // map.resGroups[$item.id].stats = calculateStats(
    //   map.resGroups[$item.id].entries,
    //   propValues.length * map.resGroups[$item.id].resources.length,
    //   settings
    // );
  });

  propValues.forEach(($item) => {
    map.propValues[$item.id].group = map.propGroups[$item.groupId];
    map.propValues[$item.id].entries = decoratedEntries.filter(
      ($entry) => $entry.propId === $item.id
    );
  });

  propGroups.forEach(($item) => {
    map.propGroups[$item.id].entries = decoratedEntries.filter(
      ($entry) => $entry.propGroup.id === $item.id
    );

    map.propGroups[$item.id].values = propValues
      .filter(($) => $.groupId === $item.id)
      .map(($) => map.propValues[$.id]);
  });

  // Decorate each resource with the list of skills and filtered entries
  // This also must be divided by groups so to achieve a correct visualization order
  resValues.forEach(($item) => {
    // Group entries by proprGroup to match the visualization order
    $item.propGroups = propGroups.map(($group) => {
      const groupEntries$ = ($) => $.propGroup.id === $group.id;
      const groupEntries = $item.entries.filter(groupEntries$);
      const group = {
        ...map.propGroups[$group.id],
        entries: groupEntries
      };

      // Apply group's values with filtered entries
      group.values = group.values.map(($value) => {
        const valueEntries$ = ($) => $.propId === $value.id;
        return {
          ...$value,
          entries: groupEntries.filter(valueEntries$)
        };
      });

      return group;
    });
  });

  const decoratedData = {
    project: {
      ...project,
      stats: calculateStats(
        decoratedEntries,
        propValues.length * resValues.length,
        settings
      )
    },
    propGroups: propGroups.map(($) => map.propGroups[$.id]),
    propValues: propValues.map(($) => map.propValues[$.id]),
    resGroups: resGroups.map(($) => map.resGroups[$.id]),
    resValues: resValues.map(($) => map.resValues[$.id]),
    entries: decoratedEntries,
    settings
  };

  console.log(decoratedData);
  return decoratedData;
};
