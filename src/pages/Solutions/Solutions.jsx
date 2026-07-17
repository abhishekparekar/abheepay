import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
        paddingTop: 100,
        paddingBottom: 36,
        background: "linear-gradient(180deg, #f4f7f6 0%, #ffffff 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          width: 400,
          height: 400,
          top: -150,
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(229,57,53,0.02) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1, padding: "0 16px" }}>
          <h1 style={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem,4vw,2.5rem)",
            letterSpacing: "-0.02em",
            color: "#0c0509",
            marginBottom: 12,
            marginTop: 0
          }}>
            Complete Financial{" "}
            <span style={{
              background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Ecosystem
            </span>
          </h1>
          <p style={{ color: "#524449", maxWidth: 540, margin: "0 auto", fontSize: 15, lineHeight: 1.6 }}>
            Explore our comprehensive range of financial services designed for modern businesses.
          </p>
        </div>
      </section>

      {/* Grid List */}
      <section style={{ paddingBottom: 60, background: "#ffffff" }}>
        <div className="container" style={{ padding: "0 16px" }}>
          {loading ? (
            <div style={{ padding: "60px 0", textAlign: "center", color: "#77676c" }}>
              Loading financial ecosystem solutions...
            </div>
          ) : list.length === 0 ? (
            <div style={{ padding: "60px 0", textAlign: "center", color: "#77676c" }}>
              No solutions configured by the admin yet. Check back soon!
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24
            }} className="solutions-ecosystem-grid">
              {list.map((item, idx) => {
                const isUploadedImg = item.icon && (item.icon.startsWith("data:") || item.icon.startsWith("http") || item.icon.startsWith("/"));
                const bgImg = isUploadedImg ? item.icon : (item.image || imageFallbacks[item.id] || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80");
                const displayIcon = isUploadedImg ? "FiLayers" : (item.icon || "FiLayers");
                return (
                  <Link key={item.id || idx} to={`/solutions/${item.id}`} style={{ textDecoration: "none" }}>
                    <motion.div
                      whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(0,0,0,0.06)", borderColor: "rgba(229,57,53,0.15)" }}
                      style={{
                        background: "#ffffff",
                        border: "1px solid rgba(0, 0, 0, 0.05)",
                        borderRadius: 20,
                        overflow: "hidden",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.01)",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        transition: "border-color 0.25s ease, box-shadow 0.25s ease"
                      }}
                    >
                      {/* Image container */}
                      <div style={{ width: "100%", height: 180, overflow: "hidden", position: "relative" }}>
                        <img
                          src={bgImg}
                          alt={item.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        {/* Floating Icon top right */}
                        <div style={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: "rgba(255, 255, 255, 0.9)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#e53935",
                          zIndex: 2,
                        }}>
                          {renderServiceIcon(displayIcon, { size: 18 })}
                        </div>
                      </div>

                      {/* Content */}
                      <div style={{
                        padding: "20px 24px",
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        textAlign: "left"
                      }}>
                        <h3 style={{
                          fontFamily: "'Outfit',sans-serif",
                          fontWeight: 800,
                          fontSize: 16.5,
                          color: "#0c0509",
                          lineHeight: 1.35,
                          margin: "0 0 8px 0"
                        }}>
                          {item.title}
                        </h3>
                        {item.description && (
                          <p style={{
                            fontSize: 13,
                            color: "#524449",
                            lineHeight: 1.5,
                            margin: 0,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            opacity: 0.85
                          }}>
                            {item.description}
                          </p>
                        )}
                        
                        {/* Read more indicator */}
                        <div style={{ 
                          marginTop: "auto", 
                          paddingTop: 16, 
                          fontSize: 13, 
                          fontWeight: 700, 
                          color: "#e53935",
                          display: "flex",
                          alignItems: "center",
                          gap: 4
                        }}>
                          Explore Solution →
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media(max-width:900px){
          .solutions-ecosystem-grid {
            grid-template-columns: repeat(2, 1fr)!important;
            gap: 20px!important;
          }
        }
        @media(max-width:560px){
          .solutions-ecosystem-grid {
            grid-template-columns: 1fr!important;
          }
        }
      `}</style>
    </>
  );
};

export default Solutions;
