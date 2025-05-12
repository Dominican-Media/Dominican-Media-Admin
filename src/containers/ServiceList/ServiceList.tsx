import DeleteModalBody from "@/components/DeleteModalBody/DeleteModalBody";
import Modal from "@/components/Modal/Modal";
import ServicesCard from "@/components/ServicesCard/ServicesCard";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { SERVICES } from "@/utilities/constants";
import { modalGenericType } from "@/utilities/types";
import { useState } from "react";
import classes from "./ServiceList.module.css";

const ServiceList = () => {
  //   States
  const [modals, setModals] = useState<modalGenericType>({ delete: false });

  return (
    <>
      {modals.delete && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <DeleteModalBody
              text="Are you sure you want to delete this service"
              caption="If this service is delete, it cannot be retrieved anymore"
              onClose={() => setAllModalsFalse(setModals)}
              onDelete={() => {}}
            />
          }
        />
      )}

      <section className={classes.container}>
        <div className={classes.servicesSection}>
          {SERVICES.map((data) => {
            return (
              <ServicesCard
                {...data}
                key={data?.title}
                onDelete={() => {
                  setModalTrue(setModals, "delete");
                }}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ServiceList;
