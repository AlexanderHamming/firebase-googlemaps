import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("You are trying to use useAuth outside of the AuthContextProvider, don't be a plebb")
  }

  return authContext;
};

export default useAuth;