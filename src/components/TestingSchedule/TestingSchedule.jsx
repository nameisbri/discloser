import "./TestingSchedule.scss";
import { CalendarDays, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TestingSchedule = ({ reminder }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getRiskLevelFromFrequency = (frequencyString) => {
    if (!frequencyString) return null;

    if (frequencyString.includes("365") || frequencyString.includes("180")) {
      return "Lower risk - Testing every 1-2 years";
    } else if (frequencyString.includes("90")) {
      return "Moderate risk - Testing every 6-12 months";
    } else if (frequencyString.includes("30")) {
      return "Higher risk - Testing every 3-6 months";
    }
    return null;
  };

  const activeReminder = Array.isArray(reminder)
    ? reminder.find((r) => r.is_active === 1)
    : null;

  const getReminderDate = (nextTestDate) => {
    if (!nextTestDate) return null;
    const reminderDate = new Date(nextTestDate);
    reminderDate.setDate(reminderDate.getDate() - 14);
    return reminderDate;
  };

  const isDateValid = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };

  return (
    <div className="schedule">
      {activeReminder && isDateValid(activeReminder.next_test_date) ? (
        <>
          <div className="schedule__next-test">
            <div className="schedule__date-info">
              <h4 className="schedule__label">Next Test Due</h4>
              <p className="schedule__date">
                {formatDate(activeReminder.next_test_date)}
              </p>
            </div>
            <button
              className="schedule__calendar-icon"
              onClick={() => navigate("/reminders")}
            >
              <CalendarDays size={24} />
            </button>
          </div>

          <div className="schedule__reminder">
            <span className="schedule__reminder-icon">
              <Clock size={20} />
            </span>
            <p className="schedule__reminder-text">
              Reminder set for{" "}
              {formatDate(getReminderDate(activeReminder.next_test_date))}
            </p>
          </div>

          <div className="schedule__frequency">
            <p className="schedule__frequency-text">
              {getRiskLevelFromFrequency(activeReminder.frequency)}
            </p>
          </div>
        </>
      ) : (
        <div className="schedule__empty">
          <p className="schedule__empty-text">No testing schedule set</p>
        </div>
      )}

      <button
        className="schedule__modify"
        onClick={() => navigate("/reminders")}
      >
        {activeReminder ? "Modify Schedule" : "Set Schedule"}
      </button>
    </div>
  );
};

export default TestingSchedule;
