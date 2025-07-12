"use client";

import ArrowBack from "@/assets/svgIcons/ArrowBack";
import Button from "@/components/Button/Button";
import { BlogContext } from "@/context/BlogContext";
import { useToast } from "@/context/ToastContext";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { IMAGES } from "@/utilities/constants";
import { routes } from "@/utilities/routes";
import { requestType } from "@/utilities/types";
import { Check } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import classes from "./BlogContentText.module.css";

const BlogContentText = () => {
  // Router
  const router = useRouter();

  // Context
  const { blogData, resetBlogState } = useContext(BlogContext);

  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [formDataState, setFormDataState] = useState(new FormData());

  // Hooks
  const { showToast } = useToast();
  const { errorFlowFunction } = useError();

  // Requets
  const handleUPublishBlogItem = () => {
    requestHandler({
      url: "/blogs",
      method: "POST",
      isMultipart: true,
      data: formDataState,
      state: requestState,
      setState: setRequestState,
      requestCleanup: true,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        resetBlogState();
        router.push(routes.BLOG);
      },
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  // Effects
  useEffect(() => {
    const formData = new FormData();

    formData.append("title", blogData?.title);
    formData.append("description", blogData?.description);
    formData.append("category", JSON.stringify(blogData?.category));
    formData.append("content", blogData?.content);
    formData.append("facebookUrl", blogData?.facebookUrl);
    formData.append("instagramUrl", blogData?.instagramUrl);
    formData.append("xUrl", blogData?.xUrl);
    formData.append("image", blogData?.image as File);
    formData.append("type", blogData?.type);

    setFormDataState(formData);
  }, [blogData]);

  return (
    <section className={classes.container}>
      {blogData?.previewImage && (
        <Image
          src={blogData?.previewImage as string}
          alt="Blog Title"
          height={500}
          width={500}
        />
      )}

      <div
        className={classes.textSection}
        dangerouslySetInnerHTML={{ __html: blogData?.content }}
      ></div>

      <div className={classes.buttonSection}>
        <Button
          type="secondary"
          onClick={() => {
            router.push(routes.CREATE_BLOG);
          }}
        >
          <ArrowBack />
          <span>Continue editing</span>
        </Button>

        <Button
          onClick={() => {
            handleUPublishBlogItem();
          }}
          loading={requestState?.isLoading}
        >
          <Check color="inherit" style={{ color: "#fff" }} />
          <span>Publish</span>
        </Button>
      </div>
    </section>
  );
};

export default BlogContentText;
