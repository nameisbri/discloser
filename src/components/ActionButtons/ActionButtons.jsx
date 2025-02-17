import "./ActionButtons.scss";
import { Upload, Calendar } from "lucide-react";

const ActionButtons = () => {
  return (
    <div className="action-buttons">
      <button className="action-buttons__button">
        <Upload className="action-buttons__icon" />
        <span className="action-buttons__text">Upload Results</span>
      </button>
      <button className="action-buttons__button">
        <Calendar className="action-buttons__icon" />
        <span className="action-buttons__text">Set Reminder</span>
      </button>
    </div>
  );
};

export default ActionButtons;
