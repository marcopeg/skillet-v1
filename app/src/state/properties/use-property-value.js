/* eslint-disable */

import React, { useState, useEffect } from "react"; // eslint-disable-line
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PROJECT_DEFAULTS } from "../project/project-default-settings";
import { deepmerge } from "../project/deepmerge";
import useBoardByPropertyValueId from "../board/use-board-by-property-value-id";
import { composeUrl } from "../../lib/strings";

export const LOAD_RESOURCE_VALUE_BY_ID = gql`
  query loadPropValueById($id: Int!) {
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

export const usePropertyValue = () => {
  const { projectId, propertyId } = useParams();
  const { board, isLoading, refetch } = useBoardByPropertyValueId(propertyId);

  const [data, setData] = useState(null);
  useEffect(() => {
    board && setData(board.map.prop.values[propertyId]);
  }, [isLoading, board, setData]);

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
    isLoading,
    isReady: data !== null,
    board,
    data,
    values,
    settings,
    refetch
  };
};

export const usePropertyValueOnly = () => {
  const { projectId, propertyId } = useParams();
  const { data: rawData, loading } = useQuery(LOAD_RESOURCE_VALUE_BY_ID, {
    variables: { id: propertyId },
    fetchPolicy: "network-only"
  });

  const [data, setData] = useState(null);
  useEffect(() => {
    board && setData(board.map.prop.values[propertyId]);
  }, [isLoading, board, setData]);

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
    isLoading: loading,
    isReady: !loading && !!data,
    data,
    values,
    settings
  };
};

export default usePropertyValue;
