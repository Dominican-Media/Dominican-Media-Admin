import CustomTable from "@/components/CustomTable/CustomTable";
import DeleteModalBody from "@/components/DeleteModalBody/DeleteModalBody";
import Modal from "@/components/Modal/Modal";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { dummyProfiles } from "@/utilities/data";
import { modalGenericType } from "@/utilities/types";
import { useState } from "react";

const ProfilesTable = () => {
  // Utils
  const headers = ["Name", "Email Address", "Role", "Status"];
  const fields = ["name", "email", "role", "status"];
  const options = [
    {
      text: "Toggle Account Status",
      action: () => {},
    },
    {
      text: "Delete Account",
      action: () => {
        setModalTrue(setModals, "deleteAccount");
      },
    },
  ];

  //   States
  const [modals, setModals] = useState<modalGenericType>({
    deleteAccount: false,
    sendMessage: false,
  });

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
              onDelete={() => {}}
            />
          }
        />
      )}
      <CustomTable
        data={dummyProfiles}
        fields={fields}
        header="Profiles"
        isOptions={true}
        headers={headers}
        options={options}
      />
    </>
  );
};

export default ProfilesTable;
