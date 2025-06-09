"use client";

import React from "react";
import ArrowRight from "@/assets/svgIcons/ArrowRight";
import {
  CardDecoration1,
  CardDecoration2,
} from "@/assets/svgIcons/PoliciesSummaryCardDecoration";
import classes from "./SummaryCard.module.css";

type AmountDetailsCardTypes = {
  title: string;
  amount: number | string;
  cta?: {
    text: string;
    action: () => void;
  };
  notAmount?: boolean;
  backgroundColor?: string;
};

const SummaryCard = ({
  title,
  amount,
  cta,
  notAmount,
  backgroundColor,
}: AmountDetailsCardTypes) => {
  return (
    <div className={classes.container} style={{ backgroundColor }}>
      <span>{title}</span>
      <h2> {amount}</h2>
      {cta && (
        <div>
          <span>{cta.text}</span>
          <button onClick={cta.action}>
            <ArrowRight />
          </button>
        </div>
      )}
      <CardDecoration1 className={classes.decoration1} />
      <CardDecoration2 className={classes.decoration2} />
    </div>
  );
};

export default SummaryCard;
