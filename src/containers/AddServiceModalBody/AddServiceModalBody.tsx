import Plus from "@/assets/svgIcons/Plus";
import Button from "@/components/Button/Button";
import FileUploadInput from "@/components/FileUploadInput/FileUploadInput";
import Input from "@/components/Input/Input";
import TextArea from "@/components/Textarea/Textarea";
import { useState } from "react";
import classes from "./AddServiceModalBody.module.css";

const AddServiceModalBody = () => {
  // States
  const [serviceImage, setServiceImage] = useState<File[]>([]);
  return (
    <div className={classes.container}>
      <h2>Create a New Service</h2>

      <form>
        <Input label="Service Name" />
        <TextArea label="Service Description" />
        <FileUploadInput
          title="Add a service image"
          files={serviceImage}
          setFiles={setServiceImage}
        />

        <Button>
          <Plus />
          <span>Create Service</span>
        </Button>
      </form>
    </div>
  );
};

export default AddServiceModalBody;
