"use client";

import Button from "@/components/Button/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import Editor from "@/components/Editor/Editor";
import FileUploadInput from "@/components/FileUploadInput/FileUploadInput";
import Input from "@/components/Input/Input";
import TextArea from "@/components/Textarea/Textarea";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { routes } from "@/utilities/routes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "./CreateBlogItem.module.css";

type CreateBlogItemTypes = {
  edit?: boolean;
};

const CreateBlogItem = ({ edit }: CreateBlogItemTypes) => {
  // States
  const [blogImage, setBlogImage] = useState<File[]>([]);

  // Router
  const router = useRouter();

  useEffect(() => {
    router.prefetch(routes.PREVIEW_BLOG);
  }, []);

  // TODO: Add title for the header of the blog
  return (
    <DashboardLayout
      header={edit ? "Edit Blog" : "Create Blog"}
      className={classes.container}
    >
      <form action="">
        <h4>Content Info Section</h4>
        <Input label="Blog Title" />
        <TextArea label="Blog Description" />
        <Dropdown label="Select Category" options={["Marriage"]} />
        <FileUploadInput
          title="Upload Blog Image"
          files={blogImage}
          setFiles={setBlogImage}
        />

        <h4>Content Section</h4>
        <Editor label="Blog Content" />

        <h4>Content Share Section</h4>
        <Input label="Facebook URL" />
        <Input label="Instagram URL" />
        <Input label="X URL" />

        <div className={classes.buttonSection}>
          <Button type="secondary">Save to draft</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push(routes.PREVIEW_BLOG);
            }}
          >
            Preview
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default CreateBlogItem;
