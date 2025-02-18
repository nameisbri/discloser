import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./Review.scss";

const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigate("/upload", { replace: true });
    }
  }, [location.state, navigate]);

  const {
    files = [],
    uploadDate,
    status,
    results = [],
    message,
  } = location.state || {};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEditClick = () => {
    navigate("/upload");
  };

  const handleConfirmClick = () => {
    navigate("/results");
  };

  return (
    <div className="review">
      <div className="review__container">
        <header className="review__header">
          <button
            className="review__back-button"
            onClick={() => navigate("/upload")}
          >
            <ArrowLeft size={20} />
            <span>Review Results</span>
          </button>
        </header>

        <div className="review__content">
          {message && <div className="review__message">{message}</div>}

          {results.map((record, index) => (
            <div key={index} className="review__file-section">
              <div className="review__file-status">
                <div className="review__file-info">
                  <span className="review__upload-date">
                    Uploaded {uploadDate}
                  </span>
                  <h3 className="review__filename">
                    {files[index]?.fileName || `File ${index + 1}`}
                  </h3>
                </div>
                <span className={`review__status review__status--${status}`}>
                  {status}
                </span>
              </div>

              <div className="review__results">
                {record.results && record.results.length > 0 ? (
                  record.results.map((test, testIndex) => (
                    <div key={testIndex} className="review__result-card">
                      <div className="review__result-header">
                        <h3 className="review__test-name">{test.test_type}</h3>
                        <span className="review__verification-badge">
                          Verified
                        </span>
                      </div>

                      <div className="review__result-details">
                        <div className="review__detail-row">
                          <span className="review__detail-label">
                            Collection:
                          </span>
                          <span className="review__detail-value">
                            {formatDate(record.test_date)}
                          </span>
                        </div>

                        <div className="review__detail-row">
                          <span className="review__detail-label">Result:</span>
                          <span className="review__detail-value review__detail-value--status">
                            {test.result}
                          </span>
                        </div>

                        {test.notes && (
                          <div className="review__detail-row">
                            <span className="review__detail-label">Notes:</span>
                            <span className="review__detail-value review__detail-value--notes">
                              {test.notes}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="review__no-results">
                    No test results found for this file
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="review__actions">
          <button
            className="review__button review__button--secondary"
            onClick={handleEditClick}
          >
            Edit Results
          </button>
          <button
            className="review__button review__button--primary"
            onClick={handleConfirmClick}
          >
            Confirm & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
