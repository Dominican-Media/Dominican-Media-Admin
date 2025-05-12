"use client";

import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import Button from "../Button/Button";
import classes from "./ShowCard.module.css";

type ShowCardTypes = {
  title: string;
  description?: string;
  image: string;
  buttonText?: string;
  buttonAction?: () => void;
};

const ShowCard = ({
  title,
  description,
  image,
  buttonText,
  buttonAction,
}: ShowCardTypes) => {
  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();

  return (
    <div
      className={classes.container}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={classes.gradient}></div>
      <div className={classes.textSection}>
        <h4>{title}</h4>
        {description && <p>{description}</p>}
        <Button
          type="secondary"
          onClick={() => {
            if (buttonAction) {
              buttonAction();
            }

            updateSearchParams("show", encodeURIComponent(title), "set");
          }}
        >
          <span>{buttonText || "More Details"}</span>
        </Button>
      </div>
    </div>
  );
};

export default ShowCard;
