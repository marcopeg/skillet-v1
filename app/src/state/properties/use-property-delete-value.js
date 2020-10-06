import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";

import usePropertyDetails from "./use-property-details";
import { LOAD_PROPERTIES_LIST } from "./use-properties-list";

const DELETE_VALUE = gql`
  mutation deletePropValue($id: Int!) {
    delete_prop_values_by_pk(id: $id) {
      id
    }
  }
`;

const usePropertyDeleteValue = () => {
  const history = useHistory();
  const { propertyId, projectId } = useParams();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { data } = usePropertyDetails();

  const [deleteValue] = useMutation(DELETE_VALUE, {
    refetchQueries: [
      {
        query: LOAD_PROPERTIES_LIST
      }
    ]
  });

  const openConfirm = () => {
    setIsConfirmOpen(true);
  };

  const closeConfirm = (evt) => {
    setIsConfirmOpen(false);
  };

  const submitDelete = (confirm) => {
    if (confirm.name !== data.name) {
      alert("Wrong name");
      return;
    }
    return deleteValue({ variables: { id: propertyId } })
      .then(() => {
        closeConfirm();
        history.push(`/p/${projectId}/properties`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    isConfirmOpen,
    projectId,
    propertyId,
    closeConfirm,
    openConfirm,
    submitDelete
  };
};

export default usePropertyDeleteValue;
