import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

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

const defaultValues = {
  name: "",
  description: ""
};

const useResourceEditValue = () => {
  const { resourceId, projectId } = useParams();
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

  const resetValues = (values = {}) =>
    setValues({ ...defaultValues, ...values });

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
    isFormDisabled: values.name.length < 3,
    isFormLoading: false,
    projectId,
    resourceId,
    data,
    values,
    setValue,
    submitForm
  };
};

export default useResourceEditValue;
