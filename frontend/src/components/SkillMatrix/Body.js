import React, { useMemo } from "react";
import BodyGroup from "./BodyGroup";

const Body = ({ data }) => {
  const groups = useMemo(
    () =>
      data.resGroups.map(($group) => {
        // Filter group resources
        const filterGroupResources = ($) => $.groupId === $group.id;
        const groupResources = data.resValues.filter(filterGroupResources);
        const groupResourcesIds = groupResources.map(($) => $.id);
        const groupEntries = data.entries.filter(($) =>
          groupResourcesIds.includes($.propId)
        );

        // Decorate resources data
        const resources = groupResources.map(($resource) => {
          const filterResourceEntries = ($) => $.resId === $resource.id;
          const resourceEntries = groupEntries.filter(filterResourceEntries);

          // Spread entries across the propGroups
          const groups = data.propGroups.map(($group) => {
            const filterGroupSkills = ($) => $.groupId === $group.id;
            const groupSkills = data.propValues.filter(filterGroupSkills);
            const groupSkillsIds = groupSkills.map(($) => $.id);
            const filterGroupEntries = ($) => groupSkillsIds.includes($.propId);
            const groupEntries = resourceEntries.filter(filterGroupEntries);

            // Decorate each skill with the filtered entries
            const skills = groupSkills.map(($skill) => {
              const filterSkillEntries = ($) => $.propId === $skill.id;
              const entries = groupEntries.filter(filterSkillEntries);
              return {
                ...$skill,
                entries
              };
            });

            return {
              ...$group,
              skills,
              entries: groupEntries
            };
          });

          return {
            ...$resource,
            groups,
            entries: resourceEntries
          };
        });

        return {
          ...$group,
          resources,
          entries: groupEntries
        };
      }),
    [data]
  );

  return (
    <tbody>
      {groups.map(($group) => (
        <BodyGroup key={`skm-body-group-${$group.id}`} group={$group} />
      ))}
    </tbody>
  );
};

export default Body;
