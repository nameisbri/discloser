import "./Navigation.scss";

const Navigation = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item nav__item--active">
          <a href="#" className="nav__link">
            <span className="nav__icon">{/* Home icon */}</span>
            Home
          </a>
        </li>
        {/* Other nav items */}
      </ul>
    </nav>
  );
};

export default Navigation;
