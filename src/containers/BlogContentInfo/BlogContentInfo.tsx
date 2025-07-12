"use client";

import Loader from "@/components/Loader/Loader";
import { AuthUserContext } from "@/context/AuthUserContext";
import { BlogContext } from "@/context/BlogContext";
import { capitalizeEachWord } from "@/helpers/capitalize";
import { useCategories } from "@/hooks/useBlogs";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import moment from "moment";
import { useContext } from "react";
import classes from "./BlogContentInfo.module.css";

const BlogContentInfo = () => {
  // Context
  const { blogData } = useContext(BlogContext);
  const { user } = useContext(AuthUserContext);

  const { isLoading, data: categoriesData } = useCategories();

  return (
    <section className={classes.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={classes.header}>
            <div className={classes.categories}>
              {blogData?.category?.map((data, i) => {
                const categoryTitle = (
                  categoriesData?.data?.categories as any
                )?.find((datum: any) => data === datum?._id)?.title;

                return (
                  <p>
                    {categoryTitle}{" "}
                    {i !== blogData?.category?.length - 1 && "|"}
                  </p>
                );
              })}
            </div>

            <h2>{blogData?.title}</h2>
            <p>{blogData?.description}</p>
          </div>

          <div>
            <h4>Text by</h4>
            <p>
              {capitalizeEachWord(
                `${user?.firstName || ""} ${user?.lastName || ""}`
              )}
            </p>
          </div>

          <div>
            <h4>Posted</h4>
            <p>{moment(blogData?.createdAt)?.format("Do MMMM, YYYY")}</p>
          </div>

          {(blogData?.instagramUrl ||
            blogData?.xUrl ||
            blogData?.facebookUrl) && (
            <div>
              {blogData?.facebookUrl && (
                <a
                  href={blogData?.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Facebook />
                </a>
              )}

              {blogData?.instagramUrl && (
                <a
                  href={blogData?.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram />
                </a>
              )}

              {blogData?.xUrl && (
                <a href={blogData?.xUrl} target="_blank" rel="noreferrer">
                  <Twitter />
                </a>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BlogContentInfo;
