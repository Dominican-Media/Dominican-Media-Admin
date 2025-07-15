"use client";

import ArrowRight from "@/assets/svgIcons/ArrowRight";
import More from "@/assets/svgIcons/More";
import { capitalize } from "@/helpers/capitalize";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { IMAGES } from "@/utilities/constants";
import { routes } from "@/utilities/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import classes from "./NewsCard.module.css";

type NewsCardTypes = {
  image: string | File | null;
  title: string;
  description: string;
  onDelete?: (slug: string) => void;
  slug?: string;
  type?: string;
};

const NewsCard = ({
  image,
  title,
  description,
  onDelete,
  slug,
  type,
}: NewsCardTypes) => {
  // Router
  const router = useRouter();

  // States
  const [showOptions, setShowOptions] = useState(false);

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
      <Image
        height={280}
        width={418}
        src={(image as string) || IMAGES.LOGO}
        alt={title}
      />

      <span
        className={classes.more}
        onClick={() => setShowOptions((prevState) => !prevState)}
      >
        <More />

        {showOptions && (
          <div className={classes.options} ref={optionsRef}>
            <span
              onClick={() => {
                router.push(`/blog/${slug}/edit`);
              }}
            >
              Edit Blog Item{" "}
            </span>
            <span onClick={() => onDelete && onDelete(slug as string)}>
              Delete{" "}
            </span>
          </div>
        )}
      </span>

      <div className={classes.textSection}>
        <h4>{title || "No title"}</h4>
        <p> {description || "No description"}</p>
      </div>

      <div className={classes.categoryAndAction}>
        <p className={classes[type as string]}>
          {capitalize(type as string) || "No type"}
        </p>
        <Button
          type="null"
          onClick={() => {
            router.push(`${routes.BLOG}/${slug}`);
          }}
        >
          <ArrowRight color="#000" />
        </Button>
      </div>
    </div>
  );
};

export default NewsCard;
