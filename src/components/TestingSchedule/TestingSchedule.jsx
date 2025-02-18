import "./TestingSchedule.scss";
import { CalendarDays, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TestingSchedule = ({ reminder }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatFrequency = (frequencyString) => {
    if (!frequencyString) return "";
    const [number, unit] = frequencyString.split("_");
    return `${number} ${unit}`;
  };

  const recentReminders = reminder
    .sort((a, b) => new Date(b.next_test_date) - new Date(a.next_test_date))
    .slice(0, 3);

  const activeReminder = Array.isArray(recentReminders)
    ? reminder.find((r) => r.is_active)
    : null;

  const getReminderDate = (nextTestDate) => {
    if (!nextTestDate) return null;
    const reminderDate = new Date(nextTestDate);
    reminderDate.setDate(reminderDate.getDate() - 14); // 2 weeks before
    return reminderDate;
  };

  return (
    <div className="schedule">
      {activeReminder ? (
        <>
          <div className="schedule__next-test">
            <div className="schedule__date-info">
              <h4 className="schedule__label">Next Test Due</h4>
              <p className="schedule__date">
                {formatDate(activeReminder.next_test_date)}
              </p>
            </div>
            <button className="schedule__calendar-icon">
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
              Testing every {formatFrequency(activeReminder.frequency)}
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
