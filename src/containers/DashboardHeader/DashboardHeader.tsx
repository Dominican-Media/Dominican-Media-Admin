"use client";

import classes from "./DashboardHeader.module.css";
import User from "@/assets/svgIcons/User";
import { usePathname } from "next/navigation";
import Logout from "@/assets/svgIcons/Logout";
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { modalGenericType } from "@/utilities/types";
import LogoutModalBody from "../LogoutModalBody/LogoutModalBody";
import Hamburger from "@/assets/svgIcons/Hamburger";
import Sidenav from "../SideNav/SideNav";
import Button from "@/components/Button/Button";

type DashboardHeaderType = {
  header: string;
  button?: {
    text: string;
    action: () => void;
    icon?: React.ReactNode;
  };
};

const DashboardHeader = ({ header, button }: DashboardHeaderType) => {
  // Router
  const pathname = usePathname();

  // States
  const [showOptions, setShowOptions] = useState(false);
  const [modals, setModals] = useState<modalGenericType>({
    logout: false,
  });

  // ref
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sideNavRef = useRef<HTMLDivElement | null>(null);

  const handleSidenavOpen = () => {
    if (sideNavRef?.current) {
      sideNavRef.current.style.width = "100vw";
    }
  };

  const handleSidenavClose = () => {
    if (sideNavRef?.current) {
      sideNavRef.current.style.width = "0%";
    }
  };

  // Effects
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleOptionsRemoveHandler = (e: any) => {
        if (
          containerRef?.current &&
          !containerRef?.current?.contains(e.target)
        ) {
          setShowOptions(false);
        }
      };

      document.addEventListener("mousedown", handleOptionsRemoveHandler);

      return () => {
        document.removeEventListener("mousedown", handleOptionsRemoveHandler);
      };
    }
  }, []);

  return (
    <>
      {modals?.logout && (
        <Modal
          body={
            <LogoutModalBody
              onClose={() => {
                setAllModalsFalse(setModals);
              }}
            />
          }
          onClick={() => {
            setAllModalsFalse(setModals);
          }}
        />
      )}

      <header className={classes.container} ref={containerRef}>
        <h4>{header}</h4>

        {button && (
          <Button onClick={button.action}>
            {button.icon}
            <span> {button.text}</span>
          </Button>
        )}

        <div className={classes.sidenav} ref={sideNavRef}>
          <Sidenav onClose={handleSidenavClose} />
        </div>

        <Hamburger onClick={() => handleSidenavOpen()} />
      </header>
    </>
  );
};

export default DashboardHeader;
