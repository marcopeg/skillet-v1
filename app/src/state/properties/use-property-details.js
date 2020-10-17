/* eslint-disable */

import React from "react"; // eslint-disable-line
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PROJECT_DEFAULTS } from "../project/project-default-settings";
import { deepmerge } from "../project/deepmerge";
import { composeUrl } from "../../lib/strings";

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

  const { data: rawData, loading: isDataLoading } = useQuery(
    LOAD_PROPERTY_DETAILS,
    {
      variables: { id: propertyId },
      fetchPolicy: "network-only"
    }
  );

  const data = rawData ? rawData.value : null;

  const settings = data
    ? deepmerge(
        PROJECT_DEFAULTS,
        data.project.settings,
        data.group.settings,
        data.settings
      )
    : PROJECT_DEFAULTS;

  const values = data
    ? {
        name: data.name,
        description: data.description,
        url_docs: data.url_docs
          ? composeUrl(settings.prop.value.url_docs, data.url_docs)
          : null
      }
    : null;

  return {
    projectId,
    propertyId,
    data,
    values,
    settings,
    isDataLoading
  };
};

export default usePropertyDetails;
