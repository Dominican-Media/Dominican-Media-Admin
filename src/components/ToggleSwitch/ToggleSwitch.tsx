import React from "react";
import classes from "./ToggleSwitch.module.css";

type ToggleSwitchType = {
  checked?: boolean;
  onChange?: (e: any) => void;
  name?: string;
  id?: string;
  readOnly?: boolean;
};

const ToggleSwitch = (props: ToggleSwitchType) => {
  return (
    <label className={classes.switch}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        readOnly={props.readOnly}
        name={props.name}
        id={props.id}
      />
      <span className={classes.sliderRound}></span>
    </label>
  );
};

export default ToggleSwitch;
