import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw Error("error");
  return context;
};

export default useAuth;
