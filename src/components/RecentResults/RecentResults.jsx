import "./RecentResults.scss";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../StatusBadge/StatusBadge";

// Helper function to get latest results by test type
const getLatestResultsByType = (results) => {
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

// Helper function to get the true latest test date
const getTrueLatestTestDate = (results) => {
  if (!results || results.length === 0) return null;
  return results.reduce((latest, current) => {
    const currentDate = new Date(current.test_date);
    return latest ? (currentDate > latest ? currentDate : latest) : currentDate;
  }, null);
};

const RecentResults = ({ results, reminder }) => {
  const navigate = useNavigate();
  const resultsArray = results?.results || [];

  const latestResults = getLatestResultsByType(resultsArray);

  const mostRecentDate = getTrueLatestTestDate(resultsArray);

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

  const testingFrequency = reminder[0]?.frequency;

  return (
    <div className="results">
      {mostRecentDate && (
        <div className="results__date">
          <span className="results__date-text">
            Recommendation: {testingFrequency}
          </span>
        </div>
      )}

      <div className="results__list">
        {latestResults.map((result, index) => (
          <div key={index} className="result-item">
            <div className="result-item__header">
              <h4 className="result-item__title">{result.test_type}</h4>
              <StatusBadge status={result.result} type="result" />
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
