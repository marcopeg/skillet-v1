/* eslint-disable */

import React, { useState, useEffect } from "react"; // eslint-disable-line
import { gql, useMutation } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";

import { LOAD_PROPERTIES_LIST } from "./use-properties-list";
import usePropertyDetails, {
  LOAD_PROPERTY_DETAILS
} from "./use-property-details";

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

const DELETE_VALUE = gql`
  mutation deletePropValue($id: Int!) {
    delete_prop_values_by_pk(id: $id) {
      id
    }
  }
`;

const defaultValues = {
  name: "",
  description: ""
};

const usePropertyEditValue = () => {
  const history = useHistory();
  const { propertyId, projectId } = useParams();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [values, setValues] = useState({ ...defaultValues });

  const { data, isDataLoading } = usePropertyDetails();

  const [updateValue] = useMutation(UPDATE_VALUE, {
    refetchQueries: [
      {
        query: LOAD_PROPERTIES_LIST
      },
      {
        query: LOAD_PROPERTY_DETAILS,
        variables: { id: propertyId }
      }
    ]
  });

  const [deleteValue] = useMutation(DELETE_VALUE, {
    refetchQueries: [
      {
        query: LOAD_PROPERTIES_LIST
      }
    ]
  });

  const resetValues = (values = {}) =>
    setValues({ ...defaultValues, ...values });

  const openConfirm = () => {
    setIsConfirmOpen(true);
  };

  const closeConfirm = (evt) => {
    setIsConfirmOpen(false);
  };

  const setValue = (prop, value) =>
    setValues({
      ...values,
      [prop]: value
    });

  const submitForm = () => {
    updateValue({ variables: { ...values, id: propertyId } }).catch((err) => {
      console.error(err);
    });
  };

  const submitDelete = (confirm) => {
    if (confirm.name !== data.name) {
      alert("Wrong name");
      return;
    }
    deleteValue({ variables: { id: propertyId } })
      .then(() => {
        closeConfirm();
        history.push(`/p/${projectId}/properties`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (data) {
      resetValues({
        name: data.name,
        description: data.description
      });
    }
  }, [data]);

  return {
    isDataLoading,
    isConfirmOpen,
    isFormDisabled: values.name.length < 3,
    isFormLoading: false,
    projectId,
    propertyId,
    data,
    values,
    setValue,
    closeConfirm,
    openConfirm,
    closeConfirm,
    submitForm,
    submitDelete
  };
};

export default usePropertyEditValue;
