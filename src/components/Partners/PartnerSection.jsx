import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiBriefcase } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { fetchPartners } from "../../services/partnerService";

const staticPartners = [
  {
    id: "paysprint",
    name: "PaySprint",
    logo: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <svg viewBox="0 0 100 60" width="120" height="42">
          <path d="M25,10 C45,10 45,30 25,30 L25,50 M25,22 C37,22 37,38 25,38 L25,50" fill="none" stroke="#e53935" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M25,10 L25,50" fill="none" stroke="#e53935" strokeWidth="8" strokeLinecap="round" />
          <text x="42" y="38" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="14" fill="#1e293b">Pay</text>
          <text x="42" y="52" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="14" fill="#e53935">Sprint</text>
        </svg>
      </div>
    )
  },
  {
    id: "axis",
    name: "Axis Bank",
    logo: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <svg viewBox="0 0 120 50" width="120" height="42">
          <polygon points="20,40 38,10 32,10 14,40" fill="#97144d" />
          <polygon points="30,40 48,10 42,10 24,40" fill="#97144d" />
          <text x="54" y="32" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="12" fill="#97144d">AXIS BANK</text>
        </svg>
      </div>
    )
  },
  {
    id: "hdfc",
    name: "HDFC Bank",
    logo: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <svg viewBox="0 0 120 50" width="120" height="42">
          <rect x="15" y="10" width="28" height="28" fill="#004c8f" rx="2" />
          <rect x="23" y="18" width="12" height="12" fill="#ffffff" />
          <rect x="27" y="10" width="4" height="28" fill="#e53935" />
          <rect x="15" y="22" width="28" height="4" fill="#e53935" />
          <text x="50" y="28" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="10.5" fill="#004c8f">HDFC BANK</text>
        </svg>
      </div>
    )
  },
  {
    id: "pinelabs",
    name: "Pine Labs",
    logo: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <svg viewBox="0 0 120 50" width="120" height="42">
          <path d="M15,25 C15,15 25,15 25,25 C25,35 15,35 15,25 Z" fill="#2e7d32" opacity="0.8" />
          <path d="M22,25 C22,15 32,15 32,25 C32,35 22,35 22,25 Z" fill="#4caf50" />
          <text x="38" y="30" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="13" fill="#334155">Pine Labs</text>
        </svg>
      </div>
    )
  },
  {
    id: "razorpay",
    name: "Razorpay",
    logo: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <svg viewBox="0 0 120 50" width="120" height="42">
          <text x="10" y="32" fontFamily="'Inter', sans-serif" fontWeight="900" fontStyle="italic" fontSize="16" fill="#004c8f">Razorpay</text>
          <path d="M92,12 L84,36 L89,36 L97,12 Z" fill="#00bcd4" />
        </svg>
      </div>
    )
  },
  {
    id: "instantmudra",
    name: "Instant Mudra",
    logo: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <svg viewBox="0 0 120 50" width="120" height="42">
          <text x="18" y="24" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="16" fill="#1e293b">im</text>
          <text x="10" y="34" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="8" fill="#e53935">Instant Mudra</text>
          <text x="10" y="42" fontFamily="'Inter', sans-serif" fontWeight="500" fontSize="6" fill="#64748b">अपना बैंक आपके द्वार</text>
        </svg>
      </div>
    )
  }
];

const PAGE_SIZE = 6;

const PartnerSection = () => {
  const { tenantId } = useAuth();
  const [partners, setPartners] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const load = async () => {
      const data = await fetchPartners(tenantId);
      if (data && data.length > 0) {
        setPartners(data);
      } else {
        setPartners(staticPartners);
      }
    };
    load();
  }, [tenantId]);

  if (partners.length === 0) {
    return null;
  }

  let baseList = [];
  if (partners.length > 0) {
    const repeatCount = Math.ceil(12 / partners.length);
    for (let i = 0; i < repeatCount; i++) {
      baseList.push(...partners);
    }
  }
  const marqueePartners = [...baseList, ...baseList];

  return (
    <section style={{
      padding: "48px 0",
      background: "linear-gradient(180deg, #ffffff 0%, #f4f7f6 100%)",
      color: "#0c0509",
      overflow: "hidden"
    }}>
      <div style={{ position: "relative" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32, padding: "0 24px" }}>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#524449",
            marginBottom: 8
          }}>
            OUR TRUSTED NETWORK
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
            letterSpacing: "-0.02em",
            color: "#0c0509",
            margin: 0
          }}>
            Strategic Partnerships
          </h2>
        </div>

        {/* Marquee Container */}
        <div style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          padding: "12px 0"
        }} className="partners-marquee-container">
          
          {/* Edge Fade Overlays */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 100,
            height: "100%",
            background: "linear-gradient(90deg, #ffffff 0%, transparent 100%)",
            zIndex: 3,
            pointerEvents: "none"
          }} />
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 100,
            height: "100%",
            background: "linear-gradient(-90deg, #f4f7f6 0%, transparent 100%)",
            zIndex: 3,
            pointerEvents: "none"
          }} />

          {/* Marquee Track */}
          <div style={{
            display: "flex",
            width: "max-content",
            animation: "partnersMarquee 26s linear infinite"
          }} className="partners-marquee-track">
            {marqueePartners.map((partner, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  borderRadius: 14,
                  width: 170,
                  height: 76,
                  marginRight: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 16px",
                  boxSizing: "border-box",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.01)",
                  transition: "transform 0.25s ease, border-color 0.25s ease",
                  cursor: "pointer",
                  flexShrink: 0
                }}
                className="partner-marquee-card"
              >
                {(() => {
                  if (partner.logo && typeof partner.logo === 'object') {
                    return partner.logo;
                  }
                  if (partner.logo && (partner.logo.startsWith("data:") || partner.logo.startsWith("http") || partner.logo.startsWith("/"))) {
                    return <img src={partner.logo} alt={partner.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />;
                  }
                  if (partner.emoji && (partner.emoji.startsWith("data:") || partner.emoji.startsWith("http") || partner.emoji.startsWith("/"))) {
                    return <img src={partner.emoji} alt={partner.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />;
                  }
                  const staticMatch = staticPartners.find(sp => sp.id === partner.id);
                  if (staticMatch) {
                    return staticMatch.logo;
                  }
                  return (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <FiBriefcase size={18} style={{ color: "#e53935", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#0c0509", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {partner.name}
                      </span>
                    </div>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>

      </div>

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
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default PartnerSection;
