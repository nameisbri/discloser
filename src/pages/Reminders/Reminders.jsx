import { useState, useEffect } from "react";
import { ArrowLeft, TestTubeDiagonal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Reminders.scss";

const Reminders = () => {
  const navigate = useNavigate();
  const [selectedRisk, setSelectedRisk] = useState("moderate");
  const [nextTestDate, setNextTestDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reminder, setReminder] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const baseUrl = import.meta.env.VITE_APP_URL;
  const userId = "54"; // This should come from your auth context

  // Format a date as YYYY-MM-DD
  const formatDateForInput = (date) => {
    return date.toISOString().split("T")[0];
  };

  const riskLevels = [
    {
      id: "lower",
      label: "Lower Risk",
      description:
        "Long-term monogamous relationship with tested partner, consistent barrier use",
      recommendation: "Test every 1-2 years",
      note: "Situation changes? Test sooner.",
      frequencies: [
        { value: "every_180_days", label: "Every 6 months" },
        { value: "every_365_days", label: "Every year" },
      ],
      minInterval: 180, // days
    },
    {
      id: "moderate",
      label: "Moderate Risk",
      description: "Occasional new partners or inconsistent barrier use",
      recommendation: "Test every 6-12 months",
      note: "Regular testing recommended",
      frequencies: [
        { value: "every_90_days", label: "Every 3 months" },
        { value: "every_180_days", label: "Every 6 months" },
      ],
      minInterval: 90,
    },
    {
      id: "higher",
      label: "Higher Risk",
      description:
        "Multiple partners, infrequent barrier use, or history of STIs",
      recommendation: "Test every 3-6 months",
      note: "Frequent testing recommended",
      frequencies: [
        { value: "every_30_days", label: "Monthly" },
        { value: "every_90_days", label: "Every 3 months" },
      ],
      minInterval: 30,
    },
  ];

  // Get current risk level configuration
  const getCurrentRiskLevel = () => {
    return riskLevels.find((risk) => risk.id === selectedRisk);
  };

  // Set min date for the date picker (tomorrow)
  const getRecommendedDate = () => {
    const lastTestDate = new Date("2025-01-15"); // This should come from your records
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    let recommendedDate;
    if (lastTestDate < sixMonthsAgo) {
      // If last test was more than 6 months ago, recommend tomorrow
      recommendedDate = tomorrow;
    } else {
      // Calculate based on risk level frequency
      recommendedDate = new Date(lastTestDate);
      const riskLevel = getCurrentRiskLevel();
      const days = parseInt(riskLevel.frequencies[0].value.match(/\d+/)[0]);
      recommendedDate.setDate(lastTestDate.getDate() + days);

      // If the calculated date is in the past, recommend tomorrow instead
      if (recommendedDate < tomorrow) {
        recommendedDate = tomorrow;
      }
    }

    return recommendedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDateConstraints = () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 1); // Minimum next day

    return {
      min: minDate.toISOString().split("T")[0],
    };
  };

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/reminders/${userId}/reminders`
        );
        if (response.data && response.data.length > 0) {
          const activeReminder =
            response.data.find((r) => r.is_active) || response.data[0];
          setReminder(activeReminder);

          // Determine risk level based on frequency
          const freq = activeReminder.frequency;
          if (freq.includes("365") || freq.includes("180")) {
            setSelectedRisk("lower");
          } else if (freq.includes("90")) {
            setSelectedRisk("moderate");
          } else {
            setSelectedRisk("higher");
          }

          // Set the next test date from the database
          setNextTestDate(
            activeReminder.next_test_date
              ? new Date(activeReminder.next_test_date)
                  .toISOString()
                  .split("T")[0]
              : null
          );
        }
      } catch (error) {
        console.error("Error fetching reminders:", error);
        setError("Failed to load your reminder settings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, [baseUrl, userId]);

  const handleSaveSettings = async () => {
    setSaving(true);
    setError("");
    setSaveSuccess(false);

    try {
      const formatDateForDB = (dateString) => {
        if (!dateString) return null;
        return dateString.split("T")[0];
      };

      const currentRiskLevel = getCurrentRiskLevel();
      const reminderData = {
        frequency: currentRiskLevel.frequencies[0].value, // Use first frequency option
        next_test_date: formatDateForDB(nextTestDate),
        is_active: 1,
        last_notified_date: null,
      };

      if (reminder?.id) {
        await axios.put(
          `${baseUrl}/reminders/${userId}/reminders/${reminder.id}`,
          reminderData
        );
      } else {
        await axios.post(
          `${baseUrl}/reminders/${userId}/reminders`,
          reminderData
        );
      }

      setSaveSuccess(true);
      // Delay navigation to show success message
      setTimeout(() => {
        navigate("/");
      }, 1500);
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

  const dateConstraints = getDateConstraints();
  const currentRiskLevel = getCurrentRiskLevel();

  return (
    <div className="reminders">
      <header className="reminders__header">
        <button className="reminders__back" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          <span>Testing Reminders</span>
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
            <span className="reminders__test-date">Jan 15, 2025</span>
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
              <input
                type="date"
                className="reminders__date-input"
                value={nextTestDate || ""}
                onChange={(e) => setNextTestDate(e.target.value)}
                min={dateConstraints.min}
                placeholder="mm/dd/yyyy"
              />
              <span className="reminders__date-recommended">
                Recommended: {getRecommendedDate()}
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
