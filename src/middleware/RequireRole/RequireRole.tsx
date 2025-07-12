"use client";

import React, { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthUserContext } from "@/context/AuthUserContext";
import { dashboardRoutes } from "@/utilities/routes";

type RequireRoleTypes = {
  children: React.ReactNode;
};

const RequireRole = ({ children }: RequireRoleTypes) => {
  // Router
  const pathname = usePathname();
  const router = useRouter();

  // Context
  const { user, requestState } = useContext(AuthUserContext);

  //   Utils
  const activeRoute = dashboardRoutes?.find((data) => {
    return data?.route === pathname;
  });

  const userRole = user?.role;

  //   Effects
  useEffect(() => {
    if (
      !requestState?.isLoading &&
      user &&
      !activeRoute?.roles?.includes(userRole as string)
    ) {
      router.push(activeRoute?.bounceRoute as string);
    }
  }, [requestState?.isLoading, user, pathname]);

  return <>{children}</>;
};

export default RequireRole;
