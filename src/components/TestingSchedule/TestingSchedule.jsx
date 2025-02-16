import "./TestingSchedule.scss";

const TestingSchedule = () => {
  return (
    <div className="schedule">
      <h3 className="schedule__title">Testing Schedule</h3>
      <div className="schedule__next-test">
        <div className="schedule__date-info">
          <h4 className="schedule__label">Next Test Due</h4>
          <p className="schedule__date">April 15, 2025</p>
        </div>
        <button className="schedule__calendar-icon">
          {/* Calendar icon */}
        </button>
      </div>

      <div className="schedule__reminder">
        <span className="schedule__reminder-icon">{/* Clock icon */}</span>
        <p className="schedule__reminder-text">
          Reminder set for April 1, 2025
        </p>
      </div>

      <button className="schedule__modify">Modify Schedule</button>
    </div>
  );
};

export default TestingSchedule;
