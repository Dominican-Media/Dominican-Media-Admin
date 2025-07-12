import Loader from "@/components/Loader/Loader";
import RequireAuth from "@/components/RequireAuth/RequireAuth";
import Services from "@/containers/Services/Services";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RequireAuth>
        <Services />
      </RequireAuth>
    </Suspense>
  );
};

export default page;
