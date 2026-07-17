import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FiArrowRight, FiCheckCircle, FiDollarSign, FiShield, FiHeadphones, FiTrendingUp } from "react-icons/fi";
import { fetchServices } from "../../services/serviceService";
import { renderServiceIcon } from "../../utils/iconHelper";

const partnerServicesList = [
  { title: "MATM", subtitle: "Micro ATM Services", icon: "FiSmartphone", to: "/services/assisted-banking" },
  { title: "POS MACHINE", subtitle: "Point of Sale Solutions", icon: "FiCreditCard", to: "/services/digital-payment-solutions" },
  { title: "CC BILL PAY", subtitle: "Credit Card Bill Payments", icon: "FiFileText", to: "/services/bbps-recharge" },
  { title: "RECHARGE", subtitle: "Mobile & DTH Recharge", icon: "FiPhoneCall", to: "/services/bbps-recharge" },
  { title: "BBPS", subtitle: "Bharat Bill Payment System", icon: "FiZap", to: "/services/bbps-recharge" },
  { title: "COLLECT", subtitle: "Payment Collection Services", icon: "FiInbox", to: "/services/digital-payment-solutions" },
  { title: "CREDIT CARD", subtitle: "Credit Card Services", icon: "FiCreditCard", to: "/services/lending-credit" },
  { title: "LOAN", subtitle: "Loan Services", icon: "FiTrendingUp", to: "/services/lending-credit" },
  { title: "INSURANCE", subtitle: "Insurance", icon: "FiShield", to: "/services/insurance-solutions" }
];

const benefitsList = [
  { title: "0 investment business", icon: FiDollarSign, color: "#e53935" },
  { title: "simple joining process", icon: FiShield, color: "#f4511e" },
  { title: "24*7 customer service", icon: FiHeadphones, color: "#d81b60" },
  { title: "Earn upto ₹4 Lakh to ₹12 Lakh per annum", icon: FiTrendingUp, color: "#e53935", badge: "High Income" }
];

