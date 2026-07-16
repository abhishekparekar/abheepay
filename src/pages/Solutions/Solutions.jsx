import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { fetchSolutions } from "../../services/solutionService";
import { renderServiceIcon } from "../../utils/iconHelper";

const imageFallbacks = {
  "qr-code-solutions": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=600&q=80",
  "sound-box-services": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
  "online-payment-gateway": "https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=600&q=80",
  "pos-devices": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
  "contactless-payments": "https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=600&q=80",
  "assisted-banking": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
  "aeps": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
  "micro-atm": "https://images.unsplash.com/photo-1508138221679-760a23a2285b?auto=format&fit=crop&w=600&q=80",
};

const defaultBackdrop = "linear-gradient(135deg, #1c0a10 0%, #0d0509 100%)";

const Solutions = () => {
  const { tenantId } = useAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchSolutions(tenantId);
      setList(data || []);
      setLoading(false);
    };
    load();
  }, [tenantId]);

  return (
    <>
      <Helmet>
        <title>Solutions Ecosystem – SiD Pay</title>
        <meta name="description" content="Explore our comprehensive range of financial ecosystem solutions designed for modern businesses." />
      </Helmet>

      {/* Hero */}
      <section style={{
        paddingTop: 140,
        paddingBottom: 56,
        background: "var(--bg-dark)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="orb orb-red" style={{ width: 500, height: 500, top: -200, left: "50%", transform: "translateX(-50%)", opacity: 0.08 }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem,4vw,2.8rem)",
            letterSpacing: "-0.02em",
            marginBottom: 16
          }}>
            Complete Financial <span className="gradient-text">Ecosystem</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: 540, margin: "0 auto", fontSize: 16, lineHeight: 1.75 }}>
            Explore our comprehensive range of financial services designed for modern businesses.
          </p>
        </div>
      </section>

      {/* Grid List */}
      <section style={{ paddingBottom: 100, background: "var(--bg-dark)" }}>
        <div className="container">
          {loading ? (
            <div style={{ padding: "80px 0", textAlign: "center", color: "#7a5264" }}>
              Loading financial ecosystem solutions...
            </div>
          ) : list.length === 0 ? (
            <div style={{ padding: "80px 0", textAlign: "center", color: "#7a5264" }}>
              No solutions configured by the admin yet. Check back soon!
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20
            }} className="solutions-ecosystem-grid">
              {list.map((item, idx) => {
                const bgImg = imageFallbacks[item.id] || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80";
                return (
                  <Link key={item.id || idx} to={`/solutions/${item.id}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      position: "relative",
                      borderRadius: 20,
                      overflow: "hidden",
                      height: 230,
                      background: `url(${bgImg}) center/cover no-repeat`,
                      border: "1px solid rgba(255,255,255,0.06)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = "translateY(-6px)";
                        e.currentTarget.style.boxShadow = "0 14px 36px rgba(229,57,53,0.3)";
                        e.currentTarget.style.borderColor = "rgba(229,57,53,0.35)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.6)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                      }}
                    >
                      {/* Black overlay */}
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(0deg, rgba(0,0,0,0.92) 20%, rgba(0,0,0,0.2) 100%)",
                        zIndex: 1
                      }} />

                      {/* Floating Icon top right */}
                      <div style={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        width: 24,
                        height: 24,
                        color: "#fff",
                        zIndex: 2,
                        opacity: 0.8
                      }}>
                        {renderServiceIcon(item.icon, { size: 22 })}
                      </div>

                      {/* Content */}
                      <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: 24,
                        zIndex: 2
                      }}>
                        <h3 style={{
                          fontFamily: "'Outfit',sans-serif",
                          fontWeight: 800,
                          fontSize: 15.5,
                          color: "#fff",
                          lineHeight: 1.35,
                          margin: 0
                        }}>
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media(max-width:1024px){
          .solutions-ecosystem-grid {
            grid-template-columns: repeat(3, 1fr)!important;
          }
        }
        @media(max-width:768px){
          .solutions-ecosystem-grid {
            grid-template-columns: repeat(2, 1fr)!important;
          }
        }
        @media(max-width:480px){
          .solutions-ecosystem-grid {
            grid-template-columns: 1fr!important;
          }
        }
      `}</style>
    </>
  );
};

export default Solutions;
