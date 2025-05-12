"use client";

import { IMAGES } from "@/utilities/constants";
import { routes } from "@/utilities/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import classes from "./Logo.module.css";

const Logo = () => {
  // Router
  const router = useRouter();

  return (
    <Image
      src={IMAGES.LOGO}
      alt="Dominican Media logo"
      width={50}
      height={50}
      className={classes.logo}
      onClick={() => {
        router.push(routes.BASE_URL);
      }}
    />
  );
};

export default Logo;
