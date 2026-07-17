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

const SolutionsSection = () => {
  // Double features array for seamless marquee loop
  const marqueeItems = [...features, ...features];

  return (
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

      <div style={{ position: "relative", zIndex: 1 }}>
        
        {/* Title Header */}
        <div style={{ textAlign: "center", marginBottom: 56, padding: "0 24px" }}>
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

        {/* Seamless automatic scroller wrapper */}
        <div style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          padding: "10px 0"
        }} className="trust-marquee-container">
          
          {/* Gradient Fades on edges for premium visual blend */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 100,
            height: "100%",
            background: "linear-gradient(90deg, #fff3f4 0%, transparent 100%)",
            zIndex: 3,
            pointerEvents: "none"
          }} className="fade-left" />
          
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 100,
            height: "100%",
            background: "linear-gradient(-90deg, #ffffff 0%, transparent 100%)",
            zIndex: 3,
            pointerEvents: "none"
          }} className="fade-right" />

          {/* Scrolling Track */}
          <div style={{
            display: "flex",
            width: "max-content",
            animation: "trustMarquee 36s linear infinite"
          }} className="trust-marquee-track">
            {marqueeItems.map(({ icon: Icon, title, desc }, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0, 0, 0, 0.04)",
                  borderRadius: 24,
                  padding: "36px 24px",
                  textAlign: "center",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.015)",
                  position: "relative",
                  overflow: "hidden",
                  width: 290,
                  height: 250,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginRight: 24,
                  flexShrink: 0,
                  boxSizing: "border-box",
                  transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease"
                }}
                className="trust-card"
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
                  marginBottom: 16
                }}>
                  <Icon size={20} style={{ color: "#e53935" }} />
                </div>

                {/* Headline */}
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#0c0509",
                  marginBottom: 8,
                  marginTop: 0
                }}>
                  {title}
                </h3>

                {/* Description */}
                <p style={{
                  color: "#524449",
                  fontSize: 12.5,
                  lineHeight: 1.55,
                  margin: 0
                }}>
                  {desc}
                </p>

                {/* Accent Line - Bottom Left indicator exactly as screenshot */}
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
        .trust-marquee-track:hover {
          animation-play-state: paused;
        }
        .trust-card:hover {
          transform: translateY(-5px);
          border-color: rgba(229, 57, 53, 0.15) !important;
          box-shadow: 0 12px 36px rgba(229, 57, 53, 0.05) !important;
        }
        @keyframes trustMarquee {
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

export default SolutionsSection;
