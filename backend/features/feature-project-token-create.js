/**
 * Validates the existance
 */

const { gql } = require("apollo-server-fastify");

const GET_PROJECT_TITLE = gql`
  query getProjectTitle($projectId: String!) {
    project: projects_by_pk(id: $projectId) {
      title
    }
  }
`;

const handler = async (req, reply) => {
  const res = await req.apollo.query({
    query: GET_PROJECT_TITLE,
    variables: req.body.input
  });

  if (!res.data.project) {
    reply.status(404).send({
      message: "Project Not Found"
    });
    return;
  }

  reply.send({
    accessToken: await req.jwt.sign({
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["project"],
        "x-hasura-default-role": "project",
        "x-hasura-user-id": req.body.input.projectId
      }
    })
  });
};

module.exports = [
  "$FASTIFY_POST",
  ["/project/token/create", handler],
  "projectTokenCreate"
];
