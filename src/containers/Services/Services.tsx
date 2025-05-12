"use client";

import Plus from "@/assets/svgIcons/Plus";
import Button from "@/components/Button/Button";
import DeleteModalBody from "@/components/DeleteModalBody/DeleteModalBody";
import Modal from "@/components/Modal/Modal";
import { setAllModalsFalse } from "@/helpers/modalHandlers";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { modalGenericType } from "@/utilities/types";
import { useState } from "react";
import AddServiceModalBody from "../AddServiceModalBody/AddServiceModalBody";
import ServiceList from "../ServiceList/ServiceList";

const Services = () => {
  // Hpoks
  const { updateConcurrentSearchParams, updateSearchParams } =
    useUpdateSearchParams();

  //   Router
  const service = updateSearchParams("service", undefined, "get");

  return (
    <>
      {service && (
        <Modal
          onClick={() => {
            updateConcurrentSearchParams({
              service: { method: "delete" },
              edit: { method: "delete" },
            });
          }}
          body={<AddServiceModalBody />}
        />
      )}

      <DashboardLayout
        header="Services"
        button={{
          text: "Add Service",
          action: () => {
            updateSearchParams("service", "add", "set");
          },
          icon: <Plus />,
        }}
      >
        <ServiceList />
      </DashboardLayout>
    </>
  );
};

export default Services;
