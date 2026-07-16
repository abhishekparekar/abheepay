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

  const totalPages = Math.ceil(partners.length / PAGE_SIZE);
  const visible = partners.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section style={{
      padding: "96px 0",
      background: "linear-gradient(180deg, #ffffff 0%, #f4f7f6 100%)",
      color: "#0c0509"
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#524449",
            marginBottom: 12
          }}>
            OUR TRUSTED NETWORK
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
            letterSpacing: "-0.02em",
            color: "#0c0509",
            margin: 0
          }}>
            Strategic Partnerships
          </h2>
        </div>

        {/* Partner Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 14,
          marginBottom: 36
        }} className="partner-carousel-grid">
          {visible.map((partner, idx) => (
            <div
              key={partner.id || idx}
              style={{
                background: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                borderRadius: 16,
                padding: "24px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                boxShadow: "0 8px 30px rgba(0,0,0,0.015)",
                transition: "all 0.28s ease",
                cursor: "pointer",
                minHeight: 120
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(229, 57, 53, 0.15)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(229, 57, 53, 0.05)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.015)";
              }}
            >
              {(() => {
                if (partner.logo && typeof partner.logo === 'object') {
                  return partner.logo;
                }
                if (partner.logo && (partner.logo.startsWith("data:") || partner.logo.startsWith("http") || partner.logo.startsWith("/"))) {
                  return <img src={partner.logo} alt={partner.name} style={{ width: "100%", maxHeight: 50, objectFit: "contain" }} />;
                }
                if (partner.emoji && (partner.emoji.startsWith("data:") || partner.emoji.startsWith("http") || partner.emoji.startsWith("/"))) {
                  return <img src={partner.emoji} alt={partner.name} style={{ width: "100%", maxHeight: 50, objectFit: "contain" }} />;
                }
                const staticMatch = staticPartners.find(sp => sp.id === partner.id);
                if (staticMatch) {
                  return staticMatch.logo;
                }
                return (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <FiBriefcase size={28} style={{ color: "#e53935" }} />
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0c0509" }}>{partner.name}</div>
                  </div>
                );
              })()}
            </div>
          ))}
        </div>

        {/* Dots + Arrows Navigation */}
        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ffffff",
              border: "1px solid rgba(229,57,53,0.3)",
              color: "#e53935",
              cursor: page === 0 ? "not-allowed" : "pointer",
              opacity: page === 0 ? 0.4 : 1,
              transition: "all 0.28s ease"
            }}>
              <FiChevronLeft size={17} />
            </button>

            {/* Dots */}
            <div style={{ display: "flex", gap: 7 }}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  style={{
                    width: i === page ? 22 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === page
                      ? "linear-gradient(90deg, #e53935, #d81b60)"
                      : "rgba(0,0,0,0.1)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                />
              ))}
            </div>

            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #e53935, #d81b60)",
              border: "none",
              color: "#fff",
              cursor: page === totalPages - 1 ? "not-allowed" : "pointer",
              opacity: page === totalPages - 1 ? 0.4 : 1,
              boxShadow: "0 4px 16px rgba(229,57,53,0.3)",
              transition: "all 0.28s ease"
            }}>
              <FiChevronRight size={17} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media(max-width:1024px){ .partner-carousel-grid{grid-template-columns:repeat(4,1fr)!important;} }
        @media(max-width:640px) { .partner-carousel-grid{grid-template-columns:repeat(3,1fr)!important;} }
        @media(max-width:420px) { .partner-carousel-grid{grid-template-columns:repeat(2,1fr)!important;} }
      `}</style>
    </section>
  );
};

export default PartnerSection;
