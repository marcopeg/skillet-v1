import React, { useState } from "react"; // eslint-disable-line
import { gql, useMutation } from "@apollo/client";
import useProject from "../project/use-project";

import { LOAD_RESOURCES_LIST } from "./use-resources-list";

const CREATE_PROP_GROUP = gql`
  mutation createResGroup(
    $projectId: String!
    $name: String!
    $description: String!
    $order: Int!
  ) {
    group: insert_res_groups_one(
      object: {
        project_id: $projectId
        name: $name
        description: $description
        order: $order
      }
    ) {
      id
    }
  }
`;

const defaultValues = {
  name: "",
  description: "",
  order: 0
};

const useResourcesCreateGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({ ...defaultValues });
  const { projectId } = useProject();

  const [createPropGroup] = useMutation(CREATE_PROP_GROUP, {
    refetchQueries: [
      {
        query: LOAD_RESOURCES_LIST,
        variables: { projectId }
      }
    ]
  });

  const resetValues = () => setValues({ ...defaultValues });

  const openModal = () => {
    resetValues();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetValues();
  };

  const setValue = (prop, value) =>
    setValues({
      ...values,
      [prop]: value
    });

  const submitForm = () => {
    createPropGroup({ variables: { ...values, projectId } })
      .then((res) => {
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // React.useEffect(() => {
  //   setTimeout(openModal, 250);
  // }, []);

  return {
    isModalOpen,
    values,
    isFormDisabled: values.name.length < 3,
    isFormLoading: false,
    setValue,
    openModal,
    closeModal,
    submitForm
  };
};

export default useResourcesCreateGroup;
