import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { useToast } from "@/context/ToastContext";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { requestHandler } from "@/helpers/requestHandler";
import { useCategories } from "@/hooks/useBlogs";
import useError from "@/hooks/useError";
import { blogCategoriesType, requestType } from "@/utilities/types";
import { useMemo, useState } from "react";
import { mutate } from "swr";
import classes from "./CreateCategory.module.css";

type CreateCategoryType = {
  onClose: () => void;
};

const CreateCategory = ({ onClose }: CreateCategoryType) => {
  // States
  const [title, setTitle] = useState("");
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    error: null,
    data: null,
  });

  //   Hooks
  const { showToast } = useToast();
  const { errorFlowFunction } = useError();

  //   Requests
  const handleCreateCategory = () => {
    requestHandler({
      url: "/blogs/category/create",
      method: "POST",
      data: { title },
      state: requestState,
      setState: setRequestState,
      requestCleanup: true,
      successFunction(res) {
        showToast(res?.data?.message);
        onClose();
        mutate("/blogs/category/get-categories");
      },
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  return (
    <div className={classes.container}>
      <h2>Create Category</h2>

      <form action="">
        <Input
          label="Category Title"
          name="title"
          value={title}
          onChange={(e) => inputChangeHandler(e, setTitle, true)}
          isRequired
        />

        <Button
          onClick={(e) => {
            e.preventDefault();
            handleCreateCategory();
          }}
          loading={requestState?.isLoading}
          disabled={!title}
        >
          Add category
        </Button>
      </form>
    </div>
  );
};

export default CreateCategory;
