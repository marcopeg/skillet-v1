/* eslint-disable */

import React from "react"; // eslint-disable-line
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

export const LOAD_RESOURCE_DETAILS = gql`
  query loadResValue($id: Int!) {
    value: res_values_by_pk(id: $id) {
      name
      description
      order
      tags
      group: res_group {
        id
        name
      }
    }
  }
`;

const useResourceDetails = () => {
  const { resourceId, projectId } = useParams();

  const { data, loading: isDataLoading } = useQuery(LOAD_RESOURCE_DETAILS, {
    variables: { id: resourceId },
    fetchPolicy: "network-only"
  });

  return {
    projectId,
    resourceId,
    data: data ? data.value : null,
    isDataLoading
  };
};

export default useResourceDetails;
