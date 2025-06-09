import Button from "@/components/Button/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import FileUploadInput from "@/components/FileUploadInput/FileUploadInput";
import Input from "@/components/Input/Input";
import { useState } from "react";
import classes from "./CreateUserModalBody.module.css";

const CreateUserModalBody = () => {
  // States
  const [profileImage, setProfileImage] = useState<File[]>([]);

  return (
    <section className={classes.container}>
      <h4>Create a New User</h4>

      <form>
        <Input label="First Name" placeholder="Eg. John" />
        <Input label="Last Name" placeholder="Eg. Doe" />
        <FileUploadInput
          files={profileImage}
          setFiles={setProfileImage}
          title="Upload a profile image"
        />
        <Dropdown label="Role" options={["Admin", "Author", "Presenter"]} />

        <Input
          label="Email Address"
          placeholder="Eg. abc@xyz.com"
          type="email"
          tip="The user with this email address will receive a notification notifying them that they have been added with these credentials"
        />

        <Button>Submit</Button>
      </form>
    </section>
  );
};

export default CreateUserModalBody;
