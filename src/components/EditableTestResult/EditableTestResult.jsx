import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";
import StatusBadge from "../StatusBadge/StatusBadge";
import Modal from "../Modal/Modal";

const EditableTestResult = ({
  test,
  recordDate,
  onDelete,
  disabled,
  recordIndex,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      if (typeof recordIndex !== "undefined") {
        onDelete(recordIndex, test.id);
      } else {
        await axios.delete(`${baseUrl}/results/${test.id}`);
        onDelete(test.id);
      }
    } catch (err) {
      setError("Failed to delete result");
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
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
    <>
      <div className="review__result-card">
        <div className="review__result-header">
          <h3 className="review__test-name">{test.test_type}</h3>
          <div className="review__header-actions">
            {!disabled && (
              <button
                className="review__delete-button"
                onClick={() => setShowDeleteModal(true)}
                disabled={isDeleting}
                aria-label="Delete result"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="review__result-details">
          <div className="review__detail-row">
            <span className="review__detail-label">Collection:</span>
            <span className="review__detail-value">
              {formatDate(recordDate)}
            </span>
          </div>

          <div className="review__detail-row">
            <span className="review__detail-label">Result:</span>
            <StatusBadge status={test.result} type="result" />
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Test Result"
        message="Are you sure you want to delete this test result? This action cannot be undone."
      >
        <div className="modal__actions">
          <button
            className="modal__button modal__button--secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="modal__button modal__button--danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EditableTestResult;
