import RequireAuth from "@/components/RequireAuth/RequireAuth";
import Shows from "@/containers/Shows/Shows";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <RequireAuth>
        <Shows />
      </RequireAuth>
    </Suspense>
  );
};

export default page;
