import "./Share.scss";

const Share = () => {
  return (
    <div className="share">
      <header className="share__header">
        <div className="share__user">
          <div className="share__avatar">{/* Avatar placeholder */}</div>
          <div className="share__info">
            <h2 className="share__username">@healthuser92</h2>
            <span className="share__badge share__badge--valid">Valid</span>
          </div>
        </div>
        <p className="share__date">Last updated: March 15, 2025</p>
        <p className="share__frequency">Regular testing: Every 3 months</p>
      </header>

      <div className="share__results">
        <div className="share__results-header">
          <h3 className="share__results-date">March 15, 2025</h3>
          <span className="share__results-validity">
            Results valid through June 15, 2025
          </span>
        </div>

        <div className="share__tests">
          {/* Example test result */}
          <div className="share__test">
            <div className="share__test-info">
              <h4 className="share__test-name">HIV-1/2 Antibody</h4>
              <span className="share__badge share__badge--success">
                Non-Reactive
              </span>
            </div>
            <span className="share__test-type">4th Generation Test</span>
          </div>
          {/* Repeat for other tests */}
        </div>
      </div>

      <div className="share__actions">
        <div className="share__link">
          <input
            type="text"
            className="share__input"
            value="https://health.share/results/2854-ja"
            readOnly
          />
          <button className="share__button share__button--primary">
            Copy Link
          </button>
        </div>
        <p className="share__expiry">Link expires in 24 hours</p>
        <div className="share__downloads">
          <button className="share__button share__button--secondary">
            Download as Image
          </button>
          <button className="share__button share__button--secondary">
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
