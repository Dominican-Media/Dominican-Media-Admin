import { generateQueryString } from "@/helpers/generateQueryString";
import { queryObjectType } from "@/utilities/types";
import useGetHook from "./useGetHook";

export const useCategories = () => {
  return useGetHook("/blogs/category/get-categories");
};

export const useBlogs = (params: queryObjectType) => {
  const baseUrl = "/blogs";
  const url = params ? generateQueryString(baseUrl, params) : baseUrl;

  return useGetHook(url);
};

export const useBlogById = (id: string) => {
  const url = id ? `/blogs/${id}` : null;

  return useGetHook(url);
};
