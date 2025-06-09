import Loader from "@/components/Loader/Loader";
import CreateBlogItem from "@/containers/CreateBlogItem/CreateBlogItem";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <CreateBlogItem edit />
    </Suspense>
  );
};

export default page;
