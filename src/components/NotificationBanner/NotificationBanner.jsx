import { Bell } from "lucide-react";
import "./NotificationBanner.scss";

const NotificationBanner = ({ dueDate, onDismiss }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="notification">
      <div className="notification__content">
        <Bell className="notification__icon" />
        <div className="notification__text">
          <h4 className="notification__title">Testing Reminder</h4>
          <p className="notification__message">
            Your next test is due {formatDate(dueDate)}. Please schedule an
            appointment.
          </p>
        </div>
        <button onClick={onDismiss} className="notification__dismiss">
          ×
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;
