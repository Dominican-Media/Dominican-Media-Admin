"use client";

import Close from "@/assets/svgIcons/Close";
import Plus from "@/assets/svgIcons/Plus";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import Editor from "@/components/Editor/Editor";
import FileUploadInput from "@/components/FileUploadInput/FileUploadInput";
import Input from "@/components/Input/Input";
import Loader from "@/components/Loader/Loader";
import Modal from "@/components/Modal/Modal";
import { SimpleEditor } from "@/components/ReactQuill/ReactQuill";
import TextArea from "@/components/Textarea/Textarea";
import { BlogContext } from "@/context/BlogContext";
import { useToast } from "@/context/ToastContext";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { requestHandler } from "@/helpers/requestHandler";
import { useBlogById, useCategories } from "@/hooks/useBlogs";
import useError from "@/hooks/useError";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { routes } from "@/utilities/routes";
import {
  blogCategoriesType,
  blogItemType,
  modalGenericType,
  requestType,
} from "@/utilities/types";
import { capitalize } from "@/helpers/capitalize";
import { useParams, useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import CreateCategory from "../CreateCategory/CreateCategory";
import classes from "./CreateBlogItem.module.css";
import { mutate } from "swr";

type CreateBlogItemTypes = {
  edit?: boolean;
};

const CreateBlogItem = ({ edit }: CreateBlogItemTypes) => {
  // States
  const [blogImage, setBlogImage] = useState<File[] | string>([]);
  const [modals, setModals] = useState<modalGenericType>({
    createCategory: false,
  });
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [formDataState, setFormDataState] = useState(new FormData());

  // Hooks
  const { showToast } = useToast();
  const { errorFlowFunction } = useError();

  // Context
  const { blogData, setBlogData, resetBlogState } = useContext(BlogContext);

  // Router
  const router = useRouter();
  const { blogId } = useParams();

  const { isLoading, data: categoriesData } = useCategories();
  const { isLoading: blogDataIsLoading, data: blogDataData } = useBlogById(
    blogId as string
  );

  //   Memos
  const categories: string[] = useMemo(() => {
    return categoriesData?.data?.categories?.map(
      (category: blogCategoriesType) => category?.title
    );
  }, [categoriesData]);

  // Effects
  useEffect(() => {
    router.prefetch(routes.PREVIEW_BLOG);
  }, []);

  useEffect(() => {
    if (content) {
      setBlogData((prevState) => {
        return { ...prevState, content, createdAt: new Date() };
      });
    }

    if (category) {
      const selectedCategoryId = categoriesData?.data?.categories?.find(
        (data: any) => data?.title === category
      )?._id;

      setBlogData((prevState) => {
        if (!prevState?.category?.includes(selectedCategoryId)) {
          return {
            ...prevState,
            category: [...prevState.category, selectedCategoryId],
          };
        } else {
          return prevState;
        }
      });
    }

    if (blogImage) {
      setBlogData((prevState) => {
        return {
          ...prevState,
          image: blogImage[0] || blogDataData?.data?.blogItem?.image,
        };
      });
    }

    if (previewImage) {
      setBlogData((prevState) => {
        return { ...prevState, previewImage };
      });
    }
  }, [content, category, blogImage, previewImage]);

  useEffect(() => {
    if (blogData?.content) {
      setContent(blogData?.content);
    }

    if (blogData?.image) {
      setBlogImage([blogData?.image as File]);
      setPreviewImage(blogData?.previewImage as string | null);
    }
  }, []);

  useEffect(() => {
    if (blogDataData) {
      const singlyBlogData: blogItemType = blogDataData?.data?.blogItem;

      setBlogData((prevState) => {
        return {
          ...prevState,
          category: singlyBlogData?.category,
          content: singlyBlogData?.content,
          createdAt: singlyBlogData?.createdAt,
          description: singlyBlogData?.description,
          facebookUrl: singlyBlogData?.facebookUrl,
          image: singlyBlogData?.image,
          instagramUrl: singlyBlogData?.instagramUrl,
          previewImage: singlyBlogData?.previewImage,
          title: singlyBlogData?.title,
          type: singlyBlogData?.type,
          xUrl: singlyBlogData?.xUrl,
        };
      });

      setContent(singlyBlogData?.content);
      setPreviewImage(singlyBlogData?.image as string);
    }
  }, [blogDataData]);

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
        mutate("/blogs");
        resetBlogState();
        router.push(routes.BLOG);
      },
      id: "publish-blog",
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  const handleUpdateBlogItem = () => {
    requestHandler({
      url: `/blogs/${blogId}`,
      method: "PATCH",
      isMultipart: true,
      data: formDataState,
      state: requestState,
      setState: setRequestState,
      requestCleanup: true,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        mutate("/blogs");
        resetBlogState();
        router.push(routes.BLOG);
      },
      id: "update-blog",
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  const handleToggleBlogItemType = () => {
    requestHandler({
      url: `/blogs/type/toggle/${blogId}`,
      method: "PATCH",
      isMultipart: true,
      state: requestState,
      setState: setRequestState,
      requestCleanup: true,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        mutate(`/blogs/${blogId}`);
      },
      id: "update-type",
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

  if (blogDataIsLoading) {
    return <Loader />;
  }

  return (
    <>
      {modals.createCategory && (
        <Modal
          onClick={() => {
            setAllModalsFalse(setModals);
          }}
          body={
            <CreateCategory
              onClose={() => {
                setAllModalsFalse(setModals);
              }}
            />
          }
        />
      )}
      <DashboardLayout
        header={
          edit
            ? `Edit ${capitalize(blogDataData?.data?.blogItem?.title)}`
            : "Create Blog"
        }
        className={classes.container}
      >
        <form action="">
          <h4>Content Info Section</h4>
          <Input
            label="Blog Title"
            name="title"
            value={blogData?.title}
            onChange={(e) => inputChangeHandler(e, setBlogData)}
          />
          <TextArea
            label="Blog Description"
            name="description"
            value={blogData?.description}
            onChange={(e) => inputChangeHandler(e, setBlogData)}
          />
          <div className={classes.createBlog}>
            <Dropdown
              label="Select Category"
              options={categories}
              isLoading={isLoading}
              selected={category}
              setSelected={setCategory}
            />

            <div className={classes.categories}>
              {blogData?.category?.map((data) => {
                const categoryTitle = (
                  categoriesData?.data?.categories as any
                )?.find((datum: any) => data === datum?._id)?.title;

                return (
                  <div className={classes.category} key={data as string}>
                    <span>{categoryTitle}</span>
                    <span>
                      <Close
                        dimensions={{ width: "16px", height: "16px" }}
                        onClick={() => {
                          setBlogData((prevState) => {
                            const updatedState = { ...prevState };

                            const newCategories = updatedState?.category.filter(
                              (item) => item !== data
                            );
                            updatedState.category = newCategories;

                            return updatedState;
                          });
                        }}
                      />
                    </span>
                  </div>
                );
              })}
            </div>

            <Button
              onClick={(e) => {
                e.preventDefault();
                setModalTrue(setModals, "createCategory");
              }}
            >
              <Plus />
              <span>Create category</span>
            </Button>
          </div>

          <FileUploadInput
            title="Upload Blog Image"
            files={blogImage as File[]}
            setFiles={setBlogImage as Dispatch<SetStateAction<File[]>>}
            accept="image/*"
            imagePreview={previewImage}
            setImagePreview={setPreviewImage}
          />

          <h4>Content</h4>
          <SimpleEditor state={content} setState={setContent} />

          <h4>Content Share Section</h4>
          <Input
            label="Facebook URL"
            name="facebookUrl"
            value={blogData?.facebookUrl}
            onChange={(e) => inputChangeHandler(e, setBlogData)}
          />
          <Input
            label="Instagram URL"
            name="instagramUrl"
            value={blogData?.instagramUrl}
            onChange={(e) => inputChangeHandler(e, setBlogData)}
          />
          <Input
            label="X URL"
            name="xUrl"
            value={blogData?.xUrl}
            onChange={(e) => {
              inputChangeHandler(e, setBlogData);
            }}
          />

          <div className={classes.buttonSection}>
            {edit ? (
              <>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleBlogItemType();
                  }}
                  type="secondary"
                  loading={
                    requestState?.isLoading &&
                    requestState?.id === "update-type"
                  }
                >
                  {blogDataData?.data?.blogItem?.type === "draft"
                    ? "Publish"
                    : "Revert to draft"}
                </Button>

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdateBlogItem();
                  }}
                  loading={
                    requestState?.isLoading &&
                    requestState?.id === "update-blog"
                  }
                >
                  Update
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    setBlogData((prevState) => {
                      return { ...prevState, type: "draft" };
                    });
                    handleUPublishBlogItem();
                  }}
                  loading={requestState?.isLoading}
                >
                  Save to draft
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setBlogData((prevState) => {
                      return { ...prevState, type: "published" };
                    });

                    router.push(routes.PREVIEW_BLOG);
                  }}
                >
                  Preview & Publish
                </Button>
              </>
            )}
          </div>
        </form>
      </DashboardLayout>
    </>
  );
};

export default CreateBlogItem;
