import "./Navigation.scss";
import { useNavigate } from "react-router-dom";

import { House, ListCheck, Send, BookOpenCheck } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item nav__item--active">
          <button href="#" className="nav__link" onClick={() => navigate("/")}>
            <span className="nav__icon">
              <House />
            </span>
            Home
          </button>
          <button
            href="#"
            className="nav__link"
            onClick={() => navigate("/results")}
          >
            <span className="nav__icon">
              <ListCheck />
            </span>
            History
          </button>
          <button
            href="#"
            className="nav__link"
            onClick={() => navigate("/share")}
          >
            <span className="nav__icon">
              <Send />
            </span>
            Share
          </button>
          <button
            href="#"
            className="nav__link"
            onClick={() => navigate("/learn")}
          >
            <span className="nav__icon">
              <BookOpenCheck />
            </span>
            Learn
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
