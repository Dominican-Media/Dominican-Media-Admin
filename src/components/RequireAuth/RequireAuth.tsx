"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/context/AuthUserContext";
import { routes } from "@/utilities/routes";
import Loader from "../Loader/Loader";
import { LOCAL_STORAGE_AUTH_KEY } from "@/utilities/constants";

type RequireAuthProps = {
  children: React.ReactNode;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  // Router
  const router = useRouter();

  // Context
  const { requestState } = useContext(AuthUserContext);

  //   States

  // Local
  const accessToken =
    typeof window !== "undefined" &&
    localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

  // Effects
  useEffect(() => {
    if (!requestState?.isLoading && !accessToken) {
      router.replace(routes.SIGN_IN);
    }
  }, [accessToken, requestState?.isLoading, router]);

  if (requestState.isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default RequireAuth;
