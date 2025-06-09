import Plus from "@/assets/svgIcons/Plus";
import Button from "@/components/Button/Button";
import FileUploadInput from "@/components/FileUploadInput/FileUploadInput";
import Input from "@/components/Input/Input";
import Loader from "@/components/Loader/Loader";
import TextArea from "@/components/Textarea/Textarea";
import { useToast } from "@/context/ToastContext";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { useServiceById } from "@/hooks/useServices";
import { requestType, servicesType } from "@/utilities/types";
import { Check } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import classes from "./AddServiceModalBody.module.css";

type AddServiceModalBodyTypes = {
  activeServiceId: null | string;
  onClose: () => void;
};

const AddServiceModalBody = ({
  activeServiceId,
  onClose,
}: AddServiceModalBodyTypes) => {
  // States
  const [serviceImage, setServiceImage] = useState<File[]>([]);
  const [serviceData, setServiceData] = useState<servicesType>({
    title: "",
    image: null,
    description: "",
  });
  const [serviceDataFormData, setServiceDataFormData] = useState(
    new FormData()
  );
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // Hooks
  const { errorFlowFunction } = useError();
  const { showToast } = useToast();

  // Requests
  const { isLoading, data } = useServiceById(activeServiceId as string);

  const handleEditService = () => {
    requestHandler({
      url: `/services/${activeServiceId}`,
      data: serviceDataFormData,
      isMultipart: true,
      method: "PATCH",
      state: requestState,
      setState: setRequestState,
      requestCleanup: true,
      successFunction(res) {
        showToast(res?.data?.message);
        mutate("/services");
        onClose();
      },
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  const handleCreateService = () => {
    requestHandler({
      url: `/services`,
      data: serviceDataFormData,
      isMultipart: true,
      method: "POST",
      state: requestState,
      setState: setRequestState,
      requestCleanup: true,
      successFunction(res) {
        showToast(res?.data?.message);
        mutate("/services");
        onClose();
      },
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  // Effects
  useEffect(() => {
    if (data?.data && activeServiceId) {
      setServiceData({
        title: data?.data?.service?.title,
        image: data?.data?.service?.image,
        description: data?.data?.service?.description,
      });
    }
  }, [data]);

  useEffect(() => {
    if (serviceImage?.length > 0) {
      setServiceData((prevState) => {
        return { ...prevState, image: serviceImage[0] };
      });
    }
  }, [serviceImage]);

  useEffect(() => {
    const subFormData = new FormData();
    subFormData.append("title", serviceData?.title);
    subFormData.append("description", serviceData?.description);
    subFormData.append("image", serviceData?.image as any);

    setServiceDataFormData(subFormData);
  }, [serviceData]);

  console.log(serviceData, "Data");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.container}>
      <h2>
        {activeServiceId
          ? `Edit ${serviceData?.title}`
          : "Create a New Service"}{" "}
      </h2>

      <form>
        <Input
          label="Service Name"
          name="title"
          value={serviceData?.title}
          onChange={(e) => inputChangeHandler(e, setServiceData)}
        />
        <TextArea
          label="Service Description"
          name="description"
          value={serviceData?.description}
          onChange={(e) => inputChangeHandler(e, setServiceData)}
        />
        <FileUploadInput
          title="Add a service image"
          files={serviceImage}
          setFiles={setServiceImage}
          accept="image/*"
        />

        <Button
          disabled={
            data?.data?.service?.title === serviceData?.title &&
            data?.data?.service?.description === serviceData?.description &&
            serviceImage?.length === 0
          }
          onClick={(e) => {
            e.preventDefault();
            activeServiceId ? handleEditService() : handleCreateService();
          }}
          loading={requestState?.isLoading}
        >
          {activeServiceId ? (
            <Check color="inherit" style={{ color: "#fff" }} />
          ) : (
            <Plus />
          )}
          <span>{activeServiceId ? "Update" : "Create"} Service</span>
        </Button>
      </form>
    </div>
  );
};

export default AddServiceModalBody;
