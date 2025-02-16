const UserHeader = () => {
  return (
    <div className="user-header">
      <div className="user-header__profile">
        <img
          className="user-header__avatar"
          src="avatar.jpg"
          alt="User avatar"
        />
        <div className="user-header__info">
          <h2 className="user-header__name">Alex Morgan</h2>
          <p className="user-header__last-update">Last update: Jan 15, 2025</p>
        </div>
      </div>
      <div className="user-header__notifications">
        <button className="user-header__bell-icon">{/* Bell icon */}</button>
        <button className="user-header__time-icon">{/* Time icon */}</button>
      </div>
    </div>
  );
};

export default UserHeader;
