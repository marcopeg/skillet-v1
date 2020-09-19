/* eslint-disable */

import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const LOCAL_STORAGE_KEY = "user.email";

export const MAGIC_LINK_CREATE = gql`
  mutation($email: String!) {
    magicLinkCreate(email: $email) {
      success
    }
  }
`;

export const SESSION_TOKEN_CREATE = gql`
  mutation($email: String!, $secret: String!) {
    sessionTokenCreate(email: $email, secret: $secret) {
      token
    }
  }
`;

const noop = () => {};

const useLogin = () => {
  const history = useHistory();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [emailWasConfirmed, setEmailWasConfirmed] = useState(false);
  const [secretWasConfirmed, setSecretWasConfirmed] = useState(false);

  const [magicLinkCreate, magicLinkInfo] = useMutation(MAGIC_LINK_CREATE);
  const [sessionTokenCreate, sessionTokenInfo] = useMutation(
    SESSION_TOKEN_CREATE
  );

  const confirmEmail = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, email);
    setEmailWasConfirmed(true);
    magicLinkCreate({ variables: { email } }).catch(noop);
  };

  const confirmSecret = () => {
    setSecretWasConfirmed(true);
    sessionTokenCreate({ variables: { email, secret } }).catch(noop);
  };

  // Retrieve persisted login credentials at boot time
  useEffect(() => {
    const persistedEmail = localStorage.getItem(LOCAL_STORAGE_KEY);
    persistedEmail && setEmail(persistedEmail);
  }, []);

  // Detect login errors
  useEffect(() => {
    const error = magicLinkInfo.error || sessionTokenInfo.error;
    if (error) {
      alert(error.message);
      setSecretWasConfirmed(false);
      setEmailWasConfirmed(false);
      setSecret("");
    }
  }, [magicLinkInfo.error, sessionTokenInfo.error]);

  useEffect(() => {
    if (sessionTokenInfo.data) {
      auth.setToken(sessionTokenInfo.data.sessionTokenCreate.token);
      history.push("/");
    }
  }, [sessionTokenInfo.data]);

  return {
    isLoading: magicLinkInfo.loading || sessionTokenInfo.loading,
    email,
    secret,
    emailWasConfirmed,
    secretWasConfirmed,
    setEmail,
    setSecret,
    confirmEmail,
    confirmSecret
  };
};

export default useLogin;
