/* eslint-disable */

import React, { useState, useEffect } from "react"; // eslint-disable-line
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { LOAD_PROPERTIES_LIST } from "./use-properties-list";

const LOAD_VALUE = gql`
  query loadValue($id: Int!) {
    value: prop_values_by_pk(id: $id) {
      name
      description
      order
      tags
    }
  }
`;

const UPDATE_VALUE = gql`
  mutation updatePropValue($id: Int!, $name: String!, $description: String) {
    update_prop_values_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, description: $description }
    ) {
      id
      name
      description
    }
  }
`;

const defaultValues = {
  name: "",
  description: ""
};

const useResourcesEditValue = () => {
  const { propertyId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({ ...defaultValues });

  const [loadValue, { data, loading: isDataLoading }] = useLazyQuery(
    LOAD_VALUE,
    {
      variables: { id: propertyId },
      fetchPolicy: "network-only"
    }
  );

  const [updateValue] = useMutation(UPDATE_VALUE, {
    refetchQueries: [
      {
        query: LOAD_PROPERTIES_LIST
      }
    ]
  });

  const resetValues = (values = {}) =>
    setValues({ ...defaultValues, ...values });

  const openModal = (resGroupId) => {
    resetValues(resGroupId);
    setIsModalOpen(true);
    loadValue();
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
    updateValue({ variables: { ...values, id: propertyId } })
      .then(() => {
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (data) {
      resetValues({
        name: data.value.name,
        description: data.value.description
      });
    }
  }, [data]);

  React.useEffect(() => {
    setTimeout(openModal, 250);
  }, []);

  return {
    isModalOpen,
    isDataLoading,
    values,
    isFormDisabled: values.name.length < 3,
    isFormLoading: false,
    setValue,
    openModal,
    closeModal,
    submitForm
  };
};

export default useResourcesEditValue;
