"use client";

import Plus from "@/assets/svgIcons/Plus";
import GreetingComponent from "@/components/GreetingComponent/GreetingComponent";
import Modal from "@/components/Modal/Modal";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { modalGenericType } from "@/utilities/types";
import { useState } from "react";
import CreateUserModalBody from "../CreateUserModalBody/CreateUserModalBody";
import ProfilesStats from "../ProfilesStats/ProfilesStats";
import ProfilesTable from "../ProfilesTable/ProfilesTable";
import classes from "./Profiles.module.css";

const Profiles = () => {
  // States
  const [modals, setModals] = useState<modalGenericType>({
    createUser: false,
    editUser: false,
  });
  const [activeUser, setActiveUser] = useState<null | string>(null);

  return (
    <>
      {modals.createUser && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <CreateUserModalBody onClose={() => setAllModalsFalse(setModals)} />
          }
        />
      )}

      <DashboardLayout
        header="Profiles"
        className={classes.container}
        button={{
          text: "Create a new profile",
          icon: <Plus />,
          action: () => {
            setModalTrue(setModals, "createUser");
          },
        }}
      >
        <GreetingComponent />
        <ProfilesStats />
        <ProfilesTable
          setActiveUserId={setActiveUser}
          activeUserId={activeUser}
        />
      </DashboardLayout>
    </>
  );
};

export default Profiles;
