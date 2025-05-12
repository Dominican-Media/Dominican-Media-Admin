import More from "@/assets/svgIcons/More";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import classes from "./ServicesCard.module.css";

type ServicesCardType = {
  image: string;
  title: string;
  caption: string;
  onDelete?: () => void;
};

const ServicesCard = ({
  image,
  title,
  caption,
  onDelete,
}: ServicesCardType) => {
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
      <Image src={image} alt={title} width={610} height={589} />
      <h4>{title}</h4>
      <p>{caption}</p>
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
              Edit{" "}
            </span>
            <span onClick={() => onDelete && onDelete()}>Delete </span>
          </div>
        )}
      </span>
    </div>
  );
};

export default ServicesCard;
