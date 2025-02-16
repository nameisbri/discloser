import "./RecentResults.scss";

const RecentResults = () => {
  return (
    <div className="results">
      <h3 className="results__title">Recent Results</h3>
      <div className="results__date">
        <span className="results__date-text">January 15, 2025</span>
        <span className="results__status results__status--current">
          Up to date
        </span>
      </div>

      <div className="results__list">
        <div className="result-item">
          <div className="result-item__header">
            <h4 className="result-item__title">HIV</h4>
            <span className="result-item__status result-item__status--negative">
              Non-reactive
            </span>
          </div>
          <p className="result-item__collection">Collection: Jan 15, 2025</p>
        </div>

        {/* More result items */}
      </div>

      <button className="results__view-all">View All Results</button>
    </div>
  );
};

export default RecentResults;
