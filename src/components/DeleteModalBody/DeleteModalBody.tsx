import Button from "@/components/Button/Button";
import classes from "./DeleteModalBody.module.css";

type DeleteModalbodyTypes = {
  text: string;
  caption: string;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteModalBody = ({
  onClose,
  onDelete,
  text,
  caption,
}: DeleteModalbodyTypes) => {
  return (
    <div className={classes.container}>
      <h3>{text}</h3>
      <p>{caption}</p>

      <div className={classes.buttonSection}>
        <Button type="invalid" onClick={onClose}>
          Cancel
        </Button>
        <Button type="delete" onClick={() => onDelete && onDelete()}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DeleteModalBody;
