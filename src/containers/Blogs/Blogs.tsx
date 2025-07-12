"use client";

import Plus from "@/assets/svgIcons/Plus";
import Input from "@/components/Input/Input";
import Loader from "@/components/Loader/Loader";
import SectionsNav from "@/components/SectionsNav/SectionsNav";
import { BlogContext } from "@/context/BlogContext";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { useBlogs } from "@/hooks/useBlogs";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { NEWS } from "@/utilities/constants";
import { routes } from "@/utilities/routes";
import { navItemTypes } from "@/utilities/types";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";
import BlogContent from "../BlogContent/BlogContent";
import BlogList from "../BlogList/BlogList";
import classes from "./Blogs.module.css";

const Blogs = () => {
  // Router
  const router = useRouter();

  // States
  const [navItems, setNavItems] = useState<navItemTypes[]>([
    {
      title: "All",
      isActive: true,
      id: "all",
    },
    {
      title: "Published",
      isActive: false,
      id: "published",
    },
    {
      title: "Drafts",
      isActive: false,
      id: "draft",
    },
  ]);
  const [searchState, setSearchState] = useState("");

  // Context
  const { resetBlogState } = useContext(BlogContext);

  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();

  // Router
  const search = updateSearchParams("search", undefined, "get");
  const type = updateSearchParams("type", undefined, "get");

  // Hooks
  const { isLoading, data } = useBlogs({
    search: search as string,
    type: type as string,
  });

  const blogs = useMemo(() => {
    return data?.data?.blogs;
  }, [data]);

  // Effects
  useEffect(() => {
    if (searchState) {
      const timeout = setTimeout(() => {
        updateSearchParams("search", searchState, "set");
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      updateSearchParams("search", undefined, "delete");
    }
  }, [searchState]);

  useEffect(() => {
    resetBlogState();
  }, []);

  return (
    <DashboardLayout
      header="Blogs"
      button={{
        text: "New Blog Item",
        icon: <Plus />,
        action: () => {
          router.push(routes.CREATE_BLOG);
        },
      }}
      className={classes.container}
    >
      <div className={classes.header}>
        <SectionsNav
          navItems={navItems}
          setNavItems={setNavItems}
          isRoute
          id="type"
        />

        <Input
          type="search"
          placeholder="Search by title, description or content "
          onChange={(e) => {
            inputChangeHandler(e, setSearchState, true);
          }}
          value={searchState}
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {navItems[0].isActive && <BlogList data={blogs} />}
          {navItems[1].isActive && <BlogList data={blogs} />}
          {navItems[2].isActive && <BlogList data={blogs} />}
        </>
      )}
    </DashboardLayout>
  );
};

export default Blogs;
