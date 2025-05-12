import Loader from "@/components/Loader/Loader";
import Blogs from "@/containers/Blogs/Blogs";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Blogs />
    </Suspense>
  );
};

export default page;
