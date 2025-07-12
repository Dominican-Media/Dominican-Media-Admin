"use client";

import Logo from "@/components/Logo/Logo";
import classes from "./DashboardSideNav.module.css";
import { dashboardRoutes, routes } from "@/utilities/routes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logout from "@/assets/svgIcons/Logout";
import { useContext, useEffect, useRef, useState } from "react";
import { modalGenericType } from "@/utilities/types";
import Modal from "@/components/Modal/Modal";
import LogoutModalBody from "../LogoutModalBody/LogoutModalBody";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { AuthUserContext } from "@/context/AuthUserContext";

const DashboardSideNav = () => {
  // Router
  const pathname = usePathname();
  const router = useRouter();

  // States
  const [modals, setModals] = useState<modalGenericType>({
    logout: false,
  });

  // Context
  const { logout, user } = useContext(AuthUserContext);

  // Ref
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {modals?.logout && (
        <Modal
          body={
            <LogoutModalBody
              onClose={() => setAllModalsFalse(setModals)}
              onLogout={() => {
                logout();
              }}
            />
          }
          onClick={() => setAllModalsFalse(setModals)}
        />
      )}
      <nav className={classes.container} ref={containerRef}>
        <Logo />

        <ul>
          {dashboardRoutes
            ?.filter((data) => {
              return data?.roles?.includes(user?.role as string);
            })
            ?.map((data) => {
              return (
                <li
                  className={
                    pathname.includes(data?.route)
                      ? classes.active
                      : classes.inActive
                  }
                  key={data?.route}
                >
                  <Link href={data?.route}>
                    {data?.icon}
                    <span>{data?.title}</span>
                  </Link>
                </li>
              );
            })}
        </ul>

        <div
          className={classes.logout}
          onClick={() => setModalTrue(setModals, "logout")}
        >
          <Logout />
          <span>Logout</span>
        </div>
      </nav>
    </>
  );
};

export default DashboardSideNav;
