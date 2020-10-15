/**
 * Loads a Project's full data set and keeps it in sync
 * with the server when changes happen in the current client or others.
 *
 * It keeps a subscription to a complex query and in the future we will
 * likely need to simplify this query to reduce load on Postgres.
 */

import React, { useContext, createContext, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import useAuth from "../../hooks/use-auth";

export const CREATE_PROJECT_TOKEN = gql`
  mutation createProjectToken($projectId: String!) {
    project: createProjectToken(projectId: $projectId) {
      accessToken
    }
  }
`;

const ProjectContext = createContext();

export const ProjectProvider = ({ projectId, children }) => {
  const { token, setToken } = useAuth();

  const [createProjectToken] = useMutation(CREATE_PROJECT_TOKEN, {
    variables: { projectId }
  });

  const value = {
    projectId,
    isReady: !!token
  };

  // Generate the project's token to scope the data access
  useEffect(() => {
    createProjectToken()
      .then(res => {
        setToken(res.data.project.accessToken);
      })
      .catch(err => {
        console.error("Could not generate the project token");
        console.error(err.message);
      });

    return () => setToken(null);
  }, [createProjectToken, setToken]);

  const renderEl = token ? children : "Loading project...";
  return <ProjectContext.Provider value={value} children={renderEl} />;
};

export const useProject = () => useContext(ProjectContext);
export default useProject;
