import React from "react";
import { FiZap, FiCheckCircle, FiLock, FiBarChart2, FiMonitor, FiShield, FiCode, FiHeadphones } from "react-icons/fi";

const features = [
  { icon: FiZap,        title: "Instant Settlement",  desc: "Get your funds within 30 minutes of transaction completion." },
  { icon: FiCheckCircle,title: "High Success Rate",   desc: "Industry-leading 99.5% payment success rate with smart routing." },
  { icon: FiLock,       title: "Enterprise Security", desc: "PCI-DSS compliant infrastructure with 256-bit encryption." },
  { icon: FiBarChart2,  title: "Real-Time Reports",   desc: "Comprehensive analytics and insights at your fingertips." },
  { icon: FiMonitor,    title: "Smart Dashboard",     desc: "Intuitive interface for managing all your payment operations." },
  { icon: FiShield,     title: "Fraud Protection",    desc: "AI-powered fraud detection and prevention systems." },
  { icon: FiCode,       title: "Easy Integration",    desc: "Simple APIs and plugins for quick implementation." },
  { icon: FiHeadphones, title: "Dedicated Support",   desc: "24×7 expert support team ready to assist you." },
];

const SolutionsSection = () => (
  <section style={{
    padding: "96px 0",
    background: "linear-gradient(135deg, #fff3f4 0%, #ffffff 100%)",
    color: "#0c0509",
    position: "relative",
    overflow: "hidden"
  }}>
    {/* Subtle gradient orb */}
    <div style={{
      position: "absolute",
      bottom: -150,
      right: -100,
      width: 450,
      height: 450,
      background: "radial-gradient(circle, rgba(229,57,53,0.03) 0%, transparent 70%)",
      pointerEvents: "none"
    }} />

    <div className="container" style={{ position: "relative", zIndex: 1 }}>
      
      {/* Title Header */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
          color: "#0c0509",
          letterSpacing: "-0.02em",
          marginBottom: 14,
          marginTop: 0
        }}>
          Why Businesses Trust{" "}
          <span style={{
            background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            SiD Pay
          </span>
        </h2>
        <p style={{ color: "#524449", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
          Built for reliability, security, and speed — everything your business needs to grow.
        </p>
      </div>

      {/* Feature Cards Grid (4x2 on PC, 2x4 on Tablet, 1x8 on Mobile) */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 20
      }} className="trust-grid">
        {features.map(({ icon: Icon, title, desc }, idx) => (
          <div
            key={idx}
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0, 0, 0, 0.04)",
              borderRadius: 24,
              padding: "40px 28px 48px",
              textAlign: "center",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.02)",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.28s ease"
            }}
            className="trust-card"
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(229, 57, 53, 0.15)";
              e.currentTarget.style.boxShadow = "0 12px 36px rgba(229, 57, 53, 0.05)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.04)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.02)";
            }}
          >
            {/* Round Icon container */}
            <div style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "rgba(229,57,53,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px"
            }}>
              <Icon size={20} style={{ color: "#e53935" }} />
            </div>

            {/* Headline */}
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 16.5,
              color: "#0c0509",
              marginBottom: 10,
              marginTop: 0
            }}>
              {title}
            </h3>

            {/* Description */}
            <p style={{
              color: "#524449",
              fontSize: 13,
              lineHeight: 1.6,
              margin: 0
            }}>
              {desc}
            </p>

            {/* Accent Line - Bottom Left indicator exactly as screenshot */}
            <div style={{
              position: "absolute",
              bottom: 18,
              left: 28,
              width: 28,
              height: 3,
              background: "#e53935",
              borderRadius: 2
            }} />

          </div>
        ))}
      </div>

    </div>

    <style>{`
      @media(max-width:1024px){
        .trust-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }
      @media(max-width:600px){
        .trust-grid {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
  </section>
);

export default SolutionsSection;
