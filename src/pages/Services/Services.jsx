import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiCheckCircle, FiArrowRight, FiShield } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { fetchServices } from "../../services/serviceService";
import { renderServiceIcon } from "../../utils/iconHelper";

const staticFallbackServices = [
  {
    icon: "💳",
    title: "Digital Payment Solutions",
    desc: "Robust online and terminal payment services built for scale.",
    features: [
      "Online Payment Gateway – UPI, Cards, Net Banking, Wallets",
      "POS & Android POS Devices",
      "QR-Based Contactless Payments",
      "QR Code Solutions",
      "Sound Box Services"
    ],
    color: "#e53935",
  },
  {
    icon: "🏦",
    title: "Assisted Banking & Cash Management",
    desc: "Cash-out and basic banking operations at merchant locations.",
    features: [
      "AEPS – Cash withdrawal, balance inquiry, mini statement",
      "Micro ATM (mATM) services"
    ],
    color: "#f4511e",
  },
  {
    icon: "⚡",
    title: "BBPS, Recharge & Bill Payments",
    desc: "National utility payments, mobile top-ups and credit cards bills processing.",
    features: [
      "Mobile, DTH & data card recharges",
      "Credit card bill payments"
    ],
    color: "#d81b60",
  },
  {
    icon: "📈",
    title: "Lending & Credit Solutions",
    desc: "Fast, digital credit and loan onboarding solutions for retailers.",
    features: [
      "Business loans & working capital finance",
      "Personal loans with digital onboarding",
      "Credit card sourcing and lifecycle support"
    ],
    color: "#e53935",
  },
  {
    icon: "🛡️",
    title: "Insurance Solutions",
    desc: "Protect your health, life, and travel with simplified policy issuances.",
    features: [
      "Health insurance",
      "Life insurance",
      "General & travel insurance"
    ],
    color: "#f4511e",
  },
  {
    icon: "✈️",
    title: "Travel APIs & Travel Services",
    desc: "Ticketing APIs and holiday booking systems for agent networks.",
    features: [
      "Flight booking (Domestic & International)",
      "Bus ticket booking",
      "Train ticket booking",
      "Hotel booking",
      "Holiday packages"
    ],
    color: "#d81b60",
  },
  {
    icon: "⚙️",
    title: "Technology & API Services",
    desc: "Robust banking and payment APIs for fintech platforms and dashboards.",
    features: [
      "Payment, banking, travel & wallet APIs",
      "Merchant, distributor & admin dashboards",
      "White-label fintech & travel platforms"
    ],
    color: "#e53935",
  },
  {
    icon: "🌐",
    title: "Web Infrastructure & Maintenance",
    desc: "Professional web hosting, cloud infrastructure setup and maintenance.",
    features: [
      "Cloud infrastructure setup",
      "Secure website hosting",
      "Performance optimization",
      "24/7 server monitoring"
    ],
    color: "#f4511e",
  },
  {
    icon: "🛍️",
    title: "Ecommerce websites",
    desc: "Turnkey online stores with optimized user interfaces and shopping carts.",
    features: [
      "Online storefront builder",
      "Shopping cart integration",
      "Payment gateway connectivity",
      "Inventory management tools"
    ],
    color: "#d81b60",
  },
  {
    icon: "💻",
    title: "software development",
    desc: "General purpose software engineering services across standard tech stacks.",
    features: [
      "Custom application logic",
      "Database design & modeling",
      "API integrations",
      "System maintenance"
    ],
    color: "#e53935",
  },
  {
    icon: "🛠️",
    title: "Customised software development",
    desc: "Tailored enterprise solutions built exactly to meet your custom business needs.",
    features: [
      "Tailor-made software architectures",
      "Proprietary tool configurations",
      "Legacy migration support",
      "Enterprise scale engineering"
    ],
    color: "#f4511e",
  },
  {
    icon: "🏷️",
    title: "White label software",
    desc: "Branded applications pre-configured to launch under your own domain name.",
    features: [
      "Custom branding and logos",
      "Domain masking capabilities",
      "Ready-made platform configurations",
      "Automated updates"
    ],
    color: "#d81b60",
  }
];

