import { useState } from "react";
import { useCookies } from "react-cookie";
import { User, UserResponse } from "types/user.types";

import api from "utils/api";

const useAuthentication = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post<UserResponse>("/login", {
        email,
        password,
      });
      setCookie("user", data.token, { path: "/" });
      setUser(data.user);
      setError(null);
    } catch (error: any) {
      setError(error.response.data.message);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setCookie("user", "", { path: "/" });
    setUser(null);
  };

  const isLoggedIn = () => {
    return Boolean(cookies.user);
  };

  return { user, login, logout, isLoggedIn, isLoading, error };
};

export default useAuthentication;
