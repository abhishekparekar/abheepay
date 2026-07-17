import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiArrowRight,
  FiShield,
  FiTrendingUp,
  FiGitMerge,
  FiBriefcase,
  FiLayers
} from "react-icons/fi";

const partnerTypes = [
  {
    title: "Merchant Partner",
    icon: FiTrendingUp,
    features: [
      "Zero setup fee",
      "Competitive pricing",
      "Quick onboarding",
      "Marketing support",
      "Dedicated account manager"
    ]
  },
  {
    title: "Distributor Partner",
    icon: FiGitMerge,
    features: [
      "Revenue sharing model",
      "White-label options",
      "Technical training",
      "Sales enablement",
      "Priority support"
    ]
  },
  {
    title: "Enterprise Partner",
    icon: FiBriefcase,
    features: [
      "Custom solutions",
      "Dedicated infrastructure",
      "Volume discounts",
      "API customization",
      "Strategic planning"
    ]
  },
  {
    title: "White Label Partner",
    icon: FiLayers,
    features: [
      "Full brandings controls",
      "Custom domain",
      "Flexible commission",
      "Technical support",
      "Marketing assets"
    ]
  }
];

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

const BecomePartner = () => {
  return (
    <section style={{
      padding: "var(--section-py) 0",
      background: "linear-gradient(180deg, #f4f7f6 0%, #ffffff 100%)",
      color: "#0c0509",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Subtle background decorative orbs */}
      <div style={{
        position: "absolute",
        width: 450,
        height: 450,
        left: "-100px",
        top: "20%",
        background: "radial-gradient(circle, rgba(229,57,53,0.03) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        width: 450,
        height: 450,
        right: "-100px",
        bottom: "10%",
        background: "radial-gradient(circle, rgba(216,27,96,0.02) 0%, transparent 70%)",
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
            <FiShield size={12} /> Partner Ecosystem
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
            Become a{" "}
            <span style={{
              background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Partner
            </span>
          </h2>
          <p style={{ color: "#524449", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
            Choose a partner program tailored to your business model and start expanding your revenue streams.
          </p>
        </motion.div>

        {/* Partner Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20
        }} className="become-partner-grid">
          {partnerTypes.map((type, i) => {
            const Icon = type.icon;
            return (
              <motion.div 
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  borderRadius: 24,
                  padding: "36px 28px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.015)",
                  transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                  position: "relative",
                  overflow: "hidden"
                }}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(229, 57, 53, 0.15)",
                  boxShadow: "0 12px 30px rgba(229, 57, 53, 0.05)"
                }}
              >
                {/* Top Accent Icon & Title */}
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <div style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    background: "rgba(229, 57, 53, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px"
                  }}>
                    <Icon size={20} style={{ color: "#e53935" }} />
                  </div>
                  <h3 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: 18,
                    color: "#0c0509",
                    margin: 0
                  }}>
                    {type.title}
                  </h3>
                </div>

                {/* Features List */}
                <ul style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 32px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  flexGrow: 1
                }}>
                  {type.features.map((feat, idx) => (
                    <li key={idx} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 13.5,
                      color: "#524449"
                    }}>
                      <FiCheckCircle size={14} style={{ color: "#e53935", flexShrink: 0 }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link to="/contact" style={{ textDecoration: "none", marginTop: "auto" }}>
                  <button style={{
                    width: "100%",
                    padding: "12px 18px",
                    borderRadius: 12,
                    border: "none",
                    background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: 13.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                    onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
                  >
                    Apply Now <FiArrowRight size={15} />
                  </button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){
          .become-partner-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 18px !important;
          }
        }
        @media(max-width:560px){
          .become-partner-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BecomePartner;
