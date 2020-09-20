import React, { useState } from "react"; // eslint-disable-line
import { gql, useMutation } from "@apollo/client";
import useProjectCache from "../project/use-project-cache";

import { LOAD_RESOURCES_LIST } from "./use-resources-list";

const CREATE_RES_VALUE = gql`
  mutation createResValue(
    $projectId: String!
    $resGroupId: Int!
    $name: String!
    $description: String!
    $order: Int!
  ) {
    value: insert_res_values_one(
      object: {
        project_id: $projectId
        res_group_id: $resGroupId
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
  resGroupId: null,
  name: "",
  description: "",
  order: 0
};

const useResourcesCreateGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({ ...defaultValues });
  const { projectId } = useProjectCache();

  const [createPropGroup] = useMutation(CREATE_RES_VALUE, {
    refetchQueries: [
      {
        query: LOAD_RESOURCES_LIST,
        variables: { projectId }
      }
    ]
  });

  const resetValues = (resGroupId = null) =>
    setValues({ ...defaultValues, resGroupId });

  const openModal = (resGroupId) => {
    resetValues(resGroupId);
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
