/**
 * Hasura's Webhook
 * Computes a project's cache objects and store it in the cache table.
 *
 * TODO: the entire caching logic may be accomplisced at SQL level
 *       with a stored procedure, saving multiple roundtrips that are
 *       required by the webook. Such prodecure could be applied as
 *       trigger to the raw data tables.
 *
 * NOTE: We may do not even need to cache anything as we subscribe only
 *       to the "updated_at" field.
 */

const { gql } = require("apollo-server-fastify");

const getProjectByIdQuery = gql`
  query getProjectById($projectId: String!) {
    project: projects_by_pk(id: $projectId) {
      id
      title
      updated_at
      prop_groups(order_by: { order: desc, id: asc }) {
        id
        name
        description
        order
        prop_values(order_by: { order: desc, id: asc }) {
          id
          name
          description
          order
          tags
        }
      }
      prop_values(order_by: { order: desc, id: asc }) {
        id
        prop_group_id
        name
        description
        order
        tags
      }
      res_groups(order_by: { order: desc, id: asc }) {
        id
        name
        description
        order
        res_values(order_by: { order: desc, id: asc }) {
          id
          name
          description
          order
          tags
          entries {
            prop_value_id
            res_value_id
            updated_at
            description
            value
          }
        }
      }
      lastUpdate: entries(
        limit: 1
        order_by: { updated_at: desc }
        where: { project_id: { _eq: $projectId } }
      ) {
        updated_at
      }
    }
  }
`;

const upsertProjectCacheMutation = gql`
  mutation upsertProjectCache($projectId: String!, $data: jsonb) {
    insert_projects_cache(
      objects: { data: $data, project_id: $projectId }
      on_conflict: { constraint: projects_cache_pkey, update_columns: data }
    ) {
      affected_rows
    }
  }
`;

const getEventData = (data) => (data.new ? data.new : data.old);

const getProjectId = (tableName, data) => {
  if (tableName === "projects") return data.id;
  return data.project_id;
};

const buildProjectCache = async (apollo, projectId) => {
  try {
    const res = await apollo.query({
      query: getProjectByIdQuery,
      variables: { projectId },
      fetchPolicy: "network-only"
    });

    return res.data.project;
  } catch (err) {
    throw new Error(
      `Failed build project cache [${projectId}]: ${err.message}`
    );
  }
};

const upsertProjectCache = async (apollo, projectId) => {
  try {
    const res = await apollo.mutate({
      mutation: upsertProjectCacheMutation,
      variables: { projectId, data: await buildProjectCache(apollo, projectId) }
    });

    if (res.data.insert_projects_cache.affected_rows !== 1) {
      throw new Error('Unexpected return of "affected_rows"');
    }
  } catch (err) {
    throw new Error(
      `Failed upsert project cache [${projectId}]: ${err.message}`
    );
  }
};

const handler = async (req) => {
  // Cache is dropped automatically by cascade constraints
  // when it comes to delete an entire project
  if (req.body.event.op === "DELETE" && req.body.table.name === "projects")
    return "+ok";

  // Retrieve projectId and run the cache update procedure
  // const eventData = getEventData(req.body.event.data);
  // const projectId = getProjectId(req.body.table.name, eventData);
  // await upsertProjectCache(req.apollo, projectId);

  return `+ok - ${projectId}`;
};

module.exports = [
  "$FASTIFY_POST",
  ["/project/cache/update", handler],
  "projectUpdateCache"
];
