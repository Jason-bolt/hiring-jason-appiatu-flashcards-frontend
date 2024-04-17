import secureLocalStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";
// import { IUserData } from "../types";

class AuthHelper {
  static saveToLocalStorage<T>(key: string, value: T): void {
    secureLocalStorage.setItem(key, JSON.stringify(value));
  }

  static fetchFromLocalStorage(
    key: string
  ): string | number | boolean | object | null {
    return JSON.parse(secureLocalStorage.getItem(key) as string);
  }

  static logUserOut(): void {
    return secureLocalStorage.clear();
  }

  static getAuthUser<IUserData>(token: string = "."): IUserData | null {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  static isUserLoggedIn(): boolean {
    const userData: string = AuthHelper.fetchFromLocalStorage(
      "authToken"
    ) as string;
    const isUserLoggedIn = !!userData;

    return isUserLoggedIn;
  }

  static clearLocalStorage(): void {
    secureLocalStorage.clear();
  }
}

export default AuthHelper;
