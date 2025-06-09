import { useContext } from "react";
import { useToast } from "../context/ToastContext";
import { AuthUserContext } from "@/context/AuthUserContext";

const useError = () => {
  // Context
  const { showToast } = useToast();
  const { logout } = useContext(AuthUserContext);

  // Utils
  const errorFlowFunction = (err: any) => {
    if (err?.status === 401) {
      logout();
    }

    showToast(
      err?.response?.data?.error ||
        err?.response?.data?.message ||
        "An error occured, please try again in few minutes",
      "error"
    );
  };

  return { errorFlowFunction };
};

export default useError;
