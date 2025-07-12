"use client";

import { activeToggler } from "@/helpers/activeHandlers";
import { Dispatch, SetStateAction, Suspense, useEffect } from "react";
import classes from "./SectionsNav.module.css";
import { navItemTypes } from "@/utilities/types";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import Loader from "../Loader/Loader";
import { capitalizeEachWord } from "@/helpers/capitalize";

type SectionsNavTypes = {
  navItems: navItemTypes[];
  setNavItems: Dispatch<SetStateAction<navItemTypes[]>>;
  type?: "secondary" | "tertiary";
  isRoute?: boolean;
  id?: string;
};

const SectionsNav = ({
  navItems,
  setNavItems,
  type,
  isRoute,
  id,
}: SectionsNavTypes) => {
  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();
  const param = updateSearchParams(id as string, undefined, "get");

  useEffect(() => {
    if (type) {
      setNavItems((prevState: any) => {
        return prevState.map((data: any) => {
          if ((data?.id as string) === (param as string)) {
            return { ...data, isActive: true };
          } else {
            return { ...prevState, isActive: false };
          }
        });
      });
    }
  }, [param]);

  return (
    <Suspense fallback={<Loader />}>
      <section className={classes.container} id={id}>
        {navItems.map((navItem, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                if (isRoute) {
                  if (navItem?.id === "all") {
                    updateSearchParams(id || "section", undefined, "delete");
                  } else {
                    updateSearchParams(id || "section", navItem?.id, "set");
                  }
                }
                activeToggler(index, navItems, setNavItems);
              }}
              className={`${
                navItem.isActive ? classes.active : classes.inActive
              } ${
                type === "secondary"
                  ? classes.button
                  : type === "tertiary"
                  ? classes.tertiary
                  : classes.noButton
              } ${navItem?.isBordered ? classes.bordered : undefined}`}
            >
              {capitalizeEachWord(navItem.title)}
            </div>
          );
        })}
      </section>
    </Suspense>
  );
};

export default SectionsNav;
