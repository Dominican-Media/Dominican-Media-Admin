import Close from "@/assets/SvgIcons/Close";
import Plus from "@/assets/svgIcons/Plus";
import Image from "next/image";
import Button from "../Button/Button";
import classes from "./SmallUserCard.module.css";

type SmallUserCardType = {
  name?: string;
  image?: string;
  onClick?: () => void;
  isEdit?: boolean;
};

const SmallUserCard = ({ name, image, onClick, isEdit }: SmallUserCardType) => {
  return (
    <div
      className={`${classes.container} ${isEdit && classes.edit}`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {!isEdit && image && <Close />}
      {isEdit && !image ? (
        <>
          <div>
            <Plus fill="#acaaaa" />
          </div>
        </>
      ) : (
        <Image
          src={image as string}
          alt={name as string}
          height={90}
          width={90}
        />
      )}
      <p>{isEdit && !image ? "Add a new presenter" : name}</p>
    </div>
  );
};

export default SmallUserCard;
