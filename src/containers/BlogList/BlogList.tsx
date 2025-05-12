import NewsCard from "@/components/NewsCard/NewsCard";
import { NEWS } from "@/utilities/constants";
import classes from "./BlogList.module.css";

const BlogList = () => {
  return (
    <section className={classes.container}>
      {NEWS.map((data, i) => {
        return <NewsCard key={i} {...data} />;
      })}
    </section>
  );
};

export default BlogList;
