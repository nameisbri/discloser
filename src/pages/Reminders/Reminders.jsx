import "./Reminders.scss";
import { TestTubeDiagonal, Clock } from "lucide-react";

function Reminders() {
  return (
    <div className="reminders">
      <header className="reminders__header">
        {/* Back Arrow (You'll likely need to import an icon component or use SVG) */}
        <span className="reminders__back-arrow">←</span>
        <h1 className="reminders__title">Testing Reminders</h1>
      </header>

      <main className="reminders__content">
        <section className="reminders__last-test-date">
          <TestTubeDiagonal size={24} />
          <div className="reminders__last-test-date-header">
            <h2 className="reminders__last-test-date-title">
              Last Recorded Test Date
            </h2>
            <p className="reminders__last-test-date-value">Jan 15, 2025</p>
          </div>
        </section>

        <section className="reminders__guidance">
          <div className="reminders__guidance-header">
            <h2 className="reminders__guidance-title">
              Personalized Testing Guidance
            </h2>
            {/* Expand/Collapse Icon (You might want to implement state for collapse) */}
            <span className="reminders__guidance-expand-icon">▼</span>
          </div>
          <div className="reminders__guidance-content">
            {" "}
            {/* Initially, let's keep it expanded */}
            <p className="reminders__guidance-description">
              Choose a testing schedule based on your risk level. Select the
              description that best fits you for a genera recommendation.
            </p>
            <div className="reminders__risk-level-card reminders__risk-level-card--lower">
              <input
                type="radio"
                id="lowerRisk"
                name="riskLevel"
                className="reminders__risk-level-card-radio"
              />
              <label
                htmlFor="lowerRisk"
                className="reminders__risk-level-card-label"
              >
                Lower Risk
              </label>
              <p className="reminders__risk-level-card-description">
                Long-term monogamous relationship with tested partner,
                consistent barrier use
              </p>
              <p className="reminders__risk-level-card-frequency">
                Test every 1-2 years
              </p>
              <a href="#" className="reminders__risk-level-card-clinic-link">
                Find Clinic
              </a>
            </div>
            <div className="reminders__risk-level-card reminders__risk-level-card--moderate reminders__risk-level-card--selected">
              {" "}
              {/* Added --selected modifier */}
              <input
                type="radio"
                id="moderateRisk"
                name="riskLevel"
                className="reminders__risk-level-card-radio"
                defaultChecked
              />
              <label
                htmlFor="moderateRisk"
                className="reminders__risk-level-card-label"
              >
                Moderate Risk
              </label>
              <p className="reminders__risk-level-card-description">
                Occasional new partners or inconsistent barrier use
              </p>
              <p className="reminders__risk-level-card-frequency">
                Test every 6-12 months
              </p>
              <p className="reminders__risk-level-card-recommendation">
                Regular testing recommended
              </p>{" "}
              {/* Added recommendation paragraph */}
              <a href="#" className="reminders__risk-level-card-clinic-link">
                Find Clinic
              </a>
            </div>
            <div className="reminders__risk-level-card reminders__risk-level-card--higher">
              <input
                type="radio"
                id="higherRisk"
                name="riskLevel"
                className="reminders__risk-level-card-radio"
              />
              <label
                htmlFor="higherRisk"
                className="reminders__risk-level-card-label"
              >
                Higher Risk
              </label>
              <p className="reminders__risk-level-card-description">
                Multiple partners, infrequent barrier use, or history of STIs
              </p>
              <p className="reminders__risk-level-card-frequency">
                Test every 3-6 months
              </p>
              <p className="reminders__risk-level-card-recommendation">
                Frequent testing recommended
              </p>{" "}
              {/* Added recommendation paragraph */}
              <a href="#" className="reminders__risk-level-card-clinic-link">
                Find Clinic
              </a>
            </div>
          </div>
        </section>

        <section className="reminders__next-test-date">
          <h2 className="reminders__next-test-date-title">Next Test Date</h2>
          <div className="reminders__next-test-date-input-group">
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="reminders__next-test-date-input"
            />
            {/* Calendar Icon (Import or SVG) */}
            <span className="reminders__next-test-date-calendar-icon">📅</span>
          </div>
          <p className="reminders__next-test-date-notification">
            🔔 Notification will be sent on: March 1, 2025
          </p>
        </section>

        <section className="reminders__testing-frequency">
          <h2 className="reminders__testing-frequency-title">
            Testing Frequency
          </h2>
          <select className="reminders__testing-frequency-select">
            <option>Every 15 days</option>
            {/* Add more options as needed */}
          </select>
        </section>
      </main>

      <footer className="reminders__footer">
        <button className="reminders__save-settings-button">
          <span className="reminders__save-settings-icon">💾</span> Save
          Settings
        </button>
      </footer>
    </div>
  );
}

export default Reminders;
