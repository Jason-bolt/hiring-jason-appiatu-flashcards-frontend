import react, { createContext, useState } from "react";
import AuthHelper from "../utils/helpers/auth.helper";
import { IUserData } from "../utils/types";

const {
  saveToLocalStorage,
  fetchFromLocalStorage,
  getAuthUser,
  clearLocalStorage,
} = AuthHelper;

type AuthContextType = {
  token: string;
  isLoggedIn: () => boolean;
  persistUserToken: (userToken: string) => void;
  userData: IUserData | null;
  isTokenExpired: () => boolean;
  logoutUser: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = (props: { children: react.JSX.Element }) => {
  const [token, setToken] = useState(
    fetchFromLocalStorage("userToken") as string
  );
  const [userData, setUserData] = useState(
    getAuthUser(fetchFromLocalStorage("userToken") as string ?? "") as IUserData | null
  );

  const persistUserToken = (userToken: string) => {
    saveToLocalStorage("userToken", userToken);
    setUserData(getAuthUser(fetchFromLocalStorage("userToken") as string));
    setToken(userToken);
  };

  const logoutUser = () => {
    clearLocalStorage();
    setToken("");
  };

  const isLoggedIn = () => {
    return !!token;
  };

  const isTokenExpired = (): boolean => {
    const currentTime: number = Date.now();
    return currentTime > (userData?.exp as number);
  };

  const authContextValue = {
    token,
    isLoggedIn,
    persistUserToken,
    userData,
    isTokenExpired,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
