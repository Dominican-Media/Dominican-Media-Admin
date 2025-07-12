import Loader from "@/components/Loader/Loader";
import SummaryCard from "@/components/SummaryCard/SummaryCard";
import { useUserStats } from "@/hooks/useUsers";
import classes from "./ProfilesStats.module.css";

const ProfilesStats = () => {
  // Requests
  const { isLoading, data } = useUserStats();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={classes.container}>
      <SummaryCard title="All Users" amount={data?.data?.allUsers} />
      <SummaryCard title="Admins" amount={data?.data?.admins} />
      <SummaryCard title="Authors" amount={data?.data?.authors} />
      <SummaryCard title="Presenters" amount={data?.data?.presenters} />
    </section>
  );
};

export default ProfilesStats;
