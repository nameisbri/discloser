import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";

const EditableTestResult = ({ test, recordDate, onDelete, disabled }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to remove this test result?")) {
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      const baseUrl = import.meta.env.VITE_APP_URL;
      await axios.delete(`${baseUrl}/results/${test.id}`);
      onDelete(test.id);
    } catch (err) {
      setError("Failed to delete result");
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="review__result-card">
      <div className="review__result-header">
        <h3 className="review__test-name">{test.test_type}</h3>
        <div className="review__header-actions">
          <span className="review__verification-badge">Verified</span>
          {!disabled && (
            <button
              className="review__delete-button"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="review__result-details">
        <div className="review__detail-row">
          <span className="review__detail-label">Collection:</span>
          <span className="review__detail-value">{formatDate(recordDate)}</span>
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

        {error && <div className="review__error">{error}</div>}
      </div>
    </div>
  );
};

export default EditableTestResult;
