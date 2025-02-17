import "./UserHeader.scss";
import { BadgeCheck } from "lucide-react";
import defaultAvatar from "../../assets/users/avatar/default-avatar.webp";

const UserHeader = ({ user, records }) => {
  const MINIO_URL = "http://localhost:9001";

  function formatDate(timestamp) {
    const rawDate = new Date(timestamp);
    return rawDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const getAvatarUrl = (filePath) => {
    if (!filePath) return defaultAvatar;
    return `${MINIO_URL}/${filePath}`;
  };

  const lastLogged =
    records && records.length > 0
      ? formatDate(records[0].test_date)
      : "No records";

  return (
    <div className="user-header">
      <div className="user-header__profile">
        <img
          className="user-header__avatar"
          src={getAvatarUrl(user?.avatar_file_path)}
          alt={`${user?.name}'s avatar`}
          onError={(e) => {
            console.log("Image load error, using default avatar");
            e.target.src = defaultAvatar;
          }}
        />
        <div className="user-header__info">
          <h2 className="user-header__name">{user.name}</h2>
          <p className="user-header__last-update">
            Last update: {lastLogged}
            <BadgeCheck />
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
