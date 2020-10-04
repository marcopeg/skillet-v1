/**
 * This is a super small webhook microservice.
 * It offers a simple REST interface that can receive a payload.
 *
 * It does one simple action:
 * it uses GraphQL to communicate back to Hasura.
 *
 * This example uses services composition from the @ForrestJS project:
 * https://forrestjs.github.io/
 */

const process = require("process");
const { runHookApp } = require("@forrestjs/hooks");
const serviceApollo = require("@forrestjs/service-apollo");
const serviceFastify = require("@forrestjs/service-fastify");
const serviceFastifyHealthz = require("@forrestjs/service-fastify-healthz");
const serviceFastifyApollo = require("@forrestjs/service-fastify-apollo");
const serviceFastifyJwt = require("@forrestjs/service-fastify-jwt");
const envalid = require("envalid");
const jwt = require("jsonwebtoken");

const featureProjectCacheUpdate = require("./features/feature-project-cache-update");
const featureProjectTokenCreate = require("./features/feature-project-token-create");

// Validate Environment:
const env = envalid.cleanEnv(process.env, {
  HASURA_ENDPOINT: envalid.url(),
  HASURA_JWT_SECRET: envalid.json()
});

// Hasura backend token to control what kind of changes can be
// performed by this backend into the Hasura API.
const HASURA_TOKEN_PAYLOAD = {
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["backend"],
    "x-hasura-default-role": "backend"
  }
};

// Setup the App's capabilities as composition of services:
runHookApp({
  trace: "compact",
  settings: async ({ setConfig }) => {
    // Calculate Hasura's token
    // TODO: this token should contain a short IAT and should be refreshed
    //       in background. Apollo client should use the HttpLink library
    //       so that it is possible to change the token every few seconds
    //       and therefore improve security in case it gets stolen along the way.
    const HASURA_TOKEN_SIGNED = await jwt.sign(
      HASURA_TOKEN_PAYLOAD,
      env.HASURA_JWT_SECRET.key,
      {
        algorithm: env.HASURA_JWT_SECRET.type,
        expiresIn: "100y"
      }
    );

    setConfig("fastify.jwt", {
      secret: env.HASURA_JWT_SECRET.key,
      sign: {
        algorithm: env.HASURA_JWT_SECRET.type,
        expiresIn: "90d"
      }
    });

    setConfig("apollo.client.config", {
      uri: `${env.HASURA_ENDPOINT}/v1/graphql`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HASURA_TOKEN_SIGNED}`
      }
    });
  },
  services: [
    serviceApollo,
    serviceFastify,
    serviceFastifyHealthz,
    serviceFastifyJwt,
    serviceFastifyApollo
  ],
  features: [featureProjectCacheUpdate, featureProjectTokenCreate]
});

// Let Docker exit on Ctrl+C
process.on("SIGINT", function () {
  process.exit();
});
process.on("SIGTERM", function () {
  process.exit();
});
