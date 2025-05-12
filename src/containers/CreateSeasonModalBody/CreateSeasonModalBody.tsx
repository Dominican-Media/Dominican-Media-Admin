import Close from "@/assets/svgIcons/Close";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import TextArea from "@/components/Textarea/Textarea";
import { ChevronLeft } from "@mui/icons-material";
import { useState } from "react";
import classes from "./CreateSeasonModalBody.module.css";

type CreateSeasonModalBodyTypes = {
  onGoBack: () => void;
};

const CreateSeasonModalBody = ({ onGoBack }: CreateSeasonModalBodyTypes) => {
  // States
  const [episodes, setEpisodes] = useState([
    {
      title: "One",
      url: "",
      description: "",
    },
  ]);

  return (
    <div className={classes.container}>
      <h2
        onClick={() => {
          onGoBack();
        }}
      >
        <ChevronLeft />
        <span>Season 4</span>
      </h2>

      <form>
        {episodes?.map((data, i) => {
          return (
            <div className={classes.episode}>
              <Close
                fill="#cb1f27"
                onClick={() => {
                  setEpisodes((prevState) => {
                    const updatedState = [...prevState];

                    const newFiltered = updatedState.filter((data) => {
                      return updatedState[i] !== data;
                    });

                    return newFiltered;
                  });
                }}
              />
              <h4>Episode {i + 1}</h4>
              <Input label="Episode Name" />
              <Input label="Episode URL" />
              <TextArea label="Episode Description" />
            </div>
          );
        })}

        <Button
          onClick={(e) => {
            e.preventDefault();
            setEpisodes((prevState) => {
              return [
                ...prevState,
                {
                  title: "",
                  url: "",
                  description: "",
                },
              ];
            });
          }}
          type="dashed"
        >
          Add New Episode
        </Button>
      </form>

      <div className={classes.buttonSection}>
        <Button type="bordered" onClick={onGoBack}>
          Close
        </Button>
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default CreateSeasonModalBody;
