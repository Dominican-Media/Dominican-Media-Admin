import Shows from "@/containers/Shows/Shows";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Shows />
    </Suspense>
  );
};

export default page;
