import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import EditableTestResult from "../../components/EditableTestResult/EditableTestResult";
import "./Results.scss";

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const resultsPerPage = 6;
  const baseUrl = import.meta.env.VITE_API_URL;
  const userID = import.meta.env.VITE_USER_ID;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const recordsResponse = await axios.get(
          `${baseUrl}/records?user_id=${userID}`
        );

        const allResults = recordsResponse.data
          .flatMap((record) =>
            record.results.map((result) => ({
              ...result,
              test_date: record.test_date,
              record_id: record.id,
            }))
          )
          .sort((a, b) => new Date(b.test_date) - new Date(a.test_date));

        setResults(allResults);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to load test results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [baseUrl]);

  const handleDelete = async (testId) => {
    setResults(results.filter((result) => result.id !== testId));
  };

  // Pagination calculations
  const totalPages = Math.ceil(results.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = results.slice(startIndex, endIndex);

  if (loading) {
    return <div className="results-page__loading">Loading...</div>;
  }

  if (error) {
    return <div className="results-page__error">{error}</div>;
  }

  return (
    <div className="results-page">
      <header className="results-page__header">
        <nav className="results-page__nav">
          <button
            className="results-page__back-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            <span className="results-page__header-title">Health Resources</span>
          </button>
        </nav>
        <p className="results-page__subtitle">
          Showing {startIndex + 1}-{Math.min(endIndex, results.length)} of{" "}
          {results.length} results
        </p>
      </header>
      <div className="results-page__content">
        {currentResults.length > 0 ? (
          currentResults.map((result) => (
            <EditableTestResult
              key={result.id}
              test={result}
              recordDate={result.test_date}
              onDelete={handleDelete}
            />
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
