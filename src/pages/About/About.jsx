import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FiCheckCircle, FiShoppingBag, FiGlobe, FiUsers, FiLock, FiShield, FiZap, FiUserCheck, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { fetchPartners } from "../../services/partnerService";
import { renderServiceIcon } from "../../utils/iconHelper";

const PAGE_SIZE = 6;

const About = () => {
  const { tenantId } = useAuth();
  const [activeTab, setActiveTab] = useState("mission");
  const [partners, setPartners] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const data = await fetchPartners(tenantId);
        setPartners(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    loadPartners();
  }, [tenantId]);

  const totalPages = Math.ceil(partners.length / PAGE_SIZE);
  const visiblePartners = partners.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <>
      <Helmet>
        <title>About Us – SiD Pay by Shashwat</title>
        <meta name="description" content="Learn about SiD Pay — India's most trusted digital banking and payment gateway partner." />
      </Helmet>

      {/* Section 1: Header & Main Info (Collage layout) */}
      <section style={{
        padding: "76px 24px 40px",
        background: "#ffffff",
        color: "#0c0509",
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="container">


          {/* Flex Split */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center"
          }} className="about-split-grid">
            
            {/* Left Collage Column */}
            <div style={{ position: "relative", minHeight: 380 }} className="about-collage-container">
              {/* Main Image */}
              <div style={{
                width: "80%",
                height: 280,
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 12px 36px rgba(0,0,0,0.15)",
                border: "4px solid #fff"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                  alt="SiD Pay Team"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Overlapping offset Image */}
              <div style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                width: "45%",
                height: 180,
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 12px 36px rgba(0,0,0,0.2)",
                border: "6px solid #fff"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                  alt="Fintech Manager"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Red badge */}
              <div style={{
                position: "absolute",
                top: 20,
                right: "10%",
                background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                borderRadius: 16,
                padding: "16px 24px",
                color: "#fff",
                boxShadow: "0 8px 24px rgba(229,57,53,0.3)",
                textAlign: "center",
                zIndex: 3
              }}>
                <div style={{ fontSize: 24, fontWeight: 900 }}>30K+</div>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", marginTop: 4, textTransform: "uppercase" }}>Active Partners</div>
              </div>
            </div>

            {/* Right Info Column */}
            <div>
              <span style={{
                fontSize: 12,
                fontWeight: 800,
                color: "#e53935",
                textTransform: "uppercase",
                letterSpacing: "0.08em"
              }}>
                ABOUT SID PAY
              </span>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                color: "#0c0509",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginTop: 10,
                marginBottom: 20
              }}>
                Powering Digital Finance for Modern Indian Businesses
              </h2>

              <p style={{ color: "#524449", fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>
                SiD Pay is a technology-driven fintech and digital financial services company delivering secure, scalable, and compliance-ready solutions across India.
              </p>

              <p style={{ color: "#524449", fontSize: 15, lineHeight: 1.75, marginBottom: 32 }}>
                Designed to serve merchants, MSMEs, enterprises, partners, and consumers, SiD Pay combines robust financial infrastructure with innovation-led technology to simplify transactions and enable sustainable business growth.
              </p>

              {/* Check Features */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "18px 24px"
              }} className="about-bullets">
                {[
                  "Secure & Scalable Payment Solutions",
                  "Banking, Credit & Insurance Services",
                  "API-Led Financial Infrastructure",
                  "Trusted Platform for MSMEs & Enterprises"
                ].map((feat, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <FiCheckCircle size={15} style={{ color: "#e53935", flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: "#2d2427", lineHeight: 1.4 }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: Bottom Counters Bar (Cyan/Red Gradient matching screenshot) */}
      <section style={{
        background: "linear-gradient(90deg, #e53935 0%, #d81b60 100%)",
        padding: "48px 24px",
        color: "#ffffff"
      }}>
        <div className="container">
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 32
          }} className="about-stats-row">
            {[
              { value: "1000+", label: "PARTNER RETAILERS", icon: FiShoppingBag },
              { value: "50+", label: "CITIES COVERED", icon: FiGlobe },
              { value: "10k", label: "HAPPY CUSTOMERS", icon: FiUsers },
              { value: "100%", label: "SECURE TRANSACTIONS", icon: FiLock }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  flex: "1 1 200px"
                }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0
                  }}>
                    <Icon size={18} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 900, fontFamily: "'Outfit',sans-serif" }}>{stat.value}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, letterSpacing: "0.06em", marginTop: 2 }}>{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Our Mission & Vision (Exactly matching layout in screenshot) */}
      <section style={{
        padding: "64px 24px 72px",
        background: "#f8f9fa",
        color: "#0c0509"
      }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 60,
            alignItems: "center"
          }} className="about-split-grid">
            
            {/* Left Content */}
            <div>
              <span style={{
                fontSize: 12.5,
                fontWeight: 800,
                color: "#e53935",
                textTransform: "uppercase",
                letterSpacing: "0.08em"
              }}>
                OUR MISSION & VISION
              </span>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                color: "#0c0509",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginTop: 10,
                marginBottom: 28
              }}>
                Our Main Goal to Satisfied Local &amp; Global Clients
              </h2>

              {/* Tabs list */}
              <div style={{ display: "flex", gap: 14, marginBottom: 28 }}>
                <button
                  onClick={() => setActiveTab("mission")}
                  style={{
                    padding: "10px 24px",
                    borderRadius: 999,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    border: "none",
                    background: activeTab === "mission" ? "linear-gradient(135deg, #e53935 0%, #d81b60 100%)" : "#e9ecef",
                    color: activeTab === "mission" ? "#fff" : "#495057",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  Our Mission
                </button>
                <button
                  onClick={() => setActiveTab("vision")}
                  style={{
                    padding: "10px 24px",
                    borderRadius: 999,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    border: "none",
                    background: activeTab === "vision" ? "linear-gradient(135deg, #e53935 0%, #d81b60 100%)" : "#e9ecef",
                    color: activeTab === "vision" ? "#fff" : "#495057",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  Our Vision
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === "mission" ? (
                <div>
                  <p style={{
                    fontStyle: "italic",
                    color: "#e53935",
                    fontSize: 15,
                    lineHeight: 1.6,
                    marginBottom: 20,
                    fontWeight: 500
                  }}>
                    "To build a secure, intelligent, and inclusive digital ecosystem that enables financial services for all."
                  </p>
                  <p style={{ color: "#524449", fontSize: 14.5, lineHeight: 1.75 }}>
                    Our mission is to build a secure, intelligent, and inclusive digital ecosystem that seamlessly enables payments, banking, credit, insurance, travel, and API-driven financial services. We focus on creating technology-led solutions that are reliable, compliant, and easy to use, empowering both businesses and individuals to access essential financial services. By simplifying complex financial processes and ensuring trust at every level, we help our partners, merchants, and users grow with confidence and long-term stability in an evolving digital economy.
                  </p>
                </div>
              ) : (
                <div>
                  <p style={{
                    fontStyle: "italic",
                    color: "#e53935",
                    fontSize: 15,
                    lineHeight: 1.6,
                    marginBottom: 20,
                    fontWeight: 500
                  }}>
                    "To become the most reliable and widely accessible digital banking gateway in India."
                  </p>
                  <p style={{ color: "#524449", fontSize: 14.5, lineHeight: 1.75 }}>
                    Our vision is to empower every SME and retailer in India with instant fintech enablement. We strive to continually innovate, expanding our API infrastructure to cover the deepest corners of the country and create an inclusive banking environment where technology simplifies commerce for everyone.
                  </p>
                </div>
              )}
            </div>

            {/* Right Image */}
            <div style={{
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              border: "4px solid #fff"
            }}>
              <img
                src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=600&q=80"
                alt="Main Goal satisfied clients"
                style={{ width: "100%", height: 320, objectFit: "cover" }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: Our Core Values (Exactly matching layout in screenshot) */}
      <section style={{
        padding: "64px 24px",
        background: "#ffffff",
        color: "#0c0509",
        textAlign: "center"
      }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              color: "#0c0509",
              letterSpacing: "-0.01em",
              marginBottom: 10
            }}>
              Our Core Values
            </h2>
            <p style={{ color: "#524449", fontSize: 15 }}>
              Built on the foundation of trust, innovation, and excellence
            </p>
          </div>

          {/* Values Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24
          }} className="about-values-grid">
            
            {/* Card 1 */}
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.05)",
              borderRadius: 20,
              padding: "40px 32px",
              textAlign: "left",
              boxShadow: "0 8px 24px rgba(0,0,0,0.02)",
              transition: "all 0.28s ease"
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(229,57,53,0.08)";
                e.currentTarget.style.borderColor = "rgba(229, 57, 53, 0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.02)";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)";
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(229, 57, 53, 0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e53935",
                fontSize: 20,
                marginBottom: 24
              }}>
                <FiShield size={20} />
              </div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 17, color: "#0c0509", marginBottom: 12 }}>
                Security First
              </h3>
              <p style={{ color: "#77676c", fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
                Bank-grade security protocols ensuring safe transactions
              </p>
            </div>

            {/* Card 2 */}
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.05)",
              borderRadius: 20,
              padding: "40px 32px",
              textAlign: "left",
              boxShadow: "0 8px 24px rgba(0,0,0,0.02)",
              transition: "all 0.28s ease"
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(229,57,53,0.08)";
                e.currentTarget.style.borderColor = "rgba(229, 57, 53, 0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.02)";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)";
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(229, 57, 53, 0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e53935",
                fontSize: 20,
                marginBottom: 24
              }}>
                <FiZap size={20} />
              </div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 17, color: "#0c0509", marginBottom: 12 }}>
                Innovation
              </h3>
              <p style={{ color: "#77676c", fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
                Cutting-edge technology driving financial solutions
              </p>
            </div>

            {/* Card 3 */}
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.05)",
              borderRadius: 20,
              padding: "40px 32px",
              textAlign: "left",
              boxShadow: "0 8px 24px rgba(0,0,0,0.02)",
              transition: "all 0.28s ease"
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(229,57,53,0.08)";
                e.currentTarget.style.borderColor = "rgba(229, 57, 53, 0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.02)";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)";
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(229, 57, 53, 0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e53935",
                fontSize: 20,
                marginBottom: 24
              }}>
                <FiUserCheck size={20} />
              </div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 17, color: "#0c0509", marginBottom: 12 }}>
                Customer Focus
              </h3>
              <p style={{ color: "#77676c", fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
                Dedicated to retailer success and satisfaction
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section 5: Strategic Partnerships (Automatic Left Scrolling Marquee) */}
      <section style={{
        padding: "64px 0",
        background: "#f8f9fa",
        color: "#0c0509",
        textAlign: "center",
        overflow: "hidden"
      }}>
        <div style={{ position: "relative" }}>
          {/* Header */}
          <div style={{ marginBottom: 36, padding: "0 24px" }}>
            <span style={{
              fontSize: 11,
              fontWeight: 800,
              color: "#e53935",
              textTransform: "uppercase",
              letterSpacing: "0.1em"
            }}>
              OUR TRUSTED NETWORK
            </span>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
              color: "#0c0509",
              letterSpacing: "-0.01em",
              marginTop: 6,
              marginBottom: 0
            }}>
              Strategic Partnerships
            </h2>
          </div>

          {partners.length === 0 ? (
            <div style={{ fontSize: 14, color: "#77676c", padding: "20px 0" }}>
              Loading network partnerships...
            </div>
          ) : (
            <div style={{
              width: "100%",
              overflow: "hidden",
              position: "relative",
              padding: "10px 0"
            }} className="partners-marquee-container">
              {/* Fade Edges */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 100,
                height: "100%",
                background: "linear-gradient(90deg, #f8f9fa 0%, transparent 100%)",
                zIndex: 3,
                pointerEvents: "none"
              }} />
              <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 100,
                height: "100%",
                background: "linear-gradient(-90deg, #f8f9fa 0%, transparent 100%)",
                zIndex: 3,
                pointerEvents: "none"
              }} />

              {/* Marquee Track */}
              <div style={{
                display: "flex",
                width: "max-content",
                animation: "partnersMarquee 26s linear infinite"
              }} className="partners-marquee-track">
                {marqueePartners.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "#ffffff",
                      border: "1px solid rgba(0,0,0,0.06)",
                      borderRadius: 16,
                      padding: "12px 20px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      width: 200,
                      height: 72,
                      marginRight: 16,
                      flexShrink: 0,
                      boxSizing: "border-box",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.01)",
                      transition: "transform 0.25s ease, border-color 0.25s ease"
                    }}
                    className="partner-marquee-card"
                  >
                    <div style={{
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                      background: "rgba(229, 57, 53, 0.05)",
                      overflow: "hidden",
                      flexShrink: 0
                    }}>
                      {renderServiceIcon(item.logo || item.emoji || "FiBriefcase", { size: 18 })}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#2d2427", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .partners-marquee-track:hover {
          animation-play-state: paused;
        }
        .partner-marquee-card:hover {
          transform: translateY(-2px);
          border-color: rgba(229, 57, 53, 0.2) !important;
          box-shadow: 0 6px 16px rgba(0,0,0,0.04) !important;
        }
        @keyframes partnersMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @media(max-width:960px){
          .about-values-grid {
            grid-template-columns: 1fr!important;
            gap: 20px!important;
          }
        }
        @media(max-width:860px){
          .about-split-grid {
            grid-template-columns: 1fr!important;
            gap: 40px!important;
          }
        }
      `}</style>
    </>
  );
};

export default About;
