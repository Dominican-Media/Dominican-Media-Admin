"use client";

import { blogItemType } from "@/utilities/types";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type BlogContextType = {
  blogData: blogItemType;
  setBlogData: Dispatch<SetStateAction<blogItemType>>;
  resetBlogState: () => void;
};

type BlogContextProviderType = { children: React.ReactNode };

export const BlogContext = createContext({} as BlogContextType);

function BlogContextProvider({ children }: BlogContextProviderType) {
  // States
  const [blogData, setBlogData] = useState<blogItemType>({
    image: null,
    title: "",
    caption: "",
    category: [],
    type: "",
    content: "",
    facebookUrl: "",
    xUrl: "",
    instagramUrl: "",
    description: "",
    createdAt: "",
    previewImage: null,
  });

  const resetBlogState = () => {
    setBlogData({
      image: null,
      title: "",
      caption: "",
      category: [],
      type: "",
      content: "",
      facebookUrl: "",
      xUrl: "",
      instagramUrl: "",
      description: "",
      createdAt: "",
      previewImage: null,
    });
  };

  return (
    <BlogContext.Provider
      value={{
        blogData,
        setBlogData,
        resetBlogState,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export default BlogContextProvider;