const Partners = () => {
  const { isAuthenticated, tenantId } = useAuth();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchServices(tenantId);
        setServices(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [tenantId]);

  const displayServices = services.length > 0
    ? services.map(s => ({
        title: s.title,
        subtitle: s.description || s.category || "Premium Service",
        icon: s.icon,
        to: `/services/${s.id || s.slug}`,
        isDynamic: true
      }))
    : partnerServicesList;

  // Duplicate benefitsList for seamless marquee scroll loop
  const marqueeBenefits = [...benefitsList, ...benefitsList, ...benefitsList];

  return (
    <>
      <Helmet>
        <title>Partners Onboarding – SiD Pay</title>
        <meta name="description" content="Start your banking and digital finance business journey as a strategic partner with SiD Pay today." />
      </Helmet>

      {/* Section 1: Light Theme Hero Block */}
      <section style={{
        padding: "76px 24px 48px",
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
            marginBottom: 20
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
            margin: "0 auto 28px",
            fontSize: 16,
            lineHeight: 1.65
          }}>
            Enabling Indian SMEs to maximise their earning within a single platform. Join the revolution of digital finance.
          </p>

          {/* Get Started Button */}
          <Link to={isAuthenticated ? "/admin" : "/register"}>
            <button style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 32px",
              background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 14.5,
              border: "none",
              borderRadius: "999px",
              boxShadow: "0 6px 20px rgba(229, 57, 53, 0.35)",
              cursor: "pointer",
              transition: "all 0.25s ease"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(229, 57, 53, 0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(229, 57, 53, 0.35)"; }}
            >
              {isAuthenticated ? "Go to Dashboard" : "Get Started"} <FiArrowRight size={16} />
            </button>
          </Link>
        </div>
      </section>

      {/* Section 2: Our Services */}
      <section style={{
        padding: "var(--section-py) 24px",
        background: "#f4f7f6",
        color: "#080306",
        textAlign: "center"
      }}>
        <div className="container">
          {/* Header */}
          <div style={{ marginBottom: 44 }}>
            <h2 style={{
              fontFamily: "'Outfit',sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
              letterSpacing: "-0.01em",
              color: "#0c0509",
              marginBottom: 12,
              marginTop: 0
            }}>
              Our Services
            </h2>
            <p style={{ color: "#524449", fontSize: 15, margin: 0 }}>
              Comprehensive banking and financial solutions
            </p>
            <div style={{ width: 44, height: 3, background: "linear-gradient(90deg, #e53935, #d81b60)", borderRadius: 2, margin: "14px auto 0" }} />
          </div>

          {/* Services Cards Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20
          }} className="partner-services-grid">
            {displayServices.map((item, idx) => (
              <Link key={idx} to={item.to} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  borderRadius: 18,
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.02)",
                  transition: "all 0.28s ease",
                  cursor: "pointer",
                  height: "100%",
                  boxSizing: "border-box"
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 10px 24px rgba(229, 57, 53, 0.08)";
                    e.currentTarget.style.borderColor = "rgba(229, 57, 53, 0.2)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.02)";
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
                    marginBottom: 16
                  }}>
                    {renderServiceIcon(item.icon, { height: "20px", width: "auto", color: "#e53935", objectFit: "contain" })}
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
                    margin: "6px 0 0 0",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: SiD Pay Benefits (Compact automatic left scrolling marquee) */}
      <section style={{
        padding: "var(--section-py) 0",
        background: "#0c0509",
        color: "#f8f0f2",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        overflow: "hidden"
      }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          
          {/* Header */}
          <div style={{ marginBottom: 36, padding: "0 24px" }}>
            <span style={{
              fontSize: 10.5,
              fontWeight: 800,
              color: "#ffffff",
              background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "5px 14px",
              borderRadius: 20,
              display: "inline-block",
              boxShadow: "0 4px 12px rgba(229,57,53,0.25)",
              marginBottom: 14
            }}>
              AAPKA BUSINESS HUMARA INVESTMENT
            </span>
            <h2 style={{
              fontFamily: "'Outfit',sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
              letterSpacing: "-0.01em",
              marginTop: 4,
              color: "#fff",
              marginBottom: 0
            }}>
              SiD Pay Benefits
            </h2>
          </div>

          {/* Scrolling Marquee Container */}
          <div style={{
            width: "100%",
            overflow: "hidden",
            position: "relative",
            padding: "8px 0"
          }} className="benefits-marquee-container">
            
            {/* Side Fades */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 100,
              height: "100%",
              background: "linear-gradient(90deg, #0c0509 0%, transparent 100%)",
              zIndex: 3,
              pointerEvents: "none"
            }} />
            
            <div style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 100,
              height: "100%",
              background: "linear-gradient(-90deg, #0c0509 0%, transparent 100%)",
              zIndex: 3,
              pointerEvents: "none"
            }} />

            {/* Marquee Track */}
            <div style={{
              display: "flex",
              width: "max-content",
              animation: "benefitsMarquee 26s linear infinite"
            }} className="benefits-marquee-track">
              {marqueeBenefits.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      background: item.badge ? "rgba(229, 57, 53, 0.04)" : "rgba(255, 255, 255, 0.02)",
                      border: item.badge ? "1.5px solid rgba(229, 57, 53, 0.22)" : "1px solid rgba(255,255,255,0.05)",
                      borderRadius: 16,
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      width: 290,
                      height: 84,
                      position: "relative",
                      marginRight: 20,
                      flexShrink: 0,
                      boxSizing: "border-box",
                      transition: "transform 0.25s ease, border-color 0.25s ease",
                      textAlign: "left"
                    }}
                    className="benefit-marquee-card"
                  >
                    {/* Floating tag */}
                    {item.badge && (
                      <span style={{
                        position: "absolute",
                        top: -8,
                        right: 12,
                        fontSize: 8,
                        fontWeight: 800,
                        background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                        color: "#ffffff",
                        padding: "2px 8px",
                        borderRadius: 6,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        boxShadow: "0 2px 6px rgba(229,57,53,0.3)"
                      }}>
                        {item.badge}
                      </span>
                    )}

                    {/* Icon Container */}
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: item.badge ? "rgba(229, 57, 53, 0.15)" : "rgba(229, 57, 53, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ef5350",
                      flexShrink: 0
                    }}>
                      <Icon size={18} />
                    </div>

                    {/* Content text */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <h3 style={{
                        fontFamily: "'Outfit',sans-serif",
                        fontWeight: 700,
                        fontSize: 13.5,
                        lineHeight: 1.35,
                        color: "#f8f0f2",
                        margin: 0
                      }}>
                        {item.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* Section 4: Light Theme Journey Callout Block */}
      <section style={{
        padding: "var(--section-py) 24px",
        background: "#ffffff",
        color: "#0c0509",
        borderTop: "1px solid rgba(0, 0, 0, 0.05)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle glowing backdrops */}
        <div style={{
          position: "absolute",
          top: "-30%",
          left: "-10%",
          width: 320,
          height: 320,
          background: "radial-gradient(circle, rgba(229,57,53,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(50px)"
        }} />
        <div style={{
          position: "absolute",
          bottom: "-30%",
          right: "-10%",
          width: 320,
          height: 320,
          background: "radial-gradient(circle, rgba(216,27,96,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(50px)"
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 640 }}>
          <h2 style={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
            letterSpacing: "-0.01em",
            color: "#0c0509",
            marginBottom: 14,
            marginTop: 0
          }}>
            Become Our Partner Today
          </h2>
          <p style={{ color: "#524449", maxWidth: 520, margin: "0 auto 28px", fontSize: 15, lineHeight: 1.6 }}>
            Empower your merchant network with cutting-edge retail banking, utility payments, and financial API services.
          </p>

          <Link to={isAuthenticated ? "/admin" : "/register"} style={{ textDecoration: "none" }}>
            <button style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 36px",
              background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
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
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(229, 57, 53, 0.3)"; }}
            >
              JOIN AS PARTNER NOW
            </button>
          </Link>
        </div>
      </section>

      <style>{`
        .benefits-marquee-track:hover {
          animation-play-state: paused;
        }
        .benefit-marquee-card:hover {
          transform: translateY(-2px);
          border-color: rgba(229, 57, 53, 0.35) !important;
          background: rgba(229, 57, 53, 0.06) !important;
        }
        @keyframes benefitsMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @media(max-width:900px){
          .partner-services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media(max-width:560px){
          .partner-services-grid {
            grid-template-columns: 1fr !important;
          }
          .cta-glass-card {
            padding: 32px 20px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Partners;
