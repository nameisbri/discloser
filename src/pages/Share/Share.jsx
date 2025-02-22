import "./Share.scss";
import { useState, useEffect } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import defaultAvatar from "../../assets/users/avatar/default-avatar.webp";

// Helper function to get latest result per test type
const getLatestResultsByType = (results) => {
  if (!results) return [];

  return Object.values(
    results.reduce((acc, result) => {
      const existingResult = acc[result.test_type];
      if (
        !existingResult ||
        new Date(result.test_date) > new Date(existingResult.test_date)
      ) {
        acc[result.test_type] = result;
      }
      return acc;
    }, {})
  ).sort((a, b) => {
    const dateCompare = new Date(b.test_date) - new Date(a.test_date);
    if (dateCompare !== 0) return dateCompare;
    return a.test_type.localeCompare(b.test_type);
  });
};

const Share = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [latestResults, setLatestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [shareFrequency, setShareFrequency] = useState("");
  const [reminder, setReminder] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL;
  const userID = import.meta.env.VITE_USER_ID;
  const minioUrl = import.meta.env.VITE_MINIO_API_URL;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getShareableLink = () => {
    return `${window.location.origin}/share/${userID}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareableLink());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`${baseUrl}/users/${userID}`);
        setUser(userResponse.data);

        const shareResponse = await axios.get(`${baseUrl}/share/${userID}`);
        const sortedResults = getLatestResultsByType(
          shareResponse.data.results
        );
        setLatestResults(sortedResults);

        const reminderResponse = await axios.get(
          `${baseUrl}/reminders/${userID}/reminders`
        );
        setReminder(reminderResponse.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load share data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, userID]);

  useEffect(() => {
    if (reminder.length > 0 && reminder[0]?.frequency) {
      const freq = reminder[0].frequency;
      if (freq.search("365") !== -1 || freq.search("730") !== -1) {
        setShareFrequency("Every year");
      } else if (freq.search("180") !== -1) {
        setShareFrequency("Every 6 months");
      } else {
        setShareFrequency("Every 3 months");
      }
    }
  }, [reminder]);

  if (loading) return <div className="share__loading">Loading...</div>;
  if (error) return <div className="share__error">{error}</div>;

  const latestTestDate =
    latestResults.length > 0 ? latestResults[0].test_date : null;

  return (
    <div className="share">
      <header className="share__header">
        <button className="share__back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          <span className="share__header-title">Share Results</span>
        </button>

        <div className="share__user">
          <img
            className="user-header__avatar"
            src={defaultAvatar}
            alt={`${user?.name}'s avatar`}
          />
          <h2 className="share__username">
            @{user?.screen_name}
            <span className="share__secure-wrapper">
              <ShieldCheck className="share__secure-icon" />
              <span className="share__secure-label">Secure</span>
              <span className="share__tooltip">
                <p>
                  {" "}
                  These results were securely extracted from user-uploaded lab
                  documents.
                </p>
                <p>
                  Please note that they may be subject to processing errors.
                </p>
              </span>
            </span>
          </h2>
          <div className="share__info"></div>
          {latestTestDate && (
            <>
              <p className="share__date">
                <span>Last updated:</span>
                <span>{formatDate(latestTestDate)}</span>
              </p>

              <p className="share__frequency">
                <span> Testing schedule:</span>
                <span>{shareFrequency}</span>
              </p>
            </>
          )}
        </div>
      </header>

      <div className="share__results">
        {latestTestDate && (
          <div className="share__results-header">
            <h3 className="share__results-date">
              {formatDate(latestTestDate)}
            </h3>
          </div>
        )}

        <div className="share__tests">
          {latestResults.map((test, index) => (
            <div key={index} className="share__test">
              <div className="share__test-info">
                <h4 className="share__test-name">{test.test_type}</h4>
                <StatusBadge status={test.result} type="result" />
              </div>
              {test.notes && (
                <span className="share__test-type">
                  {test.notes.split("|").map((note, i) => (
                    <span key={i} className="share__test-note">
                      {note.trim()}
                    </span>
                  ))}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="share__actions">
        <div className="share__link">
          <input
            type="text"
            className="share__input"
            value={getShareableLink()}
            readOnly
          />
          <button
            className="share__button share__button--primary"
            onClick={handleCopyLink}
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
        <div className="share__downloads">
          <button
            className="share__button share__button--secondary"
            onClick={() => window.print()}
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
