"use client";

import { useState } from "react";
import classes from "./Textarea.module.css";

type TextAreaProps = {
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  value?: string;
  isRequired?: boolean;
  errorMessage?: string;
  inValidCondition?: boolean;
  placeholder?: string;
  tip?: string;
  name?: string;
};

const TextArea = ({
  label,
  onChange,
  onBlur,
  value,
  isRequired,
  errorMessage,
  inValidCondition,
  placeholder,
  tip,
  name,
}: TextAreaProps) => {
  // States
  const [invalid, setInvalid] = useState(false);

  return (
    <div className={classes.container}>
      {label && (
        <>
          <label htmlFor="">{label}</label>
          {"  "}
          {isRequired && <span>*</span>}
        </>
      )}
      <textarea
        placeholder={placeholder}
        name={name}
        id={label}
        onChange={onChange}
        onBlur={(e) => {
          if (isRequired && e.target.value === "") {
            setInvalid(true);
          } else {
            setInvalid(false);
          }
          if (onBlur) onBlur();
        }}
        value={value}
        className={invalid ? classes.invalid : classes.valid}
      />
      {(invalid || inValidCondition) && (
        <span className={classes.errorMessage}>
          {errorMessage || "*invalid"}{" "}
        </span>
      )}
      {tip && <span className={classes.tip}>{tip}</span>}
    </div>
  );
};

export default TextArea;
