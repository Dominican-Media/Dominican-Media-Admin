"use client";

import Plus from "@/assets/svgIcons/Plus";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import ShowList from "../ShowList/ShowList";
import classes from "./Shows.module.css";

const Shows = () => {
  return (
    <DashboardLayout
      header="Shows"
      button={{
        text: "Create a New Show",
        action: () => {},
        icon: <Plus />,
      }}
    >
      <ShowList />
    </DashboardLayout>
  );
};

export default Shows;
