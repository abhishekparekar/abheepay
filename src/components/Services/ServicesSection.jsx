import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { fetchServices } from "../../services/serviceService";
import { renderServiceIcon } from "../../utils/iconHelper";

const ServicesSection = () => {
  const { tenantId } = useAuth();
  const navigate = useNavigate();
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchServices(tenantId);
      setSlides(data || []);
    };
    load();
  }, [tenantId]);

  if (slides.length === 0) {
    return null; // Don't render section if empty
  }

  // Construct marquee items list (repeat to ensure seamlessness on ultra-wide viewports)
  let marqueeItems = [];
  if (slides.length > 0) {
    while (marqueeItems.length < 12) {
      marqueeItems = [...marqueeItems, ...slides];
    }
  }

  return (
    <section style={{
      padding: "var(--section-py) 0",
      background: "linear-gradient(180deg, #ffffff 0%, #f4f7f6 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: "absolute",
        bottom: -100,
        left: -100,
        width: 400,
        height: 400,
        background: "radial-gradient(circle, rgba(229,57,53,0.02) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 44, padding: "0 24px" }}>
          <h2 style={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
            letterSpacing: "-0.02em",
            color: "#0c0509",
            marginBottom: 14,
            marginTop: 0
          }}>
            What we{" "}
            <span style={{
              background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              do
            </span>
          </h2>
          <p style={{ color: "#524449", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
            One connected platform for payments, banking, travel and lending built for merchants and distributors.
          </p>
          {/* Underline */}
          <div style={{ width: 56, height: 3, background: "linear-gradient(90deg,#e53935,#d81b60)", borderRadius: 2, margin: "20px auto 0" }} />
        </div>

        {/* Seamless scrolling marquee container */}
        <div style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          padding: "12px 0"
        }} className="services-marquee-container">
          
          {/* Edge Fades for smooth overlay */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 100,
            height: "100%",
            background: "linear-gradient(90deg, #ffffff 0%, transparent 100%)",
            zIndex: 3,
            pointerEvents: "none"
          }} />
          
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 100,
            height: "100%",
            background: "linear-gradient(-90deg, #f4f7f6 0%, transparent 100%)",
            zIndex: 3,
            pointerEvents: "none"
          }} />

          {/* Marquee Track */}
          <div style={{
            display: "flex",
            width: "max-content",
            animation: "servicesMarquee 40s linear infinite"
          }} className="services-marquee-track">
            {marqueeItems.map((s, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/services/${s.id || s.slug}`)}
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  borderRadius: 24,
                  padding: "32px 24px",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.015)",
                  position: "relative",
                  overflow: "hidden",
                  width: 290,
                  height: 250,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  marginRight: 24,
                  flexShrink: 0,
                  cursor: "pointer",
                  boxSizing: "border-box",
                  transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease"
                }}
                className="services-card"
              >
                {/* Premium Glass Container for Logo/Icon */}
                <div style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  height: 40,
                  padding: "6px 12px",
                  background: "rgba(0, 0, 0, 0.03)",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                }}>
                  {renderServiceIcon(s.icon, {
                    height: "22px",
                    width: "auto",
                    color: "#e53935",
                    objectFit: "contain",
                    opacity: 1
                  })}
                </div>

                {/* Category Pill Tag */}
                <div style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "5px 10px",
                  borderRadius: 20,
                  background: "rgba(0, 0, 0, 0.04)",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  color: "#524449",
                  zIndex: 2
                }}>
                  {s.category || "API"}
                </div>

                {/* Radial glow */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "60%",
                  height: "60%",
                  background: "radial-gradient(circle at top right, rgba(229,57,53,0.01) 0%, transparent 70%)",
                  pointerEvents: "none"
                }} />

                {/* Bottom content with Description */}
                <div style={{
                  width: "100%",
                  boxSizing: "border-box",
                  zIndex: 1,
                  textAlign: "left"
                }}>
                  <h3 style={{
                    fontFamily: "'Outfit',sans-serif",
                    fontWeight: 800,
                    fontSize: 17,
                    color: "#0c0509",
                    lineHeight: 1.3,
                    margin: 0
                  }}>
                    {s.title}
                  </h3>
                  {s.description && (
                    <p style={{
                      fontSize: 12.5,
                      color: "#524449",
                      marginTop: 8,
                      lineHeight: 1.5,
                      opacity: 0.85,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      margin: 0
                    }}>
                      {s.description}
                    </p>
                  )}
                </div>

                {/* Accent Line - Bottom Left indicator */}
                <div style={{
                  position: "absolute",
                  bottom: 18,
                  left: 24,
                  width: 28,
                  height: 3,
                  background: "#e53935",
                  borderRadius: 2
                }} />

              </div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        .services-marquee-track:hover {
          animation-play-state: paused;
        }
        .services-card:hover {
          transform: translateY(-5px);
          border-color: rgba(229, 57, 53, 0.15) !important;
          box-shadow: 0 12px 36px rgba(229, 57, 53, 0.05) !important;
        }
        @keyframes servicesMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
