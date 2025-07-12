import RequireAuth from "@/components/RequireAuth/RequireAuth";
import CreateBlogItem from "@/containers/CreateBlogItem/CreateBlogItem";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <RequireAuth>
        <CreateBlogItem />
      </RequireAuth>
    </Suspense>
  );
};

export default page;
