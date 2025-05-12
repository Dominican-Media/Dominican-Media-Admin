import Loader from "@/components/Loader/Loader";
import Services from "@/containers/Services/Services";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Services />
    </Suspense>
  );
};

export default page;
