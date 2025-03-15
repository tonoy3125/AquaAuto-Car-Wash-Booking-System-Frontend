import DailyTransactions from "@/components/DailyTransactions/DailyTransactions";
import StatisticsHeading from "@/components/StatisticsHeading/StatisticsHeading";

const AdminDashboard = () => {
  return (
    <div className="mt-7 lg:mt-0 md:p-10" style={{ height: "100vh" }}>
      <StatisticsHeading />
      <DailyTransactions />
    </div>
  );
};

export default AdminDashboard;
