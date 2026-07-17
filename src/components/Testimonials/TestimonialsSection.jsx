import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { fetchTestimonials, defaultTestimonials } from "../../services/testimonialService";
import { FiStar, FiShield } from "react-icons/fi";

const TestimonialsSection = () => {
  const { tenantId } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchTestimonials(tenantId);
      if (data && data.length > 0) {
        setItems(data);
      } else {
        setItems(defaultTestimonials);
      }
    };
    load();
  }, [tenantId]);

  if (items.length === 0) return null;

  // Duplicate items for infinite marquee loop (minimum 8 items)
  let baseList = [];
  const repeatCount = Math.ceil(8 / items.length);
  for (let i = 0; i < repeatCount; i++) {
    baseList.push(...items);
  }
  const marqueeItems = [...baseList, ...baseList];

  return (
    <section style={{
      padding: "44px 0",
      background: "linear-gradient(180deg, #f4f7f6 0%, #ffffff 100%)",
      color: "#0c0509",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative background glow */}
      <div style={{
        position: "absolute",
        width: 350,
        height: 350,
        left: "-50px",
        bottom: "10%",
        background: "radial-gradient(circle, rgba(229,57,53,0.02) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36, padding: "0 24px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: "999px",
            background: "rgba(229,57,53,0.07)",
            border: "1px solid rgba(229,57,53,0.15)",
            fontSize: 11,
            fontWeight: 700,
            color: "#e53935",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 12
          }}>
            <FiShield size={12} /> Testimonials
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
            letterSpacing: "-0.02em",
            color: "#0c0509",
            marginBottom: 10,
            marginTop: 0
          }}>
            What Our{" "}
            <span style={{
              background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Partners Say
            </span>
          </h2>
          <p style={{ color: "#524449", fontSize: 14.5, maxWidth: 520, margin: "0 auto" }}>
            See how merchants and business owners across India are scaling with our payment infrastructure.
          </p>
        </div>

        {/* Infinite Marquee Slider */}
        <div style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          padding: "10px 0"
        }} className="testimonials-marquee-container">
          
          {/* Faded edges */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 100,
            height: "100%",
            background: "linear-gradient(90deg, #f4f7f6 0%, transparent 100%)",
            zIndex: 3,
            pointerEvents: "none"
          }} />
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 100,
            height: "100%",
            background: "linear-gradient(-90deg, #ffffff 0%, transparent 100%)",
            zIndex: 3,
            pointerEvents: "none"
          }} />

          {/* Marquee Track */}
          <div style={{
            display: "flex",
            width: "max-content",
            animation: "testimonialsMarquee 35s linear infinite"
          }} className="testimonials-marquee-track">
            {marqueeItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  borderTop: "3.5px solid #e53935",
                  borderRadius: 20,
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  width: 320,
                  minHeight: 200,
                  marginRight: 20,
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.015)",
                  boxSizing: "border-box",
                  flexShrink: 0,
                  textAlign: "left"
                }}
                className="testimonial-marquee-card"
              >
                {/* Stars rating */}
                <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                  {Array.from({ length: 5 }).map((_, sIdx) => (
                    <FiStar key={sIdx} size={14} style={{
                      color: sIdx < (item.rating || 5) ? "#ff9800" : "rgba(0,0,0,0.06)",
                      fill: sIdx < (item.rating || 5) ? "#ff9800" : "transparent"
                    }} />
                  ))}
                </div>

                {/* Review Text */}
                <p style={{
                  color: "#524449",
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  fontStyle: "italic",
                  marginBottom: 16,
                  flexGrow: 1,
                  marginTop: 0
                }}>
                  "{item.text}"
                </p>

                {/* Author Profile */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    color: "#fff",
                    fontSize: 14,
                    overflow: "hidden",
                    flexShrink: 0
                  }}>
                    {item.avatar && (item.avatar.startsWith("data:") || item.avatar.startsWith("http")) ? (
                      <img src={item.avatar} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      (item.avatar || (item.name ? item.name.charAt(0) : "U"))
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{ fontSize: 13.5, fontWeight: 700, color: "#0c0509", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.name}
                    </h4>
                    <p style={{ fontSize: 11.5, color: "#77676c", margin: "2px 0 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      Location - {item.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .testimonials-marquee-track:hover {
          animation-play-state: paused;
        }
        .testimonial-marquee-card:hover {
          transform: translateY(-2px);
          border-color: rgba(229, 57, 53, 0.2) !important;
          box-shadow: 0 6px 16px rgba(0,0,0,0.04) !important;
        }
        @keyframes testimonialsMarquee {
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

export default TestimonialsSection;
