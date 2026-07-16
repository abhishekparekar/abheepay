import React from "react";

const PartnerLogo = ({ name, emoji }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    gap: 8, padding: "20px 12px",
    background: "rgba(255,255,255,0.025)", border: "1px solid var(--border-card)",
    borderRadius: "var(--r-md)", cursor: "pointer", transition: "var(--ease)",
  }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(229,57,53,0.08)"; e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.025)"; e.currentTarget.style.borderColor = "var(--border-card)"; e.currentTarget.style.transform = "none"; }}>
    <div style={{ fontSize: 24, lineHeight: 1 }}>{emoji}</div>
    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textAlign: "center" }}>{name}</div>
  </div>
);

export default PartnerLogo;
