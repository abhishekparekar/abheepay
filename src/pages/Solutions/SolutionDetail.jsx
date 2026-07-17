import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiCheckCircle, FiArrowLeft, FiSend, FiFileText } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { getDocument } from "../../firebase/firestore";
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

const SolutionDetail = () => {
  const { solutionId } = useParams();
  const { tenantId } = useAuth();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const docData = await getDocument(tenantId, "solutions", solutionId);
        if (docData) {
          setDetail(docData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [tenantId, solutionId]);

  if (loading) {
    return (
      <div style={{
        padding: "100px 16px 60px",
        textAlign: "center",
        background: "#f4f7f6",
        minHeight: "70vh",
        color: "#524449"
      }}>
        <h2>Loading solution specifications...</h2>
      </div>
    );
  }

  if (!detail) {
    return (
      <div style={{
        padding: "100px 16px 60px",
        textAlign: "center",
        background: "#f4f7f6",
        minHeight: "70vh",
        color: "#0c0509"
      }}>
        <h1 style={{ fontSize: 28, marginBottom: 16 }}>Solution Not Found</h1>
        <p style={{ color: "#524449", marginBottom: 24 }}>
          The requested industry solution is not available or has been disabled.
        </p>
        <Link to="/solutions">
          <button style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            cursor: "pointer"
          }}>
            <FiFileText size={16} style={{ marginRight: 8, verticalAlign: "middle" }} /> View All Solutions
          </button>
        </Link>
      </div>
    );
  }

  const solutionImg = detail.image || imageFallbacks[detail.id] || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80";

  return (
    <>
      <Helmet>
        <title>{detail.title} – SiD Pay</title>
        <meta name="description" content={detail.description} />
      </Helmet>

      <section style={{
        paddingTop: 96,
        paddingBottom: 48,
        background: "linear-gradient(180deg, #f4f7f6 0%, #ffffff 100%)",
        color: "#0c0509",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          width: 400,
          height: 400,
          top: -100,
          left: -100,
          background: "radial-gradient(circle, rgba(229,57,53,0.02) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 960, padding: "0 16px" }}>
          
          {/* Back button */}
          <Link to="/solutions" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "#77676c",
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 20,
            textDecoration: "none",
            transition: "all 0.2s ease"
          }}
            onMouseEnter={e => e.currentTarget.style.color = "#e53935"}
            onMouseLeave={e => e.currentTarget.style.color = "#77676c"}
          >
            <FiArrowLeft size={15} /> Back to Solutions
          </Link>

          {/* Heading Split Grid: Left Details, Right Image Mockup */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 36,
            marginBottom: 32,
            alignItems: "center"
          }} className="solution-detail-header-grid">
            
            {/* Left Info */}
            <div style={{ textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: "rgba(229, 57, 53, 0.05)",
                  border: "1.5px solid rgba(229, 57, 53, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#e53935",
                  flexShrink: 0
                }}>
                  {renderServiceIcon(detail.icon, { size: 20 })}
                </div>
                <h1 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
                  letterSpacing: "-0.02em",
                  color: "#0c0509",
                  margin: 0
                }}>
                  {detail.title}
                </h1>
              </div>

              <div style={{
                fontSize: 12.5,
                color: "#77676c",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16
              }}>
                <div style={{ width: 20, height: 2, background: "linear-gradient(90deg, #e53935, #d81b60)", borderRadius: 1 }} />
                <span>SiD Pay Team • 2026</span>
              </div>

              <p style={{
                color: "#524449",
                fontSize: 14.5,
                lineHeight: 1.65,
                margin: 0
              }}>
                {detail.description}
              </p>
            </div>

            {/* Right Image Mockup */}
            <div style={{
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              border: "1px solid rgba(0,0,0,0.04)",
              height: 240
            }} className="solution-detail-image-box">
              <img
                src={solutionImg}
                alt={detail.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Bottom Split Grid: Left Features List, Right Sidebar Benefits */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 28,
            marginBottom: 24
          }} className="solution-detail-split-grid">
            
            {/* Left side: Features Grid */}
            <div style={{ textAlign: "left" }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 16.5,
                marginBottom: 16,
                color: "#0c0509",
                marginTop: 0
              }}>
                Features &amp; Technical Capabilities
              </h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12
              }} className="solution-features-subgrid">
                {(detail.features || []).map((feat, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    padding: "12px 14px",
                    background: "#ffffff",
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    borderRadius: 12,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.005)"
                  }}>
                    <FiCheckCircle size={13.5} style={{ color: "#e53935", flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: "#524449", lineHeight: 1.4 }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Sidebar Benefits Card */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              
              {/* Premium colored Benefits box */}
              <div style={{
                background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                borderRadius: 20,
                padding: "24px 20px",
                boxShadow: "0 8px 24px rgba(229,57,53,0.18)",
                color: "#ffffff",
                textAlign: "left"
              }}>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: 15,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  margin: "0 0 16px 0",
                  borderBottom: "1.5px solid rgba(255,255,255,0.2)",
                  paddingBottom: 8,
                  color: "#ffffff"
                }}>
                  Benefits
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
                  {(detail.benefits || []).map((ben, idx) => (
                    <li key={idx} style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      lineHeight: 1.45
                    }}>
                      <FiCheckCircle size={13.5} style={{ color: "#ffffff", flexShrink: 0, marginTop: 2 }} />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inquiry card */}
              <div style={{
                background: "linear-gradient(135deg, rgba(229,57,53,0.04), rgba(216,27,96,0.01))",
                border: "1px solid rgba(229, 57, 53, 0.12)",
                borderRadius: 20,
                padding: "20px",
                textAlign: "center"
              }}>
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 15, color: "#0c0509", margin: "0 0 6px 0" }}>
                  Need Custom Integration?
                </h4>
                <p style={{ color: "#524449", fontSize: 12.5, lineHeight: 1.45, margin: "0 0 16px 0" }}>
                  Talk to our tech staff to adjust API flows or request offline test keys.
                </p>
                <Link to="/contact" style={{ textDecoration: "none" }}>
                  <button style={{
                    width: "100%",
                    padding: "10px 18px",
                    borderRadius: 10,
                    border: "none",
                    background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(229,57,53,0.15)"
                  }}>
                    <FiSend size={13} /> Get in Touch
                  </button>
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      <style>{`
        @media(max-width:768px){
          .solution-detail-header-grid {
            grid-template-columns: 1fr!important;
            gap: 24px!important;
          }
          .solution-detail-split-grid {
            grid-template-columns: 1fr!important;
            gap: 24px!important;
          }
          .solution-features-subgrid {
            grid-template-columns: 1fr!important;
          }
        }
      `}</style>
    </>
  );
};

export default SolutionDetail;
