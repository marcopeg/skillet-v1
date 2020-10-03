/* eslint-disable */

import React from "react"; // eslint-disable-line
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

export const LOAD_PROPERTY_DETAILS = gql`
  query loadValue($id: Int!) {
    value: prop_values_by_pk(id: $id) {
      name
      description
      order
      tags
      group: prop_group {
        id
        name
      }
    }
  }
`;

const usePropertyDetails = () => {
  const { propertyId, projectId } = useParams();

  const { data, loading: isDataLoading } = useQuery(LOAD_PROPERTY_DETAILS, {
    variables: { id: propertyId },
    fetchPolicy: "network-only"
  });

  return {
    projectId,
    propertyId,
    data: data ? data.value : null,
    isDataLoading
  };
};

export default usePropertyDetails;
