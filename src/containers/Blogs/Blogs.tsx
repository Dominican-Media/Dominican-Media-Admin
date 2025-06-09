"use client";

import Plus from "@/assets/svgIcons/Plus";
import Input from "@/components/Input/Input";
import SectionsNav from "@/components/SectionsNav/SectionsNav";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { NEWS } from "@/utilities/constants";
import { routes } from "@/utilities/routes";
import { navItemTypes } from "@/utilities/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import BlogList from "../BlogList/BlogList";
import classes from "./Blogs.module.css";

const Blogs = () => {
  // Router
  const router = useRouter();

  // States
  const [navItems, setNavItems] = useState<navItemTypes[]>([
    {
      title: "Published",
      isActive: true,
    },
    {
      title: "Drafts",
      isActive: false,
    },
  ]);

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
        <SectionsNav navItems={navItems} setNavItems={setNavItems} />

        <Input
          type="search"
          placeholder="Search by title, category or author"
        />
      </div>

      {navItems[0].isActive && <BlogList data={NEWS} />}
      {navItems[1].isActive && <BlogList data={NEWS} />}
    </DashboardLayout>
  );
};

export default Blogs;
