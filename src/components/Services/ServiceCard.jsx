import React from "react";
import { FiCheckCircle } from "react-icons/fi";

const ServiceCard = ({ icon, title, desc, features = [], color = "#e53935" }) => (
  <div style={{
    background: "rgba(255,255,255,0.025)", border: "1px solid var(--border-card)",
    borderRadius: "var(--r-xl)", padding: "28px 24px",
    transition: "var(--ease)", position: "relative", overflow: "hidden",
  }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(229,57,53,0.07)"; e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.025)"; e.currentTarget.style.borderColor = "var(--border-card)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
    <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `${color}12`, borderRadius: "0 var(--r-xl) 0 100%" }} />
    <div style={{ fontSize: 36, marginBottom: 16, lineHeight: 1 }}>{icon}</div>
    <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{title}</h3>
    <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{desc}</p>
    {features.length > 0 && (
      <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-secondary)" }}>
            <FiCheckCircle size={13} style={{ color: "var(--red-light)", flexShrink: 0 }} />{f}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ServiceCard;
