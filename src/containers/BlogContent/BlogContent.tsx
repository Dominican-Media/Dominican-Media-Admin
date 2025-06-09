import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import BlogContentInfo from "../BlogContentInfo/BlogContentInfo";
import BlogContentText from "../BlogContentText/BlogContentText";
import classes from "./BlogContent.module.css";

const BlogContent = () => {
  return (
    // TODO: Add the title of the blog item to the title
    <DashboardLayout className={classes.container} header="Preview" noSideNav>
      <BlogContentInfo />
      <BlogContentText />
    </DashboardLayout>
  );
};

export default BlogContent;
