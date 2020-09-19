import { useHistory } from "react-router-dom";
import useAuth from "../hooks/use-auth";

const useLogout = () => {
  const history = useHistory();
  const auth = useAuth();

  const logout = () => {
    auth.logout();
    history.push("/");
  };

  return {
    logout
  };
};

export default useLogout;
