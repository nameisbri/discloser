import "./Dashboard.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import UserHeader from "../../components/UserHeader/UserHeader";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import RecentResults from "../../components/RecentResults/RecentResults";
import TestingSchedule from "../../components/TestingSchedule/TestingSchedule";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [results, setResults] = useState([]);
  const [reminder, setReminder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user data
        const userResponse = await axios.get(`${baseUrl}/users/54`);
        if (!userResponse.data) {
          throw new Error("No user data received");
        }
        setUser(userResponse.data);

        if (userResponse.data.id) {
          const recordsResponse = await axios.get(
            `${baseUrl}/records?user_id=${userResponse.data.id}`
          );
          setRecords(recordsResponse.data || []);

          const resultsResponse = await axios.get(
            `${baseUrl}/share/${userResponse.data.id}`
          );
          setResults(resultsResponse.data || []);

          const reminderResponse = await axios.get(
            `${baseUrl}/reminders/${userResponse.data.id}/reminders`
          );
          setReminder(reminderResponse.data || []);
        }
      } catch (error) {
        console.error("API Error:", {
          message: error.message,
          response: error.response,
          request: error.request,
          config: error.config,
        });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [baseUrl]);

  if (loading) {
    return <div className="dashboard__loading">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard__error">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <UserHeader user={user} records={records} />
      <ActionButtons className="dashboard__actions" />
      <div className="dashboard__content">
        <h3 className="dashboard__section-title">Recent Results</h3>
        <section className="dashboard__section">
          <RecentResults results={results} />
        </section>
        <h3 className="dashboard__section-title">Testing Schedule</h3>
        <section className="dashboard__section">
          <TestingSchedule reminder={reminder} />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
