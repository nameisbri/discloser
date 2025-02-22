import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import EditableTestResult from "../../components/EditableTestResult/EditableTestResult";
import "./Results.scss";

const groupResultsByDate = (records) => {
  const allResults = records.flatMap((record) =>
    record.results.map((result) => ({
      ...result,
      test_date: record.test_date,
      record_id: record.id,
    }))
  );

  const resultsByDate = allResults.reduce((acc, result) => {
    const dateKey = new Date(result.test_date).toISOString().split("T")[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(result);
    return acc;
  }, {});

  return Object.entries(resultsByDate)
    .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
    .map(([date, results]) => ({
      date,
      results: results.sort((a, b) => a.test_type.localeCompare(b.test_type)),
    }));
};

const Results = () => {
  const navigate = useNavigate();
  const [groupedResults, setGroupedResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const resultsPerPage = 6;
  const baseUrl = import.meta.env.VITE_API_URL;
  const userID = import.meta.env.VITE_USER_ID;
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const recordsResponse = await axios.get(
          `${baseUrl}/records?user_id=${userID}`
        );

        const grouped = groupResultsByDate(recordsResponse.data);
        setGroupedResults(grouped);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to load test results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [baseUrl, userID]);

  const handleDelete = async (testId) => {
    try {
      await axios.delete(`${baseUrl}/results/${testId}`);

      setGroupedResults((prevGrouped) => {
        const newGrouped = prevGrouped
          .map((dateGroup) => ({
            ...dateGroup,
            results: dateGroup.results.filter((result) => result.id !== testId),
          }))
          .filter((dateGroup) => dateGroup.results.length > 0);

        return newGrouped;
      });
    } catch (error) {
      console.error("Error deleting result:", error);
    }
  };

  const totalPages = Math.ceil(groupedResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentDateGroups = groupedResults.slice(startIndex, endIndex);

  if (loading) {
    return <div className="results-page__loading">Loading...</div>;
  }

  if (error) {
    return <div className="results-page__error">{error}</div>;
  }

  return (
    <div className="results-page">
      <header className="results-page__header">
        <button
          className="results-page__back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
          <span className="results-page__title">Testing History</span>
        </button>
        <p className="results-page__subtitle">
          {groupedResults.length > 0 ? (
            <>
              Showing results from {formatDate(groupedResults[0].date)} to{" "}
              {formatDate(groupedResults[groupedResults.length - 1].date)}
            </>
          ) : (
            "No test results found"
          )}
        </p>
      </header>

      <div className="results-page__content">
        {currentDateGroups.length > 0 ? (
          currentDateGroups.map((dateGroup) => (
            <div key={dateGroup.date} className="results-page__date-group">
              <h3 className="results-page__date-header">
                {formatDate(dateGroup.date)}
              </h3>
              <div className="results-page__results-list">
                {dateGroup.results.map((result) => (
                  <EditableTestResult
                    key={result.id}
                    test={result}
                    recordDate={result.test_date}
                    onDelete={() => handleDelete(result.id)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="results-page__empty">
            <p>No test results found</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="results-page__pagination">
          <button
            className="results-page__pagination-button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ArrowLeft size={20} />
            Previous
          </button>

          <span className="results-page__pagination-info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="results-page__pagination-button"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Results;
