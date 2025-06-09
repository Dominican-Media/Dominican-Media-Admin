import Loader from "@/components/Loader/Loader";
import SignIn from "@/containers/SignIn/SignIn";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <SignIn />
    </Suspense>
  );
};

export default page;
