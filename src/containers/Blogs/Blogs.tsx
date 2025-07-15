"use client";

import Plus from "@/assets/svgIcons/Plus";
import Input from "@/components/Input/Input";
import Loader from "@/components/Loader/Loader";
import Paginator from "@/components/Paginator/Paginator";
import SectionsNav from "@/components/SectionsNav/SectionsNav";
import { BlogContext } from "@/context/BlogContext";
import { generateQueryString } from "@/helpers/generateQueryString";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { useBlogs } from "@/hooks/useBlogs";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { PAGE_LIMIT } from "@/utilities/constants";
import { routes } from "@/utilities/routes";
import { navItemTypes } from "@/utilities/types";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";
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
  const [page, setPage] = useState(1);

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
    page,
    limit: PAGE_LIMIT,
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
          {navItems[0].isActive && (
            <BlogList
              data={blogs}
              url={generateQueryString("/blogs", {
                search: search as string,
                type: type as string,
                page,
                limit: PAGE_LIMIT,
              })}
            />
          )}
          {navItems[1].isActive && (
            <BlogList
              data={blogs}
              url={generateQueryString("/blogs", {
                search: search as string,
                type: type as string,
                page,
                limit: PAGE_LIMIT,
              })}
            />
          )}
          {navItems[2].isActive && (
            <BlogList
              data={blogs}
              url={generateQueryString("/blogs", {
                search: search as string,
                type: type as string,
                page,
                limit: PAGE_LIMIT,
              })}
            />
          )}

          {blogs.length > 0 && (
            <Paginator
              data={blogs}
              maxLimit={10}
              isBackend
              setActiveNumberState={setPage}
              pages={data?.data?.totalPages}
            />
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default Blogs;
