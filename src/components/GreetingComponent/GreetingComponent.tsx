"use client";

import { capitalize } from "@/helpers/capitalize";
import classes from "./GreetingComponent.module.css";
import { useContext } from "react";

const GreetingComponent = () => {
  //   Context

  const getCurrentHours = () => {
    const date = new Date();
    const hours = date.getHours();

    if (hours > 0 && hours < 12) {
      return <p>Good morning ⛅️</p>;
    } else if (hours >= 12 && hours < 17) {
      return <p>Good afternoon 🌤️</p>;
    } else if (hours >= 17) {
      return <p>Good evening 🌙</p>;
    }
  };

  return (
    <section className={classes.container}>
      {getCurrentHours()}
      <h4>{capitalize("Padre")}</h4>
    </section>
  );
};

export default GreetingComponent;
