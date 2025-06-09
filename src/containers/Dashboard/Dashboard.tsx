import GreetingComponent from "@/components/GreetingComponent/GreetingComponent";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import DashboardStats from "../DashboardStats/DashboardStats";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <DashboardLayout header="Dashboard" className={classes.container}>
      <GreetingComponent />
      <DashboardStats />
    </DashboardLayout>
  );
};

export default Dashboard;
