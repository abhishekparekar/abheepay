import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const partnerServicesList = [
  { title: "MATM", subtitle: "Micro ATM Services", icon: "📱", to: "/services/assisted-banking" },
  { title: "POS MACHINE", subtitle: "Point of Sale Solutions", icon: "💳", to: "/services/digital-payment-solutions" },
  { title: "CC BILL PAY", subtitle: "Credit Card Bill Payments", icon: "💵", to: "/services/bbps-recharge" },
  { title: "RECHARGE", subtitle: "Mobile & DTH Recharge", icon: "📞", to: "/services/bbps-recharge" },
  { title: "BBPS", subtitle: "Bharat Bill Payment System", icon: "⚡", to: "/services/bbps-recharge" },
  { title: "COLLECT", subtitle: "Payment Collection Services", icon: "📥", to: "/services/digital-payment-solutions" },
  { title: "CREDIT CARD", subtitle: "Credit Card Services", icon: "💳", to: "/services/lending-credit" },
  { title: "LOAN", subtitle: "Loan Services", icon: "📈", to: "/services/lending-credit" },
  { title: "INSURANCE", subtitle: "Insurance", icon: "🛡️", to: "/services/insurance-solutions" }
];

const benefitsList = [
  { title: "0 investment business", icon: "$", color: "#e53935" },
  { title: "simple joining process", icon: "🛡️", color: "#f4511e" },
  { title: "24*7 customer service", icon: "🎧", color: "#d81b60" },
  { title: "Earn upto ₹4 Lakh to ₹12 Lakh per annum", icon: "₹", color: "#e53935" }
];

