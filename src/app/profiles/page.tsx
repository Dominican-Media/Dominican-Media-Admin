import Loader from "@/components/Loader/Loader";
import RequireAuth from "@/components/RequireAuth/RequireAuth";
import Profiles from "@/containers/Profiles/Profiles";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RequireAuth>
        <Profiles />
      </RequireAuth>
    </Suspense>
  );
};

export default page;
