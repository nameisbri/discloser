import React, { useState } from "react";
import { TestTubeDiagonal, Heart, ShieldCheck } from "lucide-react";
import "./Landing.scss";
import { useNavigate } from "react-router-dom";

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

  const handleMouseLeave = () => {
    setActiveFeature(null);
  };

  const handleQuickStart = () => {
    navigate("/");
  };

  return (
    <div className="landing">
      <div className="landing__hero">
        <div className="landing__hero-content">
          <h1 className="landing__title">
            Own Your{" "}
            <span className="landing__title-highlight">Sexual Health</span>
          </h1>
          <p className="landing__subtitle">
            Empowering you to track, share, and understand your sexual wellness
            with confidence and privacy.
          </p>
          <div className="landing__cta-group">
            <button
              className="landing__cta-button landing__cta-button--primary"
              onClick={handleQuickStart}
            >
              Quick Start
            </button>
            <button className="landing__cta-button landing__cta-button--secondary">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
