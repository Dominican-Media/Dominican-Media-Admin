import SummaryCard from "@/components/SummaryCard/SummaryCard";
import classes from "./ProfilesStats.module.css";

const ProfilesStats = () => {
  return (
    <section className={classes.container}>
      <SummaryCard title="All Users" amount={10} />
      <SummaryCard title="Admins" amount={10} />
      <SummaryCard title="Authors" amount={10} />
      <SummaryCard title="Presenters" amount={10} />
    </section>
  );
};

export default ProfilesStats;
