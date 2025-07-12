"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type AuthUserContextValues = {
  user: userType | null;
  setUser: Dispatch<SetStateAction<null | userType>>;
  logout: () => void;
  requestState: requestType;
};

type AuthUserContextProviderTypes = {
  children: React.ReactNode;
};

export const AuthUserContext = createContext({} as AuthUserContextValues);

import React from "react";
import { requestType, userType } from "@/utilities/types";
import { LOCAL_STORAGE_AUTH_KEY } from "@/utilities/constants";
import { routes } from "@/utilities/routes";
import { useRouter } from "next/navigation";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";

const AuthUserContextProvider = ({
  children,
}: AuthUserContextProviderTypes) => {
  // States
  const [user, setUser] = useState<null | userType>(null);
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // Hooks
  const { errorFlowFunction } = useError();

  // Requests
  const getUser = () => {
    requestHandler({
      url: "/users/me",
      method: "GET",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        errorFlowFunction(err);
      },
      successFunction(res) {
        setUser(res?.data?.user);
      },
    });
  };

  //   Router
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    setUser(null);
    router.push(routes.SIGN_IN);
  };

  // Effects
  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthUserContext.Provider value={{ user, setUser, logout, requestState }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContextProvider;