const Services = () => {
  const { tenantId } = useAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchServices(tenantId);
      if (data && data.length > 0) {
        setList(data);
      } else {
        setList(staticFallbackServices);
      }
      setLoading(false);
    };
    load();
  }, [tenantId]);

  return (
    <>
      <Helmet>
        <title>Services – SiD Pay</title>
        <meta name="description" content="Explore SiD Pay's full suite of financial, banking, API, and custom software development services." />
      </Helmet>

      {/* Hero */}
      <section style={{
        paddingTop: 120,
        paddingBottom: 72,
        background: "linear-gradient(180deg, #f4f7f6 0%, #ffffff 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          width: 500,
          height: 500,
          top: -200,
          right: -50,
          background: "radial-gradient(circle, rgba(229,57,53,0.02) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            borderRadius: "999px",
            background: "rgba(229,57,53,0.07)",
            border: "1px solid rgba(229,57,53,0.18)",
            fontSize: 11,
            fontWeight: 700,
            color: "#e53935",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 16
          }}>
            <FiShield size={12} /> Our Products
          </div>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem,4vw,2.8rem)",
            letterSpacing: "-0.02em",
            color: "#0c0509",
            marginBottom: 16,
            marginTop: 0
          }}>
            Comprehensive{" "}
            <span style={{
              background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Financial Toolkit
            </span>
          </h1>
          <p style={{ color: "#524449", maxWidth: 540, margin: "0 auto", fontSize: 16, lineHeight: 1.75 }}>
            From digital payment solutions and assisted banking services to custom software development and white-label fintech platforms.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ paddingBottom: 100, background: "#ffffff" }}>
        <div className="container">
          {loading ? (
            <div style={{ padding: "80px 0", textAlign: "center", color: "#524449" }}>
              Loading financial services list...
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }} className="srv-grid">
              {list.map((s, i) => (
                <div key={i} style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  borderRadius: 24,
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.015)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%"
                }}
                  className="service-page-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = "rgba(229, 57, 53, 0.15)";
                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(229, 57, 53, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.05)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.015)";
                  }}>
                  {/* Top Image area */}
                  <div style={{ width: "100%", height: 160, position: "relative", overflow: "hidden", background: "#f4f7f6" }}>
                    {s.image ? (
                      <img src={s.image} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, rgba(229,57,53,0.06) 0%, rgba(216,27,96,0.03) 100%)" }} />
                    )}

                    {/* Floating Icon top left */}
                    <div style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      width: 36,
                      height: 36,
                      background: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid rgba(0, 0, 0, 0.06)",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                    }}>
                      {renderServiceIcon(s.icon, { size: 18, color: "#e53935" })}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: "24px 24px 28px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h2 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: 18,
                        color: "#0c0509",
                        marginBottom: 10,
                        marginTop: 0
                      }}>{s.title}</h2>
                      <p style={{ color: "#524449", fontSize: 13.5, lineHeight: 1.6, marginBottom: 16 }}>{s.desc || s.description}</p>
                      
                      {s.features && (
                        <ul style={{ display: "flex", flexDirection: "column", gap: 8, listStyle: "none", padding: 0, margin: "0 0 16px 0" }}>
                          {s.features.map((f) => (
                            <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: "#524449", lineHeight: 1.4 }}>
                              <FiCheckCircle size={13} style={{ color: "#e53935", flexShrink: 0, marginTop: 2 }} />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Banner */}
          <div style={{
            marginTop: 60,
            padding: "40px 36px",
            background: "linear-gradient(135deg, rgba(229,57,53,0.06), rgba(216,27,96,0.03))",
            border: "1px solid rgba(229, 57, 53, 0.15)",
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24
          }}>
            <div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(1.2rem,2.5vw,1.6rem)", color: "#0c0509", margin: "0 0 8px 0" }}>
                Need a customised software solution?
              </h3>
              <p style={{ color: "#524449", fontSize: 15, margin: 0 }}>Speak directly to our developers and configure white-label options.</p>
            </div>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <button style={{
                padding: "12px 24px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 14.5,
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(229,57,53,0.22)",
                transition: "all 0.2s ease"
              }}
                onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
              >
                Request Callback <FiArrowRight size={15} />
              </button>
            </Link>
          </div>
        </div>
        <style>{`
          @media(max-width:1024px){.srv-grid{grid-template-columns:repeat(2,1fr)!important;}}
          @media(max-width:600px) {.srv-grid{grid-template-columns:1fr!important;}}
        `}</style>
      </section>
    </>
  );
};

export default Services;
