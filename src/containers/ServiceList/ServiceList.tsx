import DeleteModalBody from "@/components/DeleteModalBody/DeleteModalBody";
import Modal from "@/components/Modal/Modal";
import ServicesCard from "@/components/ServicesCard/ServicesCard";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { SERVICES } from "@/utilities/constants";
import { modalGenericType, requestType, servicesType } from "@/utilities/types";
import Loader from "@/components/Loader/Loader";
import { Dispatch, SetStateAction, useState } from "react";
import classes from "./ServiceList.module.css";
import { requestHandler } from "@/helpers/requestHandler";
import { useToast } from "@/context/ToastContext";
import useError from "@/hooks/useError";
import { mutate } from "swr";
import AddServiceModalBody from "../AddServiceModalBody/AddServiceModalBody";

type ServiceListTypes = {
  data: servicesType[];
  loading: boolean;
  activeServiceId: null | string;
  setActiveServiceId: Dispatch<SetStateAction<null | string>>;
};

const ServiceList = ({
  data,
  loading,
  activeServiceId,
  setActiveServiceId,
}: ServiceListTypes) => {
  //   States
  const [modals, setModals] = useState<modalGenericType>({
    delete: false,
    createOrUpdate: false,
  });
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // Hooks
  const { showToast } = useToast();
  const { errorFlowFunction } = useError();

  // Helpers
  const onCloseModal = () => {
    setActiveServiceId(null);
    setAllModalsFalse(setModals);
  };

  // Requests
  const deleteHandler = () => {
    requestHandler({
      method: "DELETE",
      url: `/services/${activeServiceId}`,
      state: requestState,
      setState: setRequestState,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        mutate("/services");
        setAllModalsFalse(setModals);
      },
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  return (
    <>
      {modals.delete && activeServiceId && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <DeleteModalBody
              text="Are you sure you want to delete this service"
              caption="If this service is delete, it cannot be retrieved anymore"
              onClose={() => setAllModalsFalse(setModals)}
              onDelete={() => deleteHandler()}
              isLoading={requestState?.isLoading}
            />
          }
        />
      )}

      {modals?.createOrUpdate && (
        <Modal
          onClick={onCloseModal}
          body={
            <AddServiceModalBody
              activeServiceId={activeServiceId}
              onClose={onCloseModal}
            />
          }
        />
      )}

      <section className={classes.container}>
        {loading ? (
          <Loader />
        ) : (
          <div className={classes.servicesSection}>
            {data?.map((data) => {
              return (
                <ServicesCard
                  {...data}
                  id={data?._id}
                  key={data?.title}
                  onDelete={(id) => {
                    setModalTrue(setModals, "delete");
                  }}
                  onClick={(id) => {
                    setActiveServiceId(id as string);
                  }}
                  onEdit={() => {
                    setModalTrue(setModals, "createOrUpdate");
                  }}
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default ServiceList;
