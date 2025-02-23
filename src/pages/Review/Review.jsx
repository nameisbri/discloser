import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import EditableTestResult from "../../components/EditableTestResult/EditableTestResult";
import axios from "axios";
import "./Review.scss";

const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedResults, setEditedResults] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!location.state) {
      navigate("/upload", { replace: true });
      return;
    }
    setEditedResults(location.state.results);
  }, [location.state, navigate]);

  const { files = [], uploadDate, status, message } = location.state || {};

  const handleDelete = (recordIndex, resultId) => {
    setEditedResults((prevResults) => {
      const newResults = [...prevResults];
      const record = { ...newResults[recordIndex] };
      record.results = record.results.filter(
        (result) => result.id !== resultId
      );
      newResults[recordIndex] = record;
      return newResults;
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleConfirmClick = async () => {
    setIsSaving(true);
    try {
      const updatedRecords = editedResults.map((record) => ({
        id: record.id,
        results: record.results,
      }));

      await axios.post(`${baseUrl}/records/update`, {
        records: updatedRecords,
      });
      navigate("/results");
    } catch (error) {
      console.error("Error saving results:", error);
    } finally {
      setIsSaving(false);
    }
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

          {editedResults.map((record, index) => (
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
              </div>

              <div className="review__results">
                {record.results && record.results.length > 0 ? (
                  record.results.map((test) => (
                    <EditableTestResult
                      key={test.id}
                      test={test}
                      recordDate={record.test_date}
                      onDelete={(resultId) => handleDelete(index, resultId)}
                      disabled={!isEditing}
                    />
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
          {!isEditing ? (
            <button
              className="review__button review__button--secondary"
              onClick={handleEditClick}
            >
              Edit Results
            </button>
          ) : (
            <button
              className="review__button review__button--secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel Edit
            </button>
          )}
          <button
            className="review__button review__button--primary"
            onClick={handleConfirmClick}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Confirm & Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
