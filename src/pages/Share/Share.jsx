import "./Share.scss";
import { useState, useEffect } from "react";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import defaultAvatar from "../../assets/users/avatar/default-avatar.webp";

const Share = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [shareData, setShareData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [shareFrequency, setShareFrequency] = useState("");
  const [reminder, setReminder] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL;
  const userID = import.meta.env.VITE_USER_ID;
  const minioUrl = import.meta.env.VITE_MINIO_API_URL;

  const getAvatarUrl = (filePath) => {
    if (!filePath) return defaultAvatar;

    if (filePath.startsWith("users/")) {
      return `${minioUrl}/${filePath}`;
    }

    return `${minioUrl}/users/${filePath}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateValidity = (testDate) => {
    const date = new Date(testDate);
    date.setMonth(date.getMonth() + 3);
    return formatDate(date);
  };

  const getShareableLink = () => {
    // For MVP, generate a simple link
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
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`${baseUrl}/users/${userID}`); // user hardcoded for MVP - should come from auth later on
        if (!userResponse.data) {
          throw new Error("No user data received");
        }
        setUser(userResponse.data);

        const reminderResponse = await axios.get(
          `${baseUrl}/reminders/${userResponse.data.id}/reminders`
        );
        setReminder(reminderResponse.data || []);

        if (reminderResponse.next_test_date) {
          try {
            const reminderDate = new Date(reminderResponse.next_test_date);
            if (!isNaN(reminderDate.getTime())) {
              const formattedDate = reminderDate.toISOString().slice(0, 10);
              setNextTestDate(formattedDate);
            }
          } catch (error) {
            console.error("Error parsing reminder date:", error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [baseUrl]);

  useEffect(() => {
    const fetchShareData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/share/${userID}`);
        setShareData(response.data);
      } catch (err) {
        setError("Failed to load share data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShareData();
  }, [baseUrl]);

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

  if (loading) {
    return <div className="share__loading">Loading...</div>;
  }

  if (error) {
    return <div className="share__error">{error}</div>;
  }

  const latestTestDate = shareData?.results[0]?.test_date;

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
            src={getAvatarUrl(user?.avatar_file_path)}
            alt={`${user?.name}'s avatar`}
            onError={(e) => {
              console.log(getAvatarUrl(user?.avatar_file_path));
              console.log("Image load error, using default avatar");
              e.target.src = defaultAvatar;
            }}
          />
          <div className="share__info">
            <h2 className="share__username">
              @{shareData?.screen_name}
              <span className="share__verified-wrapper">
                <BadgeCheck className="share__verified" />
                <span className="share__tooltip">
                  Results verified from official lab documents
                </span>
              </span>
            </h2>
            <StatusBadge
              status={latestTestDate ? "Valid" : "No results"}
              type="validity"
            />
          </div>
        </div>
        {latestTestDate && (
          <>
            <p className="share__date">
              Last updated: {formatDate(latestTestDate)}
            </p>
            <p className="share__frequency">
              Regular testing: {shareFrequency}
            </p>
          </>
        )}
      </header>

      <div className="share__results">
        {latestTestDate && (
          <div className="share__results-header">
            <h3 className="share__results-date">
              {formatDate(latestTestDate)}
            </h3>
            <span className="share__results-validity">
              Results valid through {calculateValidity(latestTestDate)}
            </span>
          </div>
        )}

        <div className="share__tests">
          {shareData?.results
            .sort((a, b) => {
              const dateCompare = new Date(b.test_date) - new Date(a.test_date);
              if (dateCompare !== 0) return dateCompare;

              return a.test_type.localeCompare(b.test_type);
            })
            .map((test, index) => (
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
        {/* <p className="share__expiry">Link expires in 24 hours</p> */}
        <div className="share__downloads">
          <button
            className="share__button share__button--secondary"
            onClick={() => window.print()} // Simple print for MVP
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
