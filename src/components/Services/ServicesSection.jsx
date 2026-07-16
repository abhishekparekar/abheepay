import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { fetchServices } from "../../services/serviceService";
import { renderServiceIcon } from "../../utils/iconHelper";

const gradients = [
  { bg: "linear-gradient(145deg, #1a0810, #2c0a18)", accent: "#e53935" },
  { bg: "linear-gradient(145deg, #1a0b06, #2a1008)", accent: "#f4511e" },
  { bg: "linear-gradient(145deg, #100818, #1c0824)", accent: "#d81b60" },
  { bg: "linear-gradient(145deg, #0c0818, #180a28)", accent: "#7b1fa2" }
];

const ServicesSection = () => {
  const { tenantId } = useAuth();
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const load = async () => {
      const data = await fetchServices(tenantId);
      setSlides(data || []);
    };
    load();
  }, [tenantId]);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  if (slides.length === 0) {
    return null; // Don't render section if empty
  }

  // Get up to 4 circular visible items
  const visible = Array.from({ length: Math.min(4, slides.length) }).map((_, i) => {
    const slideIdx = (current + i) % slides.length;
    const grad = gradients[slideIdx % gradients.length];
    return {
      ...slides[slideIdx],
      bg: grad.bg,
      accent: grad.accent
    };
  });

  return (
    <section style={{
      padding: "96px 0",
      background: "linear-gradient(180deg, #0d0408 0%, #100509 100%)",
      overflow: "hidden",
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{
            fontFamily: "'Outfit',sans-serif", fontWeight: 900,
            fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.02em",
            color: "#f8f0f2", marginBottom: 14,
          }}>
            What we <span style={{ background: "linear-gradient(135deg,#ef5350,#ff6f3c,#f06292)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>do</span>
          </h2>
          <p style={{ color: "#c9a8b4", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
            One connected platform for payments, banking, travel and lending built for merchants and distributors.
          </p>
          {/* Underline */}
          <div style={{ width: 56, height: 3, background: "linear-gradient(90deg,#e53935,#d81b60)", borderRadius: 2, margin: "20px auto 0" }} />
        </div>

        {/* Cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          gap: 18, marginBottom: 44,
        }} className="what-grid">
          {visible.map((s, i) => (
            <div key={i} style={{
              background: s.bg,
              border: `1px solid ${s.accent}22`,
              borderRadius: 18, overflow: "hidden",
              position: "relative", height: 280,
              display: "flex", flexDirection: "column", justifyContent: "flex-end",
              padding: "0 0 0 0",
              cursor: "pointer", transition: "all 0.3s ease",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = `${s.accent}55`; e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.7), 0 0 30px ${s.accent}25`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = `${s.accent}22`; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5)"; }}>

              {/* Vector Icon bg */}
              <div style={{ position: "absolute", top: 24, left: 24, width: 44, height: 44, color: "#fff", opacity: 0.25 }}>
                {renderServiceIcon(s.icon, { size: 40 })}
              </div>

              {/* Radial glow */}
              <div style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "60%", background: `radial-gradient(circle at top right, ${s.accent}18, transparent 70%)`, pointerEvents: "none" }} />

              {/* Bottom content */}
              <div style={{
                background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%)",
                padding: "32px 22px 24px",
              }}>
                <h3 style={{
                  fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                  fontSize: 16, color: "#fff", lineHeight: 1.35,
                  textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                }}>
                  {s.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows (only if multiple items exist) */}
        {slides.length > 4 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
            <button onClick={prev} style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(229,57,53,0.3)",
              color: "#ef5350", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.28s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(229,57,53,0.15)"; e.currentTarget.style.borderColor = "var(--red)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(229,57,53,0.3)"; }}>
              <FiChevronLeft size={20} />
            </button>
            <button onClick={next} style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "linear-gradient(135deg,#e53935,#d81b60)",
              border: "none",
              color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.28s ease",
              boxShadow: "0 4px 18px rgba(229,57,53,0.45)",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}>
              <FiChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media(max-width:1024px){ .what-grid{grid-template-columns:repeat(2,1fr)!important;} }
        @media(max-width:560px) { .what-grid{grid-template-columns:1fr!important;} }
      `}</style>
    </section>
  );
};

export default ServicesSection;
