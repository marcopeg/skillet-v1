/* eslint-disable */

import React, { useState, useEffect } from "react"; // eslint-disable-line
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import useBoardByResourceValueId from "../board/use-board-by-resource-value-id";

export const LOAD_RESOURCE_VALUE_BY_ID = gql`
  query loadResourceValueByUd($id: Int!) {
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

export const useResourceValue = () => {
  const { projectId, resourceId } = useParams();
  const { board, isLoading, refetch } = useBoardByResourceValueId(resourceId);

  const [data, setData] = useState(null);
  useEffect(() => {
    board && setData(board.map.res.values[resourceId]);
  }, [isLoading, board, setData]);

  return {
    projectId,
    resourceId,
    isLoading,
    isReady: data !== null,
    board,
    data,
    refetch
  };
};

export const useResourceValueOnly = () => {
  const { projectId, resourceId } = useParams();
  const { data, loading } = useQuery(LOAD_RESOURCE_VALUE_BY_ID, {
    variables: { id: resourceId },
    fetchPolicy: "network-only"
  });

  return {
    projectId,
    resourceId,
    isLoading: loading,
    isReady: !loading && !!data,
    data: data ? data.value : null
  };
};

export default useResourceValue;
