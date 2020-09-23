import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { LOAD_PROJECTS_LIST } from "./use-projects-list";

const CREATE_PROJECT = gql`
  mutation createProject($title: String!, $description: String) {
    project: insert_projects_one(
      object: { title: $title, description: $description }
    ) {
      id
    }
  }
`;

const useProjectCreate = () => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [createProject, { loading }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [
      {
        query: LOAD_PROJECTS_LIST
      }
    ]
  });

  const resetValues = () => {
    setTitle("");
    setDescription("");
  };

  const openModal = () => {
    resetValues();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetValues();
  };

  const submitForm = () => {
    createProject({ variables: { title, description } })
      .then((res) => {
        closeModal();
        history.push(`/p/${res.data.project.id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    isModalOpen,
    isFormValid: title.length > 3,
    isFormLoading: loading,
    title,
    setTitle,
    description,
    setDescription,
    openModal,
    closeModal,
    submitForm
  };
};

export default useProjectCreate;
