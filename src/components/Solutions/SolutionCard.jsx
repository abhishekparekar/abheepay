import React from "react";
import { FiArrowRight } from "react-icons/fi";

const SolutionCard = ({ emoji, title, desc, tag, color = "#e53935", onClick }) => (
  <div style={{
    position: "relative", overflow: "hidden",
    background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-card)",
    borderRadius: "var(--r-xl)", padding: "32px 28px",
    transition: "var(--ease)", cursor: "pointer",
  }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(229,57,53,0.07)"; e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "var(--border-card)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
    onClick={onClick}>
    <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle, ${color}18, transparent 70%)`, borderRadius: "0 var(--r-xl) 0 100%" }} />
    {tag && (
      <div style={{ position: "absolute", top: 16, right: 16, padding: "4px 12px", borderRadius: "var(--r-full)", background: "var(--gradient-primary)", fontSize: 11, fontWeight: 700, color: "#fff" }}>{tag}</div>
    )}
    <div style={{ fontSize: 44, marginBottom: 18, lineHeight: 1 }}>{emoji}</div>
    <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 12 }}>{title}</h3>
    <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{desc}</p>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--red-light)", fontSize: 13, fontWeight: 600 }}>
      Learn more <FiArrowRight size={13} />
    </div>
  </div>
);

export default SolutionCard;
