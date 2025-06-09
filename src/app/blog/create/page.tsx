import CreateBlogItem from "@/containers/CreateBlogItem/CreateBlogItem";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <CreateBlogItem />
    </Suspense>
  );
};

export default page;
