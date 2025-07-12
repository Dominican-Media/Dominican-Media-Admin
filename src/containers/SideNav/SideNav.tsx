import classes from "./SideNav.module.css";
import { dashboardRoutes } from "@/utilities/routes";
import Link from "next/link";
import Close from "@/assets/svgIcons/Close";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthUserContext } from "@/context/AuthUserContext";

type SidenavTypes = {
  onClose: () => void;
};

const Sidenav = ({ onClose }: SidenavTypes) => {
  // Router
  const router = useRouter();
  const pathname = usePathname();

  // Context
  const { user } = useContext(AuthUserContext);

  return (
    <>
      <section className={classes.container}>
        <div>
          <Close onClick={onClose} />
        </div>
        <nav>
          {dashboardRoutes
            ?.filter((data) => {
              return data?.roles?.includes(user?.role as string);
            })
            ?.map((route, i) => {
              return (
                <Link
                  key={i}
                  href={route?.route}
                  className={
                    route.route.includes(pathname)
                      ? classes.active
                      : classes.inActive
                  }
                >
                  {route?.title}
                </Link>
              );
            })}
        </nav>
      </section>
    </>
  );
};

export default Sidenav;
