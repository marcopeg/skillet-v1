import React, { useState } from "react"; // eslint-disable-line
import { gql, useMutation } from "@apollo/client";
import useProjectCache, {
  LOAD_PROJECT_BY_ID
} from "../project/use-project-cache";

import { LOAD_PROPERTIES_LIST } from "./use-properties-list";

const CREATE_PROP_GROUP = gql`
  mutation createPropGroup(
    $projectId: String!
    $name: String!
    $description: String!
    $order: Int!
  ) {
    group: insert_prop_groups_one(
      object: {
        project_id: $projectId
        name: $name
        description: $description
        order: $order
      }
    ) {
      id
    }
  }
`;

const defaultValues = {
  name: "",
  description: "",
  order: 0
};

const usePropertiesCreateGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({ ...defaultValues });
  const { projectId } = useProjectCache();

  const [createPropGroup] = useMutation(CREATE_PROP_GROUP, {
    refetchQueries: [
      {
        query: LOAD_PROJECT_BY_ID,
        variables: { projectId }
      },
      {
        query: LOAD_PROPERTIES_LIST,
        variables: { projectId }
      }
    ]
  });

  const resetValues = () => setValues({ ...defaultValues });

  const openModal = () => {
    resetValues();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetValues();
  };

  const setValue = (prop, value) =>
    setValues({
      ...values,
      [prop]: value
    });

  const submitForm = () => {
    createPropGroup({ variables: { ...values, projectId } })
      .then((res) => {
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // React.useEffect(() => {
  //   setTimeout(openModal, 250);
  // }, []);

  return {
    isModalOpen,
    values,
    isFormDisabled: values.name.length < 3,
    isFormLoading: false,
    setValue,
    openModal,
    closeModal,
    submitForm
  };
};

export default usePropertiesCreateGroup;
