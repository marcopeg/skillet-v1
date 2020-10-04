import React, { useState } from "react"; // eslint-disable-line
import { gql, useMutation } from "@apollo/client";

import { LOAD_PROPERTIES_LIST } from "./use-properties-list";

const CREATE_PROP_GROUP = gql`
  mutation createPropGroup(
    $name: String!
    $description: String!
    $order: Int!
  ) {
    group: insert_prop_groups_one(
      object: { name: $name, description: $description, order: $order }
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

const usePropertiesCreateGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({ ...defaultValues });

  const [createPropGroup] = useMutation(CREATE_PROP_GROUP, {
    refetchQueries: [
      {
        query: LOAD_PROPERTIES_LIST
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
    createPropGroup({ variables: values })
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
