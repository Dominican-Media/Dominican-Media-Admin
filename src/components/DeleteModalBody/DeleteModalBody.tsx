import Button from "@/components/Button/Button";
import classes from "./DeleteModalBody.module.css";

type DeleteModalbodyTypes = {
  text: string;
  caption: string;
  onClose: () => void;
  onDelete: () => void;
  isLoading: boolean;
};

const DeleteModalBody = ({
  onClose,
  onDelete,
  text,
  caption,
  isLoading,
}: DeleteModalbodyTypes) => {
  return (
    <div className={classes.container}>
      <h3>{text}</h3>
      <p>{caption}</p>

      <div className={classes.buttonSection}>
        <Button type="invalid" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          type="delete"
          onClick={() => onDelete && onDelete()}
          loading={isLoading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteModalBody;
