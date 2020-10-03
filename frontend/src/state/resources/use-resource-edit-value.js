/* eslint-disable */

import React, { useState, useEffect } from "react"; // eslint-disable-line
import { gql, useMutation } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";

import { LOAD_RESOURCES_LIST } from "./use-resources-list";
import useResourceDetails, {
  LOAD_RESOURCE_DETAILS
} from "./use-resource-details";

const UPDATE_VALUE = gql`
  mutation updateResValue($id: Int!, $name: String!, $description: String) {
    update_res_values_by_pk(
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
  mutation deleteResValue($id: Int!) {
    delete_res_values_by_pk(id: $id) {
      id
    }
  }
`;

const defaultValues = {
  name: "",
  description: ""
};

const useResourceEditValue = () => {
  const history = useHistory();
  const { resourceId, projectId } = useParams();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [values, setValues] = useState({ ...defaultValues });

  const { data, isDataLoading } = useResourceDetails();

  const [updateValue] = useMutation(UPDATE_VALUE, {
    refetchQueries: [
      {
        query: LOAD_RESOURCES_LIST
      },
      {
        query: LOAD_RESOURCE_DETAILS,
        variables: { id: resourceId }
      }
    ]
  });

  const [deleteValue] = useMutation(DELETE_VALUE, {
    refetchQueries: [
      {
        query: LOAD_RESOURCES_LIST
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
    updateValue({ variables: { ...values, id: resourceId } }).catch((err) => {
      console.error(err);
    });
  };

  const submitDelete = (confirm) => {
    if (confirm.name !== data.name) {
      alert("Wrong name");
      return;
    }
    deleteValue({ variables: { id: resourceId } })
      .then(() => {
        closeConfirm();
        history.push(`/p/${projectId}/resources`);
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
    resourceId,
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

export default useResourceEditValue;
