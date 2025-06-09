import Button from "@/components/Button/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import TextArea from "@/components/Textarea/Textarea";
import classes from "./CreateBlogForm.module.css";

const CreateBlogForm = () => {
  return (
    <section className={classes.container}>
      <form>
        <Input label="Post Title" tip="Somethung catch and unique" />
        <TextArea label="Post Description" />
        <Dropdown
          label="Select a Post Category"
          options={["Our Lady", "The Church", "Pope"]}
          //   tip="This helps users easily reference your posts"
        />
        <Button>Create a new category</Button>
        <TextArea label="Post Body" />
      </form>
    </section>
  );
};

export default CreateBlogForm;
