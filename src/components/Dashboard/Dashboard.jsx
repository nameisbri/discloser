import "./Dashboard.scss";

import UserHeader from "../UserHeader/UserHeader";
import ActionButtons from "../ActionButtons/ActionButtons";
import RecentResults from "../RecentResults/RecentResults";
import TestingSchedule from "../TestingSchedule/TestingSchedule";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <UserHeader className="dashboard__header" />
      <ActionButtons className="dashboard__actions" />
      <RecentResults className="dashboard__results" />
      <TestingSchedule className="dashboard__schedule" />
    </div>
  );
};

export default Dashboard;
