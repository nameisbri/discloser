import React, { useState } from "react";
import { TestTubeDiagonal, Heart, ShieldCheck } from "lucide-react";
import "./Landing.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/emblem_discloser_darkpink.svg";

const Landing = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const navigate = useNavigate();

  const features = [
    {
      icon: <TestTubeDiagonal size={32} />,
      title: "Track Your Health",
      description:
        "Easily upload and manage your sexual health test results with confidence and privacy.",
    },
    {
      icon: <Heart size={32} />,
      title: "Share Securely",
      description:
        "Generate anonymized, shareable links to communicate your status without compromising personal details.",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Stay Informed",
      description:
        "Get personalized testing reminders and access educational resources to support your sexual health journey.",
    },
  ];

  const handleMouseEnter = (index) => {
    setActiveFeature(index);
  };

  const handleQuickStart = () => {
    navigate("/");
  };

  return (
    <div className="landing">
      <div className="landing__hero">
        <div className="landing__hero-content">
          <img className="landing__hero-logo" src={logo} alt="discloser logo" />
          <h1 className="landing__title">
            <span className="landing__title-highlight">discloser</span>
          </h1>
          <p className="landing__subtitle">
            better health. honest connections.
          </p>
          <p className="landing__copy">
            Take control of your sexual health journey with a secure, discreet
            way to manage and share your test results.
          </p>
          <p className="landing__copy">
            Focus on what matters - having informed, confident conversations
            about sexual health.
          </p>
          <div className="landing__cta-group">
            <button
              className="landing__cta-button landing__cta-button--primary"
              onClick={handleQuickStart}
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
