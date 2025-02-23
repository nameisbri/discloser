import React from "react";
import {
  MapPin,
  Phone,
  Shield,
  FileText,
  Info,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import "./Learn.scss";
import { useNavigate } from "react-router-dom";

const Learn = () => {
  const resources = [
    {
      icon: <MapPin size={24} />,
      title: "Get Tested",
      subtitle: "Find a clinic near you",
      type: "link",
    },
    {
      icon: <Phone size={24} />,
      title: "Sexual Health Infoline Ontario",
      subtitle: "Chat · Phone",
      type: "link",
    },
    {
      icon: <FileText size={24} />,
      title: "STI Testing Information",
      type: "link",
    },
    {
      icon: <Info size={24} />,
      title: "Health Resources",
      type: "link",
    },
    {
      icon: <Shield size={24} />,
      title: "Consent Information",
      type: "link",
    },
  ];

  const navigate = useNavigate();
  const handleActionClick = (item) => {
    switch (item.title) {
      case "Get Tested":
        window.open("https://sexualhealthontario.ca/en/find-clinic", "_blank");
        break;
      case "Sexual Health Infoline Ontario":
        window.open("https://sexualhealthontario.ca/en/chat", "_blank");
        break;
      case "STI Testing Information":
        window.open(
          "https://www.ontario.ca/page/sexually-transmitted-infections-tests",
          "_blank"
        );
        break;
      case "Health Resources":
        window.open("https://sexualhealthontario.ca/en/home", "_blank");
        break;
      case "Consent Information":
        window.open(
          "https://www.canada.ca/en/women-gender-equality/campaigns/gender-based-violence-its-not-just/sexual-violence-and-consent.html",
          "_blank"
        );
        break;
      default:
        break;
    }
  };
  return (
    <div className="learn">
      <header className="learn__header-card">
        <nav className="learn__nav">
          <button className="learn__back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            <span className="learn__nav-title">Health Resources</span>
          </button>
        </nav>
        <h2 className="learn__header-title">Ontario Sexual Health Resources</h2>
        <p className="learn__header-subtitle">
          Access reliable information and services for your sexual health needs.
        </p>
      </header>

      <div className="learn__action-row">
        {resources.slice(0, 2).map((item, index) => (
          <button
            key={index}
            className="learn__action-button"
            onClick={() => handleActionClick(item)}
          >
            <div className="learn__action-icon">{item.icon}</div>
            <div className="learn__action-content">
              <h3 className="learn__action-title">{item.title}</h3>
              <p className="learn__action-subtitle">{item.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="learn__resource-list">
        {resources.slice(2).map((item, index) => (
          <button
            key={index}
            className="learn__resource-item"
            onClick={() => handleActionClick(item)}
          >
            <div className="learn__resource-icon">{item.icon}</div>
            <span className="learn__resource-title">{item.title}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="learn__resource-chevron"
            >
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Learn;
