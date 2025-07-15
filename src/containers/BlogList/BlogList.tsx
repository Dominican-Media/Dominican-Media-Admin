"use client";

import DeleteModalBody from "@/components/DeleteModalBody/DeleteModalBody";
import Modal from "@/components/Modal/Modal";
import NewsCard from "@/components/NewsCard/NewsCard";
import { useToast } from "@/context/ToastContext";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { blogItemType, modalGenericType, requestType } from "@/utilities/types";
import { useState } from "react";
import { mutate } from "swr";
import classes from "./BlogList.module.css";

type BlogListTypes = {
  data: blogItemType[];
  url?: string;
};

const BlogList = ({ data, url }: BlogListTypes) => {
  // States
  const [modals, setModals] = useState<modalGenericType>({
    delete: false,
  });
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [selectedBlogItem, setSelectedBlogItem] = useState<null | string>(null);

  // Hooks
  const { showToast } = useToast();
  const { errorFlowFunction } = useError();

  const handleDeleteBlogItem = () => {
    requestHandler({
      url: `/blogs/${selectedBlogItem}`,
      method: "DELETE",
      state: requestState,
      setState: setRequestState,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        setAllModalsFalse(setModals);
        mutate(url);
      },
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  return (
    <>
      {modals.delete && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <DeleteModalBody
              text="Are you sure you want to delete this Blog Item?"
              caption="This item and comments associated with this blog item will be depeted permanently"
              onClose={() => setAllModalsFalse(setModals)}
              onDelete={() => {
                if (selectedBlogItem) {
                  handleDeleteBlogItem();
                }
              }}
              isLoading={requestState?.isLoading}
            />
          }
        />
      )}
      <section className={classes.container}>
        {data?.length > 0 ? (
          data.map((blog, i) => {
            return (
              <NewsCard
                key={i}
                {...blog}
                onDelete={(slug) => {
                  setSelectedBlogItem(slug);
                  setModalTrue(setModals, "delete");
                }}
              />
            );
          })
        ) : (
          <p>No items available at the moment</p>
        )}
      </section>
    </>
  );
};

export default BlogList;
