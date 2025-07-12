import Loader from "@/components/Loader/Loader";
import RequireAuth from "@/components/RequireAuth/RequireAuth";
import Blogs from "@/containers/Blogs/Blogs";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RequireAuth>
        <Blogs />
      </RequireAuth>
    </Suspense>
  );
};

export default page;
