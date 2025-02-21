import "./UserHeader.scss";
import { BadgeCheck } from "lucide-react";
import defaultAvatar from "../../assets/users/avatar/default-avatar.webp";

const UserHeader = ({ user, records }) => {
  const minioUrl = import.meta.env.VITE_MINIO_API_URL;

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

    // Ensure the filePath doesn't already start with the bucket name
    if (filePath.startsWith("users/")) {
      return `${minioUrl}/${filePath}`;
    }

    // If the bucket name is not included, prepend it
    return `${minioUrl}/users/${filePath}`;
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
            console.log(getAvatarUrl(user?.avatar_file_path));
            console.log("Image load error, using default avatar");
            e.target.src = defaultAvatar;
          }}
        />
        <div className="user-header__info">
          <h2 className="user-header__name">
            {user.name}&nbsp;
            <BadgeCheck />
          </h2>
          <p className="user-header__last-update">Last update: {lastLogged}</p>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
