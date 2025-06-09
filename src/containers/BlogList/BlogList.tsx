"use client";

import DeleteModalBody from "@/components/DeleteModalBody/DeleteModalBody";
import Modal from "@/components/Modal/Modal";
import NewsCard from "@/components/NewsCard/NewsCard";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { blogItemType, modalGenericType } from "@/utilities/types";
import { useState } from "react";
import classes from "./BlogList.module.css";

type BlogListTypes = {
  data: blogItemType[];
};

const BlogList = ({ data }: BlogListTypes) => {
  // States
  const [modals, setModals] = useState<modalGenericType>({
    delete: false,
  });

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
              onDelete={() => {}}
            />
          }
        />
      )}
      <section className={classes.container}>
        {data.map((blog, i) => {
          return (
            <NewsCard
              key={i}
              {...blog}
              onDelete={() => setModalTrue(setModals, "delete")}
            />
          );
        })}
      </section>
    </>
  );
};

export default BlogList;
