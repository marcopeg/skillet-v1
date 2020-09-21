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

  const project = removeProps(data.project, filterTypename);
  const lastUpdate = removeProps(data.lastUpdate, filterTypename);
  const propGroups = data.propGroups.map(removeTypename);
  const propValues = data.propValues.map(removeTypename);
  const resGroups = data.resGroups.map(removeTypename);
  const resValues = data.resValues.map(removeTypename);
  const entries = data.entries.map(removeTypename);

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
  resValues.forEach(($item) => {
    $item.props = propValues.map(($value) => {
      return {
        ...$value,
        entries: $item.entries.filter(($) => $.propId === $value.id)
      };
    });
  });

  const decoratedData = {
    project,
    lastUpdate,
    propGroups: propGroups.map(($) => map.propGroups[$.id]),
    propValues: propValues.map(($) => map.propValues[$.id]),
    resGroups: resGroups.map(($) => map.resGroups[$.id]),
    resValues: resValues.map(($) => map.resValues[$.id]),
    entries: decoratedEntries
  };

  // console.log(decoratedData);
  return decoratedData;
};
