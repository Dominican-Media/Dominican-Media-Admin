import Loader from "@/components/Loader/Loader";
import Profiles from "@/containers/Profiles/Profiles";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Profiles />
    </Suspense>
  );
};

export default page;
