import "./Dashboard.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserHeader from "../../components/UserHeader/UserHeader";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import RecentResults from "../../components/RecentResults/RecentResults";
import TestingSchedule from "../../components/TestingSchedule/TestingSchedule";
import NotificationBanner from "../../components/NotificationBanner/NotificationBanner";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [results, setResults] = useState([]);
  const [reminder, setReminder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const baseUrl = import.meta.env.VITE_API_URL;
  const userID = import.meta.env.VITE_USER_ID;

  console.log(baseUrl);
  console.log(import.meta.env.VITE_MINIO_API_URL);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`${baseUrl}/users/${userID}`);
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

  useEffect(() => {
    if (reminder && reminder.length > 0) {
      const activeReminder = reminder.find((r) => r.is_active === 1);
      if (activeReminder && activeReminder.next_test_date) {
        const nextTestDate = new Date(activeReminder.next_test_date);
        const today = new Date();
        const twoWeeksBefore = new Date(nextTestDate);
        twoWeeksBefore.setDate(twoWeeksBefore.getDate() - 14);

        const lastDismissed = localStorage.getItem("lastDismissedNotification");
        const isDismissed = lastDismissed === nextTestDate.toISOString();

        if (today >= twoWeeksBefore && today <= nextTestDate && !isDismissed) {
          setDueDate(nextTestDate);
          setShowNotification(true);
        }
      }
    }
  }, [reminder]);

  const handleDismissNotification = () => {
    setShowNotification(false);
    if (dueDate) {
      localStorage.setItem("lastDismissedNotification", dueDate.toISOString());
    }
  };

  if (loading) {
    return <div className="dashboard__loading">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard__error">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      {showNotification && dueDate && (
        <NotificationBanner
          dueDate={dueDate}
          onDismiss={handleDismissNotification}
        />
      )}
      <UserHeader user={user} records={records} />
      <ActionButtons className="dashboard__actions" />
      <div className="dashboard__content">
        <h3 className="dashboard__section-title">Recent Results</h3>
        <section className="dashboard__section">
          {results.results.length === 0 ? (
            <div className="dashboard__empty-message">
              No test results yet. Upload your results to track your progress.
              <button onClick={() => navigate("/upload")}>
                Upload Results
              </button>{" "}
              {/* Example navigation */}
            </div>
          ) : (
            <RecentResults results={results} reminder={reminder} />
          )}
        </section>

        <h3 className="dashboard__section-title">Testing Schedule</h3>

        <section className="dashboard__section">
          {reminder.length === 0 ||
          !reminder.find((r) => r.is_active === 1) ||
          !reminder[0]?.next_test_date ? (
            <div className="dashboard__empty-message">
              No future testing date set. Set a reminder to plan your next test.
              <button onClick={() => navigate("/reminders")}>
                Set Reminder
              </button>
            </div>
          ) : (
            <TestingSchedule reminder={reminder} />
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
