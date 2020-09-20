/**
 * The current implementation does NOT include support for authenticated Subscriptions as
 * I'm still looking for a decent way to get it up and running with Authorization.
 */

import React from "react";

import {
  ApolloClient,
  ApolloProvider as ApolloProviderOriginal,
  InMemoryCache,
  split,
  HttpLink
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

import useAuth from "./use-auth";
export { useQuery, useMutation, useSubscription, gql } from "@apollo/client";

// Uses build time variables to connect to the backend
const httpBaseUrl = process.env.REACT_APP_HASURA_URL || "/v1/graphql";
const wsBaseUrl = process.env.REACT_APP_HASURA_WS
  ? process.env.REACT_APP_HASURA_WS
  : httpBaseUrl.replace("https://", "wss://").replace("http://", "ws://");

export const ApolloProvider = ({ children }) => {
  const { token } = useAuth();
  console.log("@@token", token);
  const headers =
    token && typeof token === "object"
      ? token
      : token
      ? { authorization: `Bearer ${token}` }
      : {};

  const httpLink = new HttpLink({
    uri: httpBaseUrl,
    headers
  });

  // Does not work in the authenticated area:
  // https://github.com/apollographql/apollo-client/issues/3967
  const wsLink = new WebSocketLink({
    uri: wsBaseUrl,
    options: {
      lazy: true,
      reconnect: true
      //   connectionParams: { headers }
    }
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  // console.log("@Apollo", httpBaseUrl, headers);
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore"
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all"
      }
    }
  });

  return <ApolloProviderOriginal client={client} children={children} />;
};
