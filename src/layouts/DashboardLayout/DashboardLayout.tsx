import DashboardHeader from "@/containers/DashboardHeader/DashboardHeader";
import classes from "./DashboardLayout.module.css";
import DashboardSideNav from "@/containers/DashboardSideNav/DashboardSideNav";

type DashboardLayout = {
  children: React.ReactNode;
  className?: string;
  header: string;
  button?: {
    text: string;
    action: () => void;
    icon?: React.ReactNode;
  };
  noSideNav?: boolean;
};

const DashboardLayout = ({
  children,
  className,
  header,
  button,
  noSideNav,
}: DashboardLayout) => {
  return (
    <main className={classes.container}>
      {!noSideNav && <DashboardSideNav />}

      <section>
        <DashboardHeader header={header} button={button} />
        <section className={className}>{children}</section>
      </section>
    </main>
  );
};

export default DashboardLayout;
