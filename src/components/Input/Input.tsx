"use client";

import { Dispatch, SetStateAction, useState } from "react";
import classes from "./Input.module.css";

type InputProps = {
  type?: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  value?: string;
  isRequired?: boolean;
  errorMessage?: string;
  inValidCondition?: boolean;
  placeholder?: string;
  tip?: string;
  style?: React.CSSProperties;
  name?: string;
  condition?: boolean;
  readOnly?: boolean;
  state?: string;
  setState?: Dispatch<SetStateAction<string>>;
  onKeyup?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  min?: number | string | any;
  max?: number | string;
  loading?: boolean;
};

const Input = ({
  type,
  label,
  onChange,
  onBlur,
  value,
  isRequired,
  errorMessage,
  inValidCondition,
  placeholder,
  tip,
  style,
  name,
  condition,
  readOnly,
  onKeyup,
  onFocus,
  min,
  max,
  loading,
}: InputProps) => {
  // States
  const [invalid, setInvalid] = useState(false);

  return (
    <div className={classes.container} style={style}>
      {label && (
        <>
          <label htmlFor="">{label}</label>
          {"  "}
          {isRequired && <span>*</span>}
        </>
      )}
      <span className={classes.input}>
        <input
          type={type || "text"}
          name={name}
          placeholder={placeholder}
          id={label}
          onChange={(e) => {
            onChange && onChange(e);

            if (condition !== undefined && condition === false) {
              setInvalid(true);
            } else {
              setInvalid(false);
            }
          }}
          readOnly={readOnly}
          onBlur={(e) => {
            if (onBlur) onBlur();

            if (isRequired && e.target.value === "") {
              setInvalid(true);
            } else {
              setInvalid(false);
            }
          }}
          onFocus={() => {
            if (onFocus) {
              onFocus();
            }
          }}
          value={value}
          className={invalid ? classes.invalid : classes.valid}
          onKeyUp={onKeyup}
          min={min}
          max={max}
        />
      </span>
      {(invalid || inValidCondition) && (
        <span className={classes.errorMessage}>
          {errorMessage || `Please enter a valid ${label?.toLowerCase()}`}{" "}
        </span>
      )}
      {tip && <span className={classes.tip}>{tip}</span>}
    </div>
  );
};

export default Input;
