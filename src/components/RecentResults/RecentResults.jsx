import "./RecentResults.scss";
import { useNavigate } from "react-router-dom";

const RecentResults = ({ results }) => {
  const navigate = useNavigate();
  const resultsArray = results?.results || [];

  const recentResults = resultsArray
    .sort((a, b) => new Date(b.test_date) - new Date(a.test_date))
    .slice(0, 3);

  const mostRecentDate = recentResults[0]?.test_date;

  const isUpToDate = () => {
    if (!mostRecentDate) return false;

    const lastTestDate = new Date(mostRecentDate);
    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    return lastTestDate >= threeMonthsAgo;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusClass = (result) => {
    switch (result) {
      case "Positive":
      case "Detected":
        return "positive";
      case "Negative":
      case "Not Detected":
        return "negative";
      case "Immune":
        return "positive";
      case "Not Immune":
        return "negative";
      case "Indeterminate":
        return "indeterminate";
      case "Numeric":
        return "numeric";
      default:
        return "indeterminate";
    }
  };

  return (
    <div className="results">
      {mostRecentDate && (
        <div className="results__date">
          <span className="results__date-text">
            {formatDate(mostRecentDate)}
          </span>
          <span
            className={`results__status results__status--${
              isUpToDate() ? "current" : "outdated"
            }`}
          >
            {isUpToDate() ? "Up to date" : "Testing recommended"}
          </span>
        </div>
      )}

      <div className="results__list">
        {recentResults.map((result, index) => (
          <div key={index} className="result-item">
            <div className="result-item__header">
              <h4 className="result-item__title">{result.test_type}</h4>
              <span
                className={`result-item__status result-item__status--${getStatusClass(
                  result.result
                )}`}
              >
                {result.result}
              </span>
            </div>
            <p className="result-item__collection">
              Collection: {formatDate(result.test_date)}
            </p>
          </div>
        ))}
      </div>

      <button
        className="results__view-all"
        onClick={() => navigate("/results")}
      >
        View All Results
      </button>
    </div>
  );
};

export default RecentResults;
