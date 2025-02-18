import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./Review.scss";

const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get file details from navigation state or use defaults
  const fileDetails = location.state || {
    fileName: "Unknown File",
    uploadDate: new Date().toLocaleDateString(),
    status: "processing",
  };

  // Redirect to upload if accessed directly without file data
  useEffect(() => {
    if (!location.state) {
      navigate("/upload", { replace: true });
    }
  }, [location.state, navigate]);

  const testResults = [
    {
      name: "HIV Antibody Test",
      collectionDate: "Jan 15, 2025",
      status: "Non-reactive",
      method: "4th Gen ELISA",
      laboratory: "Quest Diagnostics",
      verified: true,
    },
    {
      name: "Hepatitis B Surface Antigen",
      collectionDate: "Jan 15, 2025",
      status: "Non-reactive",
      method: "CMIA",
      laboratory: "Quest Diagnostics",
      verified: true,
    },
  ];

  const handleEditClick = () => {
    navigate("/upload");
  };

  const handleConfirmClick = () => {
    // Here you would typically save the results
    // Then navigate to the results page or dashboard
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
          <div className="review__file-status">
            <div className="review__file-info">
              <span className="review__upload-date">
                Uploaded {fileDetails.uploadDate}
              </span>
              <h3 className="review__filename">{fileDetails.fileName}</h3>
            </div>
            <span
              className={`review__status review__status--${fileDetails.status}`}
            >
              Processing
            </span>
          </div>

          <div className="review__results">
            {testResults.map((test, index) => (
              <div key={index} className="review__result-card">
                <div className="review__result-header">
                  <h3 className="review__test-name">{test.name}</h3>
                  <span className="review__verification-badge">Verified</span>
                </div>

                <div className="review__result-details">
                  <div className="review__detail-row">
                    <span className="review__detail-label">Collection:</span>
                    <span className="review__detail-value">
                      {test.collectionDate}
                    </span>
                  </div>

                  <div className="review__detail-row">
                    <span className="review__detail-label">Result Status:</span>
                    <span className="review__detail-value review__detail-value--status">
                      {test.status}
                    </span>
                  </div>

                  <div className="review__detail-row">
                    <span className="review__detail-label">
                      Testing Method:
                    </span>
                    <span className="review__detail-value">{test.method}</span>
                  </div>

                  <div className="review__detail-row">
                    <span className="review__detail-label">Laboratory:</span>
                    <span className="review__detail-value">
                      {test.laboratory}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
