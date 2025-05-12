import Loader from "@/components/Loader/Loader";
import Dashboard from "@/containers/Dashboard/Dashboard";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Dashboard />
    </Suspense>
  );
};

export default page;
