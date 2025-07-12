import CustomTable from "@/components/CustomTable/CustomTable";
import DeleteModalBody from "@/components/DeleteModalBody/DeleteModalBody";
import Modal from "@/components/Modal/Modal";
import { useToast } from "@/context/ToastContext";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { useUsers } from "@/hooks/useUsers";
import { dummyProfiles } from "@/utilities/data";
import { modalGenericType, requestType, userType } from "@/utilities/types";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { mutate } from "swr";
import CreateUserModalBody from "../CreateUserModalBody/CreateUserModalBody";

type ProfilesTableTypes = {
  activeUserId?: string | null;
  setActiveUserId: Dispatch<SetStateAction<string | null>>;
};

const ProfilesTable = ({
  activeUserId,
  setActiveUserId,
}: ProfilesTableTypes) => {
  // Utils
  const headers = ["Name", "Email Address", "Role", "Status"];
  const fields = ["name", "email", "role", "status"];
  const options = [
    {
      text: "Toggle Account Status",
      action: (data: any) => {
        handleUserStatusToggle(data?._id);
      },
    },
    {
      text: "Edit Account Information",
      action: (data: any) => {
        setActiveUserId(data?._id);
        setModalTrue(setModals, "editUser");
      },
    },
    {
      text: "Delete Account",
      action: (data: any) => {
        setActiveUserId(data?._id);
        setModalTrue(setModals, "deleteAccount");
      },
    },
  ];

  //   States
  const [modals, setModals] = useState<modalGenericType>({
    deleteAccount: false,
    sendMessage: false,
    editUser: false,
  });
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // Hooks
  const { errorFlowFunction } = useError();
  const { showToast } = useToast();

  // Requests
  const { isLoading, data } = useUsers();

  const handleUserStatusToggle = (id: string) => {
    requestHandler({
      url: `/users/toggle-status/${id}`,
      method: "PATCH",
      state: requestState,
      setState: setRequestState,
      requestCleanup: true,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        mutate("/users");
      },
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  const handleDeletUser = (id: string) => {
    requestHandler({
      url: `/users/${id}`,
      method: "DELETE",
      state: requestState,
      setState: setRequestState,
      requestCleanup: true,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        mutate("/users");
        setAllModalsFalse(setModals);
      },
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  const users = useMemo(() => {
    return data?.data?.users?.map((user: userType) => {
      return { ...user, name: `${user?.firstName} ${user?.lastName}` };
    });
  }, [data?.data?.users]);

  return (
    <>
      {modals.deleteAccount && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <DeleteModalBody
              text="Are you sure you want to delete this user? "
              caption="Ensure this user has no active shows, or blog items. Clicking `Delete` clears all users data permanently"
              onClose={() => setAllModalsFalse(setModals)}
              onDelete={() => {
                handleDeletUser(activeUserId as string);
              }}
              isLoading={requestState?.isLoading}
            />
          }
        />
      )}

      {modals.editUser && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <CreateUserModalBody
              onClose={() => setAllModalsFalse(setModals)}
              activeUserId={activeUserId}
              isEditing
            />
          }
        />
      )}
      <CustomTable
        data={users}
        fields={fields}
        header="Profiles"
        isOptions={true}
        headers={headers}
        options={options}
        loading={isLoading || requestState?.isLoading}
        onRowClick={(data) => setActiveUserId(data?._id)}
      />
    </>
  );
};

export default ProfilesTable;
