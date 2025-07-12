import Loader from "@/components/Loader/Loader";
import RequireAuth from "@/components/RequireAuth/RequireAuth";
import BlogContent from "@/containers/BlogContent/BlogContent";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RequireAuth>
        <BlogContent />
      </RequireAuth>
    </Suspense>
  );
};

export default page;
