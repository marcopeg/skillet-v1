/* eslint-disable */

import React from "react"; // eslint-disable-line
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PROJECT_DEFAULTS } from "../project/project-default-settings";
import { deepmerge } from "../project/deepmerge";

export const LOAD_PROPERTY_DETAILS = gql`
  query loadPropValue($id: Int!) {
    value: prop_values_by_pk(id: $id) {
      name
      description
      url_docs: data(path: "url_docs")
      order
      tags
      settings
      group: prop_group {
        id
        name
        settings
      }
      project {
        settings
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
    settings: data
      ? deepmerge(
          PROJECT_DEFAULTS,
          data.value.project.settings,
          data.value.group.settings,
          data.value.settings
        )
      : PROJECT_DEFAULTS,
    isDataLoading
  };
};

export default usePropertyDetails;
