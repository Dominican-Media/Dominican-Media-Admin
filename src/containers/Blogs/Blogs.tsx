"use client";

import Plus from "@/assets/svgIcons/Plus";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import React from "react";
import BlogList from "../BlogList/BlogList";

const Blogs = () => {
  return (
    <DashboardLayout
      header="Blogs"
      button={{
        text: "New Blog Item",
        icon: <Plus />,
        action: () => {},
      }}
    >
      <BlogList />
    </DashboardLayout>
  );
};

export default Blogs;
