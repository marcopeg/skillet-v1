import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

import { composeUrl } from "../../lib/strings";

import { LOAD_PROPERTIES_LIST } from "./use-properties-list";
import usePropertyDetails, {
  LOAD_PROPERTY_DETAILS
} from "./use-property-details";

const UPDATE_VALUE = gql`
  mutation updatePropValue(
    $id: Int!
    $name: String!
    $description: String!
    $data: jsonb!
  ) {
    update_prop_values_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, description: $description }
      _append: { data: $data }
    ) {
      id
      name
      description
    }
  }
`;

const defaultValues = {
  name: "",
  description: "",
  url_docs: ""
};

const usePropertyEditValue = () => {
  const { propertyId, projectId } = useParams();
  const [values, setValues] = useState({ ...defaultValues });

  const { data, settings, isDataLoading } = usePropertyDetails();

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

  const hints = {
    url_docs: composeUrl(settings.prop.value.url_docs, values.url_docs)
  };

  const resetValues = (values = {}) =>
    setValues({ ...defaultValues, ...values });

  const setValue = (prop, value) =>
    setValues({
      ...values,
      [prop]: value
    });

  const submitForm = () => {
    const { url_docs, ...otherValues } = values;
    const variables = {
      ...otherValues,
      data: { url_docs },
      id: propertyId
    };
    updateValue({ variables }).catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    if (data) {
      resetValues({
        name: data.name,
        description: data.description,
        url_docs: data.url_docs
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
    hints,
    values,
    setValue,
    submitForm
  };
};

export default usePropertyEditValue;
