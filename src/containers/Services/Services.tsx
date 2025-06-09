"use client";

import Plus from "@/assets/svgIcons/Plus";
import Modal from "@/components/Modal/Modal";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { useServices } from "@/hooks/useServices";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { modalGenericType } from "@/utilities/types";
import { useMemo, useState } from "react";
import AddServiceModalBody from "../AddServiceModalBody/AddServiceModalBody";
import ServiceList from "../ServiceList/ServiceList";

const Services = () => {
  // Requests
  const { isLoading, data } = useServices();

  // States
  const [activeServiceId, setActiveServiceId] = useState<null | string>(null);
  const [modals, setModals] = useState<modalGenericType>({
    createOrUpdate: false,
  });

  // Memos
  const services = useMemo(() => data?.data, [data]);

  return (
    <>
      {modals?.createOrUpdate && (
        <Modal
          onClick={() => {
            setActiveServiceId(null);
            setAllModalsFalse(setModals);
          }}
          body={
            <AddServiceModalBody
              activeServiceId={activeServiceId}
              onClose={() => {
                setAllModalsFalse(setModals);
                setActiveServiceId(null);
              }}
            />
          }
        />
      )}

      <DashboardLayout
        header="Services"
        button={{
          text: "Add Service",
          action: () => {
            setActiveServiceId(null);
            setModalTrue(setModals, "createOrUpdate");
          },
          icon: <Plus />,
        }}
      >
        <ServiceList
          data={services}
          loading={isLoading}
          activeServiceId={activeServiceId}
          setActiveServiceId={setActiveServiceId}
        />
      </DashboardLayout>
    </>
  );
};

export default Services;