const Partners = () => (
  <>
    <Helmet>
      <title>Partners Onboarding – SiD Pay</title>
      <meta name="description" content="Start your banking and digital finance business journey as a strategic partner with SiD Pay today." />
    </Helmet>

    {/* Section 1: Light Theme Hero Block (Exactly matching screenshot top section) */}
    <section style={{
      padding: "160px 24px 72px",
      background: "#ffffff",
      color: "#080306",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute",
        top: "-10%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 600,
        height: 600,
        background: "radial-gradient(circle, rgba(229,57,53,0.04) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
        {/* Category tag */}
        <div style={{
          display: "inline-block",
          padding: "6px 16px",
          borderRadius: 20,
          background: "rgba(229, 57, 53, 0.08)",
          border: "1px solid rgba(229, 57, 53, 0.25)",
          color: "#e53935",
          fontSize: 12,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 24
        }}>
          DIGITAL BANKING PARTNER
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "'Outfit',sans-serif",
          fontWeight: 900,
          fontSize: "clamp(2rem, 4vw, 3rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: "#0c0509",
          marginBottom: 20
        }}>
          SiD Pay ke saath apna banking vyapar shuru karein
        </h1>

        {/* Sub-text */}
        <p style={{
          color: "#524449",
          maxWidth: 640,
          margin: "0 auto 36px",
          fontSize: 16.5,
          lineHeight: 1.75
        }}>
          Enabling Indian SMEs to maximise their earning within a single platform. Join the revolution of digital finance.
        </p>

        {/* Get Started Button */}
        <Link to="/register">
          <button style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 36px",
            background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            border: "none",
            borderRadius: "999px",
            boxShadow: "0 6px 20px rgba(229, 57, 53, 0.35)",
            cursor: "pointer",
            transition: "all 0.25s ease"
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(229, 57, 53, 0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(229, 57, 53, 0.35)"; }}
          >
            Get Started <FiArrowRight size={16} />
          </button>
        </Link>
      </div>
    </section>

    {/* Section 2: Our Services (Exactly matching layout in partner screenshot) */}
    <section style={{
      padding: "72px 24px 96px",
      background: "#f4f7f6",
      color: "#080306",
      textAlign: "center"
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <h2 style={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
            letterSpacing: "-0.01em",
            color: "#0c0509",
            marginBottom: 12
          }}>
            Our Services
          </h2>
          <p style={{ color: "#524449", fontSize: 15 }}>
            Comprehensive banking and financial solutions
          </p>
          <div style={{ width: 44, height: 3, background: "linear-gradient(90deg, #e53935, #d81b60)", borderRadius: 2, margin: "16px auto 0" }} />
        </div>

        {/* Services Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20
        }} className="partner-services-grid">
          {partnerServicesList.map((item, idx) => (
            <Link key={idx} to={item.to} style={{ textDecoration: "none" }}>
              <div style={{
                background: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                borderRadius: 18,
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "left",
                boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
                transition: "all 0.28s ease",
                cursor: "pointer"
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 10px 24px rgba(229, 57, 53, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(229, 57, 53, 0.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.03)";
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.05)";
                }}
              >
                {/* Icon box */}
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "rgba(229, 57, 53, 0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  marginBottom: 16
                }}>
                  {item.icon}
                </div>

                {/* Text Title */}
                <h3 style={{
                  fontFamily: "'Outfit',sans-serif",
                  fontWeight: 800,
                  fontSize: 15.5,
                  color: "#0c0509",
                  margin: 0
                }}>
                  {item.title}
                </h3>
                
                {/* Subtitle */}
                <p style={{
                  color: "#77676c",
                  fontSize: 12.5,
                  margin: "6px 0 0 0"
                }}>
                  {item.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Section 3: SiD Pay Benefits (Exactly matching screenshot AAPKA BUSINESS HUMARA INVESTMENT) */}
    <section style={{
      padding: "80px 24px 96px",
      background: "#0c0509",
      color: "#f8f0f2",
      textAlign: "center",
      borderTop: "1px solid rgba(255,255,255,0.05)"
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <span style={{
            fontSize: 12,
            fontWeight: 800,
            color: "var(--red-light)",
            textTransform: "uppercase",
            letterSpacing: "0.1em"
          }}>
            AAPKA BUSINESS HUMARA INVESTMENT
          </span>
          <h2 style={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
            letterSpacing: "-0.01em",
            marginTop: 8,
            color: "#fff"
          }}>
            SiD Pay Benefits
          </h2>
        </div>

        {/* Benefits cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20
        }} className="benefits-grid">
          {benefitsList.map((item, idx) => (
            <div key={idx} style={{
              background: "rgba(255, 255, 255, 0.025)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 18,
              padding: "36px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              minHeight: 180,
              transition: "all 0.28s ease"
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(229, 57, 53, 0.06)";
                e.currentTarget.style.borderColor = "rgba(229, 57, 53, 0.25)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.025)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.transform = "none";
              }}
            >
              {/* Icon */}
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "rgba(229, 57, 53, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "var(--red-light)",
                marginBottom: 20
              }}>
                {item.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Outfit',sans-serif",
                fontWeight: 700,
                fontSize: 14.5,
                lineHeight: 1.45,
                color: "#f8f0f2",
                margin: 0
              }}>
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Section 4: Dark Theme Journey Callout Block (Exactly matching screenshot bottom section) */}
    <section style={{
      padding: "100px 24px",
      background: "#080306",
      color: "#f8f0f2",
      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      <div className="orb orb-magenta" style={{ width: 400, height: 400, bottom: "-100px", right: "-100px", opacity: 0.07 }} />

      <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
        {/* Callout Title */}
        <h2 style={{
          fontFamily: "'Outfit',sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
          letterSpacing: "-0.01em",
          color: "#fff",
          marginBottom: 16
        }}>
          Start Your Banking Journey as Partner Today
        </h2>

        {/* Description with highlights */}
        <p style={{
          color: "var(--text-secondary)",
          maxWidth: 600,
          margin: "0 auto 36px",
          fontSize: 16,
          lineHeight: 1.8
        }}>
          Join thousands of successful retailers who have transformed their business with SiD Pay. Earn up to <span style={{ color: "#ef5350", fontWeight: 700 }}>₹12 Lakh</span> annually!
        </p>

        {/* CTA Button */}
        <Link to="/contact">
          <button style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "15px 36px",
            background: "linear-gradient(135deg, #e53935 0%, #f4511e 100%)",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 14.5,
            border: "none",
            borderRadius: 12,
            boxShadow: "0 6px 20px rgba(229, 57, 53, 0.3)",
            cursor: "pointer",
            transition: "all 0.25s ease",
            letterSpacing: "0.02em"
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(229, 57, 53, 0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(229, 57, 53, 0.35)"; }}
          >
            JOIN AS PARTNER NOW
          </button>
        </Link>
      </div>
    </section>
  </>
);

export default Partners;
