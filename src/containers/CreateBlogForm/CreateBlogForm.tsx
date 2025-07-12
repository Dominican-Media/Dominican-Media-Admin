import Button from "@/components/Button/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import TextArea from "@/components/Textarea/Textarea";
import { blogItemType } from "@/utilities/types";
import { useState } from "react";
import classes from "./CreateBlogForm.module.css";

const CreateBlogForm = () => {
  // States
  const [data, setData] = useState<blogItemType>({
    image: "",
    title: "",
    caption: "",
    category: [],
    type: "",
    content: "",
    facebookUrl: "",
    xUrl: "",
    instagramUrl: "",
  });

  return (
    <section className={classes.container}>
      <form>
        <Input label="Post Title" tip="Somethung catch and unique" />
        <TextArea label="Post Description" />
        <Dropdown
          label="Select a Post Category"
          options={["Our Lady", "The Church", "Pope"]}
        />
        <Button>Create a new category</Button>
        <TextArea label="Post Body" />
      </form>
    </section>
  );
};

export default CreateBlogForm;
