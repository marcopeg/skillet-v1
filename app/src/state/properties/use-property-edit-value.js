import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

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

const defaultValues = {
  name: "",
  description: ""
};

const usePropertyEditValue = () => {
  const { propertyId, projectId } = useParams();
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

  const resetValues = (values = {}) =>
    setValues({ ...defaultValues, ...values });

  const setValue = (prop, value) =>
    setValues({
      ...values,
      [prop]: value
    });

  const submitForm = () => {
    updateValue({ variables: { ...values, id: propertyId } }).catch(err => {
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
    propertyId,
    data,
    values,
    setValue,
    submitForm
  };
};

export default usePropertyEditValue;
