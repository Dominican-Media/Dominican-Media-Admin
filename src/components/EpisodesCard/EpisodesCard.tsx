"use client";

import ChevronDown from "@/assets/SvgIcons/ChevronDown";
import Plus from "@/assets/svgIcons/Plus";
import { useState } from "react";
import classes from "./EpisodesCard.module.css";

type EpisodesCardTypes = {
  title?: string;
  description?: string;
  edit?: boolean;
  onClick?: () => void;
};

const EpisodesCard = ({
  title,
  description,
  edit,
  onClick,
}: EpisodesCardTypes) => {
  // States
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${classes.container} ${edit && classes.edit}`}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <div
        className={classes.header}
        onClick={() => {
          setIsOpen((prevState) => !prevState);
        }}
      >
        <h4>{title}</h4>
        {edit ? <Plus fill="#000" /> : <ChevronDown />}
      </div>

      <div
        style={isOpen && !edit ? { maxHeight: "400px" } : { maxHeight: "0px" }}
        className={classes.description}
      >
        <div>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default EpisodesCard;
