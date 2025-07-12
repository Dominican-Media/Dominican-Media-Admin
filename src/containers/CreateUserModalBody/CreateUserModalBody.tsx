import Button from "@/components/Button/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import FileUploadInput from "@/components/FileUploadInput/FileUploadInput";
import Input from "@/components/Input/Input";
import Loader from "@/components/Loader/Loader";
import TextArea from "@/components/Textarea/Textarea";
import { useToast } from "@/context/ToastContext";
import { capitalize } from "@/helpers/capitalize";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { useUserById } from "@/hooks/useUsers";
import { requestType, userType } from "@/utilities/types";
import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { mutate } from "swr";
import classes from "./CreateUserModalBody.module.css";

type CreateUserModalBodyTypes = {
  onClose: () => void;
  isEditing?: boolean;
  activeUserId?: string | null;
};

const CreateUserModalBody = ({
  onClose,
  isEditing,
  activeUserId,
}: CreateUserModalBodyTypes) => {
  // States
  const [profileImage, setProfileImage] = useState<File[]>([]);
  const [userData, setUserData] = useState<userType>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: null,
    role: "",
    bio: "",
  });
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [userDataFormData, setUserDataFormData] = useState(new FormData());
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // Hooks
  const { errorFlowFunction } = useError();
  const { showToast } = useToast();

  // Requests
  const handleUser = (e: any) => {
    e.preventDefault();
    requestHandler({
      url: "/users",
      method: "POST",
      data: userDataFormData,
      state: requestState,
      setState: setRequestState,
      isMultipart: true,
      requestCleanup: true,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        mutate("/users");
        mutate("/users/users/stats");
        onClose();
      },
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  const handleEditUser = (e: any) => {
    e.preventDefault();
    requestHandler({
      url: `/users/${activeUserId}`,
      method: "PATCH",
      data: userDataFormData,
      state: requestState,
      setState: setRequestState,
      isMultipart: true,
      requestCleanup: true,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        mutate("/users");
        mutate("/users/users/stats");
        onClose();
      },
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  const { isLoading, data } = useUserById(
    isEditing ? (activeUserId as string) : null
  );

  // Memo
  const userInfo: userType = useMemo(() => {
    return data?.data?.user;
  }, [data]);

  // Effects
  useEffect(() => {
    if (profileImage.length > 0) {
      setUserData((prevState) => {
        return { ...prevState, image: profileImage[0] };
      });
    }
  }, [profileImage]);

  useEffect(() => {
    if (gender) {
      setUserData((prevState) => {
        return { ...prevState, gender: gender?.toLowerCase() };
      });
    }

    if (role) {
      setUserData((prevState) => {
        return { ...prevState, role: role?.toLowerCase() };
      });
    }
  }, [gender, role]);

  useEffect(() => {
    const subFormData = new FormData();

    subFormData.append("email", userData?.email);
    subFormData.append("password", userData?.password as string);
    subFormData.append("firstName", userData?.firstName);
    subFormData.append("lastName", userData?.lastName);
    subFormData.append("gender", userData?.gender as string);
    subFormData.append("role", userData?.role as string);
    subFormData.append("image", userData?.image as string);
    subFormData.append("phone", userData?.phone as string);
    subFormData.append("bio", userData?.bio as string);

    setUserDataFormData(subFormData);
  }, [userData]);

  useEffect(() => {
    if (data) {
      setUserData({
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email,
        bio: userInfo?.bio,
        gender: userInfo?.gender,
        image: userInfo?.image,
        password: userInfo?.password,
        phone: userInfo?.phone,
        role: userInfo?.role,
      });
    }
  }, [data]);

  return (
    <section className={classes.container}>
      <h4>
        {!isEditing
          ? "Create a New User"
          : `Edit ${userInfo?.firstName || "this user"}'s information`}
      </h4>

      {isLoading ? (
        <Loader />
      ) : (
        <form>
          <Input
            label="First Name"
            placeholder="Eg. John"
            name="firstName"
            value={userData?.firstName}
            onChange={(e) => inputChangeHandler(e, setUserData)}
          />
          <Input
            label="Last Name"
            placeholder="Eg. Doe"
            name="lastName"
            value={userData?.lastName}
            onChange={(e) => inputChangeHandler(e, setUserData)}
          />
          <Input
            label="Phone"
            placeholder="+123 456 78 910"
            type="phone"
            name="phone"
            value={userData?.phone}
            onChange={(e) => inputChangeHandler(e, setUserData)}
          />

          <FileUploadInput
            files={profileImage}
            setFiles={setProfileImage}
            title="Upload a profile image"
          />
          <TextArea
            label="Bio"
            placeholder="A happy presenter"
            name="bio"
            value={userData?.bio}
            onChange={(e) => inputChangeHandler(e, setUserData)}
          />

          <Dropdown
            label="Role"
            options={["Author", "Presenter"]}
            selected={role || capitalize(userData?.role as string)}
            setSelected={setRole}
          />
          <Dropdown
            label="Gender"
            options={["Male", "Female"]}
            selected={gender || capitalize(userData?.gender as string)}
            setSelected={setGender}
          />

          <Input
            label="Email Address"
            placeholder="Eg. abc@xyz.com"
            type="email"
            name="email"
            value={userData?.email}
            onChange={(e) => inputChangeHandler(e, setUserData)}
          />

          {!isEditing && (
            <Input
              label="Password"
              placeholder="******"
              type="password"
              tip="The user with this email address will receive a notification notifying them that they have been added with these credentials"
              name="password"
              value={userData?.password}
              onChange={(e) => inputChangeHandler(e, setUserData)}
              condition={(userData?.password as string)?.length >= 8}
              errorMessage="Password should be more than 8 characters"
            />
          )}

          <Button
            onClick={(e) => {
              if (!isEditing) {
                handleUser(e);
              } else {
                handleEditUser(e);
              }
            }}
            loading={requestState?.isLoading}
            disabled={
              !userData?.email ||
              (userData?.password as string)?.length < 8 ||
              !userData?.firstName ||
              !userData?.gender ||
              !userData?.phone ||
              !userData?.role ||
              !userData?.lastName
            }
          >
            Submit
          </Button>
        </form>
      )}
    </section>
  );
};

export default CreateUserModalBody;
