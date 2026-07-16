import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiPlay,
  FiTrendingUp,
  FiShield,
  FiUsers,
  FiBriefcase,
  FiZap,
  FiHeadphones
} from "react-icons/fi";

const stats = [
  { icon: FiUsers,      value: "1,00,000+", label: "Merchants"  },
  { icon: FiBriefcase,  value: "500+",     label: "Partners"   },
  { icon: FiZap,        value: "99.9%",    label: "Uptime"     },
  { icon: FiHeadphones, value: "24x7",     label: "Support"    },
];

const Hero = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section style={{
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(135deg, #f4f7f6 0%, #ffffff 100%)",
      paddingTop: 116,
      paddingBottom: 20,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      color: "#0c0509"
    }} className="hero-section">
      {/* Bg grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(229,57,53,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(229,57,53,0.02) 1px,transparent 1px)",
        backgroundSize: "64px 64px"
      }} />
      
      {/* Subtle orbs */}
      <div style={{
        position: "absolute",
        width: 500,
        height: 500,
        top: -150,
        right: -100,
        background: "radial-gradient(circle, rgba(229,57,53,0.04) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        width: 400,
        height: 400,
        bottom: -50,
        left: -100,
        background: "radial-gradient(circle, rgba(216,27,96,0.03) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1, padding: "0 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 40,
          alignItems: "center",
        }} className="hero-main-grid">

          {/* ── LEFT ── */}
          <div style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "none" : "translateY(16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: "999px",
              background: "rgba(229,57,53,0.07)",
              border: "1px solid rgba(229,57,53,0.18)",
              fontSize: 11.5,
              fontWeight: 700,
              color: "#e53935",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}>
              <FiShield size={12} /> Trusted by 1 Lakh+ Merchants
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              lineHeight: 1.1,
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              letterSpacing: "-0.03em",
              color: "#0c0509",
              marginBottom: 18,
            }}>
              One Platform for{" "}
              <span style={{
                background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                BBPS &amp; Recharge
              </span>
              <br />Services
            </h1>

            <p style={{
              color: "#524449",
              fontSize: "clamp(0.92rem,1.3vw,1.02rem)",
              lineHeight: 1.7,
              maxWidth: 480,
              marginBottom: 28,
            }}>
              Electricity, water, gas, mobile, and DTH bill payments — all under one platform. Fast, secure, and compliance-ready for merchants and distributors.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 12 }}>
              <Link to="/register">
                <button style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "12px 26px",
                  fontFamily: "'Inter',sans-serif",
                  fontWeight: 700,
                  fontSize: 14.5,
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                  color: "#fff",
                  boxShadow: "0 4px 22px rgba(229,57,53,0.25)",
                  transition: "all 0.28s ease",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 36px rgba(229,57,53,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 22px rgba(229,57,53,0.25)"; }}>
                  Get Started <FiArrowRight size={16} />
                </button>
              </Link>
              <Link to="/contact">
                <button style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "11px 22px",
                  fontFamily: "'Inter',sans-serif",
                  fontWeight: 600,
                  fontSize: 14.5,
                  borderRadius: "999px",
                  background: "transparent",
                  color: "#e53935",
                  border: "1.5px solid rgba(229,57,53,0.35)",
                  cursor: "pointer",
                  transition: "all 0.28s ease",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(229,57,53,0.05)"; e.currentTarget.style.borderColor = "rgba(229,57,53,0.6)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(229,57,53,0.35)"; }}>
                  <FiPlay size={14} /> Book Demo
                </button>
              </Link>
            </div>
          </div>

          {/* ── RIGHT – Light Analytics Card ── */}
          <div style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "none" : "translateY(16px) scale(0.98)",
            transition: "opacity 0.85s ease 0.18s, transform 0.85s ease 0.18s",
          }}>
            <div style={{ animation: "float 5s ease-in-out infinite", position: "relative" }}>
              {/* Main card */}
              <div style={{
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.05)",
                borderRadius: 24,
                padding: 24,
                boxShadow: "0 20px 48px rgba(0,0,0,0.06)",
              }}>
                {/* Top row */}
                <div style={{ display: "flex", gap: 16, marginBottom: 22 }}>
                  {/* Revenue card */}
                  <div style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #e53935, #d81b60)",
                    borderRadius: 14,
                    padding: "16px 18px",
                    boxShadow: "0 8px 20px rgba(229,57,53,0.2)"
                  }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 500, marginBottom: 8 }}>Total Revenue</div>
                    <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 26, color: "#fff", letterSpacing: "-0.02em" }}>₹4.6Cr</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
                      <FiTrendingUp size={12} /> +14.5% this month
                    </div>
                  </div>
                  {/* Success rate */}
                  <div style={{
                    background: "#f4f7f6",
                    border: "1px solid #e1e6eb",
                    borderRadius: 14,
                    padding: "16px 18px",
                    minWidth: 120
                  }}>
                    <div style={{ fontSize: 11, color: "#77676c", fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2e7d32", boxShadow: "0 0 6px #4ade80" }} /> Success Rate
                    </div>
                    <div style={{
                      fontFamily: "'Outfit',sans-serif",
                      fontWeight: 900,
                      fontSize: 26,
                      background: "linear-gradient(135deg,#e53935,#d81b60)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}>99.1%</div>
                    <div style={{ fontSize: 11, color: "#77676c", marginTop: 6 }}>12,080 transactions</div>
                  </div>
                </div>

                {/* Chart header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0c0509" }}>Transaction Analytics</div>
                  <div style={{ fontSize: 11, color: "#77676c", fontWeight: 500 }}>Last 7 days</div>
                </div>

                {/* Bar chart */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 7, height: 72, marginBottom: 10 }}>
                  {[38, 52, 44, 68, 56, 82, 73].map((h, i) => (
                    <div key={i} style={{
                      flex: 1,
                      borderRadius: "5px 5px 0 0",
                      background: i === 5
                        ? "linear-gradient(180deg, #e53935, #d81b60)"
                        : "rgba(229,57,53,0.12)",
                      height: `${h}%`,
                      boxShadow: i === 5 ? "0 0 14px rgba(229,57,53,0.25)" : "none",
                      transition: "all 0.3s ease",
                    }} />
                  ))}
                </div>
                <div style={{ display: "flex", gap: 7 }}>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                    <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 10, color: "#77676c", fontWeight: 500 }}>{d}</div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div style={{
                position: "absolute",
                top: -14,
                right: -14,
                background: "linear-gradient(135deg,#e53935,#d81b60)",
                borderRadius: 12,
                padding: "10px 16px",
                boxShadow: "0 6px 22px rgba(229,57,53,0.25)",
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}>
                <FiShield size={14} /> 256-bit Encrypted
              </div>
              <div style={{
                position: "absolute",
                bottom: -14,
                left: -14,
                background: "#ffffff",
                border: "1.5px solid #e1e6eb",
                borderRadius: 12,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 6px 24px rgba(0,0,0,0.04)",
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#2e7d32" }}>Payment Successful</div>
                  <div style={{ fontSize: 11, color: "#77676c" }}>₹4,200 settled instantly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* Closes container */}

      {/* ── Stats Belt (Height same as Navbar - 64px - Loop Running Right) ── */}
      <div className="stats-belt" style={{
        background: "#110709",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        width: "100%",
        marginTop: 54, // Increased margin to let the PC screen view breathe!
        height: 64, // Exact same height as navbar!
        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        zIndex: 2,
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Track Container */}
        <div style={{
          display: "flex",
          width: "200%",
          height: "100%",
          animation: "marqueeRight 14s linear infinite"
        }} className="stats-marquee-track">
          
          {/* Set 1 */}
          <div style={{ display: "flex", width: "50%", height: "100%", justifyContent: "space-around" }}>
            {stats.map(({ icon: Icon, value, label }, i) => (
              <div key={`set1-${i}`} className="stat-card" style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                borderRight: "1px solid rgba(255, 255, 255, 0.06)",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                minWidth: 160
              }}>
                <div className="stat-card-content" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ color: "#e53935", display: "flex", alignItems: "center" }}>
                    <Icon size={18} />
                  </div>
                  <div style={{
                    fontFamily: "'Outfit',sans-serif",
                    fontWeight: 900,
                    fontSize: 16,
                    color: "#e53935",
                  }}>{value}</div>
                  <div style={{ fontSize: 13, color: "#c9a8b4", fontWeight: 600 }}>{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Set 2 (Seamless loop) */}
          <div style={{ display: "flex", width: "50%", height: "100%", justifyContent: "space-around" }}>
            {stats.map(({ icon: Icon, value, label }, i) => (
              <div key={`set2-${i}`} className="stat-card" style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                borderRight: "1px solid rgba(255, 255, 255, 0.06)",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                minWidth: 160
              }}>
                <div className="stat-card-content" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ color: "#e53935", display: "flex", alignItems: "center" }}>
                    <Icon size={18} />
                  </div>
                  <div style={{
                    fontFamily: "'Outfit',sans-serif",
                    fontWeight: 900,
                    fontSize: 16,
                    color: "#e53935",
                  }}>{value}</div>
                  <div style={{ fontSize: 13, color: "#c9a8b4", fontWeight: 600 }}>{label}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        .stat-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(229, 57, 53, 0.12) 0%, transparent 100%);
          transition: left 0.15s ease-out;
          z-index: 0;
        }
        .stat-card:hover::after {
          left: 0;
        }
        .stat-card-content {
          position: relative;
          z-index: 1;
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @media(max-width:900px){
          .hero-section {
            padding-top: 76px !important;
            padding-bottom: 0 !important;
          }
          .stats-belt {
            margin-top: 24px !important;
          }
          .hero-main-grid{grid-template-columns:1fr!important; gap: 32px!important;}
          .hero-main-grid>div:last-child{display:none!important;}
        }
        @media(max-width:560px){
          .stats-row{grid-template-columns:repeat(2,1fr)!important;}
          .stats-row>div:nth-child(2){border-right:none!important;}
          .stats-row>div:nth-child(3){border-right:1px solid rgba(255, 255, 255, 0.06)!important;}
          .stats-row>div:nth-child(1),.stats-row>div:nth-child(2){border-bottom:1px solid rgba(255, 255, 255, 0.06)!important;}
        }
      `}</style>
    </section>
  );
};

export default Hero;



