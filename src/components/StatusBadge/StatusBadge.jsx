import React from "react";
import "./StatusBadge.scss";

const StatusBadge = ({ status, type = "result" }) => {
  const getStatusType = (status, type) => {
    // Special case for "Verified" status
    if (status === "Verified") {
      return "verified";
    }

    if (type === "result") {
      switch (status?.toLowerCase()) {
        case "positive":
        case "detected":
          return "positive";
        case "negative":
        case "not detected":
          return "negative";
        case "immune":
          return "negative";
        case "not immune":
          return "positive";
        case "indeterminate":
          return "indeterminate";
        case "numeric":
          return "numeric";
        default:
          return "indeterminate";
      }
    }

    if (type === "validity") {
      switch (status?.toLowerCase()) {
        case "current":
        case "valid":
        case "up to date":
          return "negative"; // Using negative style as it's green
        case "outdated":
        case "expired":
        case "testing recommended":
          return "indeterminate";
        default:
          return "indeterminate";
      }
    }

    return "indeterminate";
  };

  const statusType = getStatusType(status, type);

  return (
    <span className={`status-badge status-badge--${statusType}`}>{status}</span>
  );
};

export default StatusBadge;
