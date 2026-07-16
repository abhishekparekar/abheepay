import React from "react";

const SectionTitle = ({ label, title, highlight, subtitle, center = true }) => {
  return (
    <div
      style={{
        textAlign: center ? "center" : "left",
        marginBottom: "64px",
      }}
    >
      {label && (
        <span
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
            border: "1px solid rgba(99,102,241,0.3)",
            color: "var(--primary-light)",
            borderRadius: "var(--radius-full)",
            padding: "6px 18px",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          {label}
        </span>
      )}
      <h2
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 800,
          lineHeight: 1.2,
          color: "var(--text-primary)",
          marginBottom: "16px",
        }}
      >
        {title}{" "}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            color: "var(--text-secondary)",
            maxWidth: "600px",
            margin: center ? "0 auto" : "0",
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
