import React from "react";
import { FiSearch, FiMessageSquare, FiFileText, FiShield, FiUserCheck, FiSend } from "react-icons/fi";

const steps = [
  { step: 1, label: "Prospect",       icon: FiSearch,        desc: "Identify potential market opportunities" },
  { step: 2, label: "Approach",       icon: FiMessageSquare, desc: "Connect with our expert team" },
  { step: 3, label: "KYC Collection", icon: FiFileText,      desc: "Submit your business documentation" },
  { step: 4, label: "KYC Validation", icon: FiShield,        desc: "Secure compliance verification" },
  { step: 5, label: "Account Setup",  icon: FiUserCheck,     desc: "Configure your portal & preferences" },
  { step: 6, label: "Let Start",      icon: FiSend,          desc: "Launch your payment operations" },
];

const JourneySection = () => {
  return (
    <section style={{
      padding: "96px 0",
      background: "linear-gradient(180deg, #ffffff 0%, #f4f7f6 100%)",
      color: "#0c0509",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative Orbs */}
      <div style={{
        position: "absolute",
        width: 350,
        height: 350,
        right: "-50px",
        top: "10%",
        background: "radial-gradient(circle, rgba(229,57,53,0.02) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
            letterSpacing: "-0.02em",
            color: "#0c0509",
            marginBottom: 14,
            marginTop: 0
          }}>
            Let the <span style={{
              background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>Journey Begins...</span>
          </h2>
          <p style={{ color: "#524449", fontSize: 16, maxWidth: 520, margin: "0 auto 0" }}>
            A simplified, secure onboarding roadmap to power your financial services operations.
          </p>
          <div style={{ width: 56, height: 3, background: "linear-gradient(90deg, #e53935, #d81b60)", borderRadius: 2, margin: "20px auto 0" }} />
        </div>

        {/* Timeline Container */}
        <div style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          padding: "0 10px"
        }} className="timeline-container">
          
          {/* Dashed connector line for desktop */}
          <div style={{
            position: "absolute",
            top: 44,
            left: "5%",
            right: "5%",
            height: 2,
            borderTop: "2px dashed rgba(229, 57, 53, 0.22)",
            zIndex: 0
          }} className="desktop-timeline-line" />

          {steps.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                flex: 1,
                position: "relative",
                zIndex: 1
              }} className="timeline-step">
                
                {/* Step circle container */}
                <div style={{
                  position: "relative",
                  marginBottom: 20
                }}>
                  {/* Step number badge */}
                  <div style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                    color: "#fff",
                    fontSize: 10.5,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(229, 57, 53, 0.25)",
                    zIndex: 2
                  }}>
                    {item.step}
                  </div>

                  {/* Main circle */}
                  <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "#ffffff",
                    border: "2.5px solid rgba(229, 57, 53, 0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.02)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer"
                  }}
                    className="step-circle"
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "#e53935";
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 12px 30px rgba(229, 57, 53, 0.08)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "rgba(229, 57, 53, 0.18)";
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.02)";
                    }}
                  >
                    <IconComponent size={24} style={{ color: "#e53935", transition: "transform 0.25s ease" }} />
                  </div>
                </div>

                {/* Text Labels */}
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: 15.5,
                  color: "#0c0509",
                  marginBottom: 8,
                  marginTop: 0
                }}>
                  {item.label}
                </h3>

                <div style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "#e53935",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  padding: "4px 12px",
                  borderRadius: 20,
                  background: "rgba(229, 57, 53, 0.06)",
                  border: "1px solid rgba(229, 57, 53, 0.12)",
                  display: "inline-block",
                  marginBottom: 8
                }}>
                  Step {item.step}
                </div>

                <p style={{
                  color: "#524449",
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  maxWidth: 130,
                  margin: 0
                }} className="step-desc">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .step-circle:hover svg {
          transform: rotate(12deg) scale(1.08);
        }
        @media(max-width:820px){
          .timeline-container {
            flex-direction: column !important;
            gap: 40px !important;
            align-items: flex-start !important;
            padding-left: 20px !important;
          }
          .desktop-timeline-line {
            display: none !important;
          }
          .timeline-container::before {
            content: '';
            position: absolute;
            top: 10px;
            bottom: 10px;
            left: 58px;
            width: 2px;
            border-left: 2px dashed rgba(229, 57, 53, 0.18);
            z-index: 0;
          }
          .timeline-step {
            flex-direction: row !important;
            text-align: left !important;
            align-items: center !important;
            gap: 20px !important;
            width: 100% !important;
          }
          .step-desc {
            max-width: 100% !important;
            text-align: left !important;
          }
          .timeline-step > div {
            margin-bottom: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default JourneySection;
