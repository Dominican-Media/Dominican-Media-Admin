import SummaryCard from "@/components/SummaryCard/SummaryCard";
import classes from "../ProfilesStats/ProfilesStats.module.css";

const DashboardStats = () => {
  return (
    <section className={classes.container}>
      <SummaryCard title="Blog Interactions this week" amount={10} />
      <SummaryCard title="Services" amount={10} />
      <SummaryCard title="Shows" amount={10} />
      <SummaryCard title="Profiles" amount={10} />
    </section>
  );
};

export default DashboardStats;
