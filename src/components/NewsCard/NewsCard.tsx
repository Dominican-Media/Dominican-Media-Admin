"use client";

import ArrowRight from "@/assets/svgIcons/ArrowRight";
import More from "@/assets/svgIcons/More";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { routes } from "@/utilities/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import classes from "./NewsCard.module.css";

type NewsCardTypes = {
  image: string;
  title: string;
  caption: string;
  category: string;
  onDelete?: () => void;
};

const NewsCard = ({
  image,
  title,
  caption,
  category,
  onDelete,
}: NewsCardTypes) => {
  // Router
  const router = useRouter();

  // States
  const [showOptions, setShowOptions] = useState(false);

  // Hooks
  const { updateConcurrentSearchParams } = useUpdateSearchParams();

  // Ref
  const optionsRef = useRef<null | HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handledismissOptions = (e: any) => {
        if (optionsRef.current && !optionsRef.current.contains(e.target)) {
          setShowOptions(false);
        }
      };

      window.addEventListener("mousedown", handledismissOptions);

      return () => {
        window.removeEventListener("mousedown", handledismissOptions);
      };
    }
  });

  return (
    <div className={classes.container}>
      <Image height={280} width={418} src={image} alt={title} />

      <span
        className={classes.more}
        onClick={() => setShowOptions((prevState) => !prevState)}
      >
        <More />

        {showOptions && (
          <div className={classes.options} ref={optionsRef}>
            <span
              onClick={() => {
                updateConcurrentSearchParams({
                  service: { method: "set", value: "1" },
                  edit: { method: "set", value: "true" },
                });
              }}
            >
              Edit Blog Item{" "}
            </span>
            <span onClick={() => onDelete && onDelete()}>Delete </span>
          </div>
        )}
      </span>

      <div className={classes.textSection}>
        <h4>{title}</h4>
        <p>{caption}</p>
      </div>

      <div className={classes.categoryAndAction}>
        <p>{category}</p>
        <Button
          type="null"
          onClick={() => {
            router.push(`${routes.BLOG}/1`);
          }}
        >
          <ArrowRight color="#000" />
        </Button>
      </div>
    </div>
  );
};

export default NewsCard;
