import React, { useState } from "react"; // eslint-disable-line
import { gql, useMutation } from "@apollo/client";
import useProject from "../project/use-project";

import { LOAD_PROPERTIES_LIST } from "./use-properties-list";

const CREATE_PROP_VALUE = gql`
  mutation createPropValue(
    $projectId: String!
    $propGroupId: Int!
    $name: String!
    $description: String!
    $order: Int!
  ) {
    value: insert_prop_values_one(
      object: {
        project_id: $projectId
        prop_group_id: $propGroupId
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
  propGroupId: null,
  name: "",
  description: "",
  order: 0
};

const usePropertiesCreateGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({ ...defaultValues });
  const { projectId } = useProject();

  const [createPropGroup] = useMutation(CREATE_PROP_VALUE, {
    refetchQueries: [
      {
        query: LOAD_PROPERTIES_LIST,
        variables: { projectId }
      }
    ]
  });

  const resetValues = (propGroupId = null) =>
    setValues({ ...defaultValues, propGroupId });

  const openModal = (propGroupId) => {
    resetValues(propGroupId);
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

export default usePropertiesCreateGroup;
