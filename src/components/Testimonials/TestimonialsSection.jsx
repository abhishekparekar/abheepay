import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { fetchTestimonials, defaultTestimonials } from "../../services/testimonialService";
import { FiStar, FiChevronDown, FiShield } from "react-icons/fi";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const TestimonialsSection = () => {
  const { tenantId } = useAuth();
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

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

  return (
    <section style={{
      padding: "var(--section-py) 0",
      background: "linear-gradient(180deg, #f4f7f6 0%, #ffffff 100%)",
      color: "#0c0509",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative Orbs */}
      <div style={{
        position: "absolute",
        width: 350,
        height: 350,
        left: "-50px",
        bottom: "10%",
        background: "radial-gradient(circle, rgba(229,57,53,0.02) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            borderRadius: "999px",
            background: "rgba(229,57,53,0.07)",
            border: "1px solid rgba(229,57,53,0.18)",
            fontSize: 11.5,
            fontWeight: 700,
            color: "#e53935",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 16
          }}>
            <FiShield size={12} /> Testimonials
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
            letterSpacing: "-0.02em",
            color: "#0c0509",
            marginBottom: 14,
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
          <p style={{ color: "#524449", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
            See how merchants and business owners across India are scaling with our payment infrastructure.
          </p>
        </motion.div>

        {/* 3-Column Compact Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          marginBottom: 44
        }} className="testimonial-grid">
          {items.slice(0, visibleCount).map((item, idx) => (
            <motion.div 
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              style={{
                background: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                borderTop: "3.5px solid #e53935",
                borderRadius: 20,
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.015)",
                transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease"
              }}
              className="testimonial-card"
              whileHover={{
                y: -4,
                borderColor: "rgba(229, 57, 53, 0.15)",
                boxShadow: "0 12px 30px rgba(229, 57, 53, 0.05)"
              }}
            >
              {/* Stars rating */}
              <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                {Array.from({ length: 5 }).map((_, sIdx) => (
                  <FiStar key={sIdx} size={15} style={{
                    color: sIdx < (item.rating || 5) ? "#ff9800" : "rgba(0,0,0,0.06)",
                    fill: sIdx < (item.rating || 5) ? "#ff9800" : "transparent"
                  }} />
                ))}
              </div>

              {/* Review Text */}
              <p style={{
                color: "#524449",
                fontSize: 14,
                lineHeight: 1.7,
                fontStyle: "italic",
                marginBottom: 24,
                flexGrow: 1,
                marginTop: 0
              }}>
                "{item.text}"
              </p>

              {/* Author Profile section */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
                {/* Text Avatar */}
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  color: "#fff",
                  fontSize: 16,
                  overflow: "hidden"
                }}>
                  {item.avatar && (item.avatar.startsWith("data:") || item.avatar.startsWith("http")) ? (
                    <img src={item.avatar} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    (item.avatar || (item.name ? item.name.charAt(0) : "U"))
                  )}
                </div>
                <div>
                  <h4 style={{ fontSize: 14.5, fontWeight: 700, color: "#0c0509", margin: 0 }}>
                    {item.name}
                  </h4>
                  <p style={{ fontSize: 12, color: "#77676c", margin: "2px 0 0 0" }}>
                    Location - {item.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More button */}
        {items.length > visibleCount && (
          <div style={{ textAlign: "center" }}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                borderRadius: "999px",
                border: "1.5px solid rgba(229, 57, 53, 0.35)",
                background: "transparent",
                color: "#e53935",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.25s ease"
              }}
              onClick={() => setVisibleCount(prev => prev + 3)}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(229, 57, 53, 0.05)";
                e.currentTarget.style.borderColor = "#e53935";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(229, 57, 53, 0.35)";
              }}
            >
              View More <FiChevronDown size={16} />
            </motion.button>
          </div>
        )}
      </div>

      <style>{`
        @media(max-width:960px){
          .testimonial-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media(max-width:600px){
          .testimonial-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
