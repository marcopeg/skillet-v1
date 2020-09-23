const defaultSettings = {
  baseline: 70,
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
        style: { backgroundColor: "#70c619" },
        label: "I'm a master of it"
      }
    ]
  }
};

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
  const settings = { ...defaultSettings };

  const cellCount = propValues.length * resValues.length;
  const projectTotal = entries.reduce((acc, curr) => acc + curr.value, 0);

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

    // Calculate group's stats
    const entries = map.resGroups[$item.id].entries;
    const cellCount =
      propValues.length * map.resGroups[$item.id].resources.length;
    const projectTotal = entries.reduce((acc, curr) => acc + curr.value, 0);
    map.resGroups[$item.id].efficiency = {
      fill: entries.length / cellCount,
      real: projectTotal / (entries.length * settings.baseline),
      theoric: projectTotal / (cellCount * settings.baseline)
    };
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
      efficiency: {
        fill: entries.length / cellCount,
        real: projectTotal / (entries.length * settings.baseline),
        theoric: projectTotal / (cellCount * settings.baseline)
      }
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
