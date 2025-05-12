"use client";

import Logo from "@/components/Logo/Logo";
import classes from "./DashboardSideNav.module.css";
import { dashboardRoutes, routes } from "@/utilities/routes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logout from "@/assets/svgIcons/Logout";
import { useEffect, useRef, useState } from "react";
import { modalGenericType } from "@/utilities/types";
import Modal from "@/components/Modal/Modal";
import LogoutModalBody from "../LogoutModalBody/LogoutModalBody";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";

const DashboardSideNav = () => {
  // Router
  const pathname = usePathname();
  const router = useRouter();

  // States
  const [modals, setModals] = useState<modalGenericType>({
    logout: false,
  });

  // Ref
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {modals?.logout && (
        <Modal
          body={
            <LogoutModalBody
              onClose={() => setAllModalsFalse(setModals)}
              onLogout={() => router.push(routes.SIGN_IN)}
            />
          }
          onClick={() => setAllModalsFalse(setModals)}
        />
      )}
      <nav className={classes.container} ref={containerRef}>
        <Logo />

        <ul>
          {dashboardRoutes?.map((data) => {
            return (
              <li
                className={
                  pathname === data?.route ? classes.active : classes.inActive
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
