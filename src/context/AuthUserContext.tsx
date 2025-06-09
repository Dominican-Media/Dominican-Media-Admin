"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

type AuthUserContextValues = {
  user: userType | null;
  setUser: Dispatch<SetStateAction<null | userType>>;
  logout: () => void;
};

type AuthUserContextProviderTypes = {
  children: React.ReactNode;
};

export const AuthUserContext = createContext({} as AuthUserContextValues);

import React from "react";
import { userType } from "@/utilities/types";
import { LOCAL_STORAGE_AUTH_KEY } from "@/utilities/constants";
import { routes } from "@/utilities/routes";
import { useRouter } from "next/navigation";

const AuthUserContextProvider = ({
  children,
}: AuthUserContextProviderTypes) => {
  // States
  const [user, setUser] = useState<null | userType>(null);

  //   Router
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    setUser(null);
    router.push(routes.SIGN_IN);
  };

  return (
    <AuthUserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContextProvider;
