import { useState, useEffect } from "react";
import { ArrowLeft, TestTubeDiagonal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Reminders.scss";

const getTrueLatestTestDate = (records) => {
  if (!records || records.length === 0) return null;

  const allDates = records.flatMap((record) =>
    record.results.map((result) => new Date(record.test_date))
  );

  return allDates.length > 0 ? new Date(Math.max(...allDates)) : null;
};

const Reminders = () => {
  const navigate = useNavigate();
  const [selectedRisk, setSelectedRisk] = useState("moderate");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reminder, setReminder] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [nextTestDate, setNextTestDate] = useState(null);
  const [lastTestDate, setLastTestDate] = useState(null);
  const [records, setRecords] = useState([]);

  const baseUrl = import.meta.env.VITE_API_URL;
  const userID = import.meta.env.VITE_USER_ID;

  const riskLevels = [
    {
      id: "lower",
      label: "Lower Risk",
      description:
        "Long-term monogamous relationship with tested partner, consistent barrier use",
      recommendation: "Test every 1-2 years",
      note: "Situation changes? Test sooner.",
      frequencies: [
        { value: "every_365_days", label: "Every year" },
        { value: "every_730_days", label: "Every 2 years" },
      ],
      minInterval: 365,
    },
    {
      id: "moderate",
      label: "Moderate Risk",
      description: "Occasional new partners or inconsistent barrier use",
      recommendation: "Test every 6-12 months",
      note: "Regular testing recommended",
      frequencies: [
        { value: "every_180_days", label: "Every 6 months" },
        { value: "every_365_days", label: "Every year" },
      ],
      minInterval: 180,
    },
    {
      id: "higher",
      label: "Higher Risk",
      description:
        "Multiple partners, infrequent barrier use, or history of STIs",
      recommendation: "Test every 3-6 months",
      note: "Frequent testing recommended",
      frequencies: [
        { value: "every_90_days", label: "Every 3 months" },
        { value: "every_180_days", label: "Every 6 months" },
      ],
      minInterval: 90,
    },
  ];

  const getCurrentRiskLevel = () => {
    return riskLevels.find((risk) => risk.id === selectedRisk);
  };

  const getRecommendedDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (!lastTestDate) {
      return {
        date: tomorrow,
        isOverdue: false,
        message: "Welcome! We recommend getting your first test soon.",
      };
    }

    try {
      const testDate = new Date(lastTestDate);
      if (isNaN(testDate.getTime())) {
        throw new Error("Invalid last test date");
      }

      const riskLevel = getCurrentRiskLevel();
      const maxInterval = parseInt(
        riskLevel.frequencies[1].value.match(/\d+/)[0]
      );
      const maxAllowedDate = new Date(testDate);
      maxAllowedDate.setDate(testDate.getDate() + maxInterval);

      if (today > maxAllowedDate) {
        return {
          date: tomorrow,
          isOverdue: true,
          message: `Your last test was over ${
            maxInterval / 365 >= 1
              ? `${maxInterval / 365} year(s)`
              : `${maxInterval / 30} month(s)`
          } ago. We recommend testing as soon as possible.`,
        };
      }

      const recommendedDate = new Date(testDate);
      recommendedDate.setDate(testDate.getDate() + riskLevel.minInterval);

      if (recommendedDate < tomorrow) {
        return {
          date: tomorrow,
          isOverdue: true,
          message:
            "You're due for a test. We recommend testing as soon as possible.",
        };
      }

      return {
        date: recommendedDate,
        isOverdue: false,
        message: `Based on your risk level, we recommend testing by ${recommendedDate.toLocaleDateString(
          "en-US",
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          }
        )}`,
      };
    } catch (error) {
      console.error("Error calculating recommended date:", error);
      return {
        date: tomorrow,
        isOverdue: false,
        message: "Unable to calculate recommendation. Please select a date.",
      };
    }
  };

  const handleDateChange = (e) => {
    setNextTestDate(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recordsResponse = await axios.get(
          `${baseUrl}/records?user_id=${userID}`
        );
        setRecords(recordsResponse.data || []);

        const latestDate = getTrueLatestTestDate(recordsResponse.data);
        if (latestDate) {
          setLastTestDate(latestDate);
        }

        const reminderResponse = await axios.get(
          `${baseUrl}/reminders/${userID}/reminders`
        );

        if (reminderResponse.data && reminderResponse.data.length > 0) {
          const activeReminder =
            reminderResponse.data.find((r) => r.is_active) ||
            reminderResponse.data[0];
          setReminder(activeReminder);

          const freq = activeReminder.frequency;
          if (freq.includes("365") || freq.includes("730")) {
            setSelectedRisk("lower");
          } else if (freq.includes("180")) {
            setSelectedRisk("moderate");
          } else {
            setSelectedRisk("higher");
          }

          if (activeReminder.next_test_date) {
            const reminderDate = new Date(activeReminder.next_test_date);
            if (!isNaN(reminderDate.getTime())) {
              setNextTestDate(reminderDate.toISOString().slice(0, 10));
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load your data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, userID]);

  useEffect(() => {
    if (lastTestDate) {
      const recommendation = getRecommendedDate();
      const nextDate = recommendation.date;
      setNextTestDate(nextDate.toISOString().slice(0, 10));
    }
  }, [selectedRisk]);

  const handleSaveSettings = async () => {
    setSaving(true);
    setError("");
    setSaveSuccess(false);

    try {
      const currentRiskLevel = getCurrentRiskLevel();
      const reminderData = {
        frequency: currentRiskLevel.frequencies[0].value,
        next_test_date: nextTestDate,
        is_active: 1,
        last_notified_date: null,
      };

      if (reminder?.id) {
        await axios.put(
          `${baseUrl}/reminders/${userID}/reminders/${reminder.id}`,
          reminderData
        );
      } else {
        await axios.post(
          `${baseUrl}/reminders/${userID}/reminders`,
          reminderData
        );
      }

      setSaveSuccess(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error saving reminder:", error.response || error);
      setError(
        `Failed to save your reminder settings: ${
          error.response?.data?.error || error.message
        }`
      );
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="reminders__loading">Loading...</div>;
  }

  const recommendationInfo = getRecommendedDate();

  return (
    <div className="reminders">
      <header className="reminders__header">
        <button className="reminders__back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          <span className="reminders__title">Testing Reminders</span>
        </button>
      </header>

      <div className="reminders__content">
        {error && <div className="reminders__error">{error}</div>}
        {saveSuccess && (
          <div className="reminders__success">
            Testing schedule successfully updated!
          </div>
        )}

        <div className="reminders__last-test">
          <div className="reminders__test-icon">
            <TestTubeDiagonal size={28} />
          </div>
          <div className="reminders__test-info">
            <span className="reminders__test-label">Last Test Date</span>
            <span className="reminders__test-date">
              {lastTestDate
                ? lastTestDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "No previous tests"}
            </span>
          </div>
        </div>

        <div className="reminders__risk-section">
          <h2 className="reminders__section-title">
            Personalized Testing Guidance
          </h2>
          <p className="reminders__section-description">
            Choose a testing schedule based on your risk level. Select the
            description that best fits you for a general recommendation.
          </p>

          <div className="reminders__risk-levels">
            {riskLevels.map((risk) => (
              <div key={risk.id} className="reminders__risk-option">
                <label className="reminders__risk-label">
                  <input
                    type="radio"
                    name="risk-level"
                    value={risk.id}
                    checked={selectedRisk === risk.id}
                    onChange={(e) => setSelectedRisk(e.target.value)}
                    className="reminders__risk-input"
                  />
                  <div className="reminders__risk-content">
                    <h3 className="reminders__risk-title">{risk.label}</h3>
                    <p className="reminders__risk-description">
                      {risk.description}
                    </p>
                    <p className="reminders__risk-recommendation">
                      {risk.recommendation}
                    </p>
                    <p className="reminders__risk-note">{risk.note}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="reminders__schedule-section">
          <div className="reminders__date-field">
            <label className="reminders__field-label">Next Test Date</label>
            <div className="reminders__date-input-wrapper">
              <span className="reminders__test-date">
                <input
                  type="date"
                  className="reminders__date-input"
                  value={nextTestDate || ""}
                  onChange={handleDateChange}
                  min={new Date().toISOString().slice(0, 10)}
                  placeholder="mm/dd/yyyy"
                />
              </span>

              <span
                className={`reminders__date-recommended ${
                  recommendationInfo.isOverdue
                    ? "reminders__date-recommended--overdue"
                    : ""
                }`}
              >
                {recommendationInfo.message}
              </span>
            </div>
          </div>
        </div>

        <button
          className="reminders__save"
          onClick={handleSaveSettings}
          disabled={saving || !nextTestDate}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
};

export default Reminders;
