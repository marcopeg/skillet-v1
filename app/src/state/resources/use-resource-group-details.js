/* eslint-disable */

import { useParams } from "react-router-dom";

const useResourceGroupDetails = () => {
  const { projectId } = useParams();

  return {
    isLoading: false,
    projectId
  };
};

export default useResourceGroupDetails;
