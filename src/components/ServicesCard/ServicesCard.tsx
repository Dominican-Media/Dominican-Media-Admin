import More from "@/assets/svgIcons/More";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import classes from "./ServicesCard.module.css";

type ServicesCardType = {
  image: string | File | null;
  title: string;
  description: string;
  id?: string;
  onDelete?: (id?: string) => void;
  onClick?: (id: string) => void;
  onEdit?: () => void;
};

const ServicesCard = ({
  image,
  title,
  description,
  onDelete,
  id,
  onClick,
  onEdit,
}: ServicesCardType) => {
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
    <div
      className={classes.container}
      onClick={() => onClick && onClick(id as string)}
    >
      <Image src={image as string} alt={title} width={610} height={589} />
      <h4>{title}</h4>
      <p>{description}</p>
      <span
        className={classes.more}
        onClick={() => setShowOptions((prevState) => !prevState)}
      >
        <More />

        {showOptions && (
          <div className={classes.options} ref={optionsRef}>
            <span onClick={() => onEdit && onEdit()}>Edit </span>
            <span onClick={() => onDelete && onDelete(id as string)}>
              Delete
            </span>
          </div>
        )}
      </span>
    </div>
  );
};

export default ServicesCard;
