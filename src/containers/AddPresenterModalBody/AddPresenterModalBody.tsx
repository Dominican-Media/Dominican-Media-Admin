import Button from "@/components/Button/Button";
import SmallUserCard from "@/components/SmallUserCard/SmallUserCard";
import { TEAM } from "@/utilities/constants";
import { ChevronLeft } from "@mui/icons-material";
import classes from "./AddPresenterModalBody.module.css";

type AddPresenterModalBodyTypes = {
  onGoBack: () => void;
};

const AddPresenterModalBody = ({ onGoBack }: AddPresenterModalBodyTypes) => {
  return (
    <div className={classes.container}>
      <h2
        onClick={() => {
          onGoBack();
        }}
      >
        <ChevronLeft />
        <span>Add/Edit Presenters</span>
      </h2>

      <div className={classes.presenters}>
        {[...TEAM, ...TEAM, ...TEAM].map((data) => {
          return (
            <SmallUserCard
              name={data.name}
              image={data.images}
              key={data?.name}
            />
          );
        })}
      </div>

      <div className={classes.buttonSection}>
        <Button type="bordered" onClick={onGoBack}>
          Close
        </Button>
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default AddPresenterModalBody;
