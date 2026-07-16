import React from "react";

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div style={{
    padding: "24px 20px", background: "rgba(255,255,255,0.025)", border: "1px solid var(--border-card)",
    borderRadius: "var(--r-lg)", transition: "var(--ease)",
  }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(229,57,53,0.08)"; e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.025)"; e.currentTarget.style.borderColor = "var(--border-card)"; e.currentTarget.style.transform = "none"; }}>
    {Icon && (
      <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, boxShadow: "0 4px 14px rgba(229,57,53,0.35)" }}>
        <Icon size={20} color="#fff" />
      </div>
    )}
    <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{title}</h3>
    <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.65 }}>{desc}</p>
  </div>
);

export default FeatureCard;
