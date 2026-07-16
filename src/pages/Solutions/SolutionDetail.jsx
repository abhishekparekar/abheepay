import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiCheckCircle, FiArrowLeft, FiSend, FiFileText } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { getDocument } from "../../firebase/firestore";
import { renderServiceIcon } from "../../utils/iconHelper";

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
        padding: "160px 0",
        textAlign: "center",
        background: "#f4f7f6",
        minHeight: "80vh",
        color: "#524449"
      }}>
        <h2>Loading solution specifications...</h2>
      </div>
    );
  }

  if (!detail) {
    return (
      <div style={{
        padding: "160px 24px 100px",
        textAlign: "center",
        background: "#f4f7f6",
        minHeight: "80vh",
        color: "#0c0509"
      }}>
        <h1 style={{ fontSize: 32, marginBottom: 20 }}>Solution Not Found</h1>
        <p style={{ color: "#524449", marginBottom: 32 }}>
          The requested industry solution is not available or has been disabled.
        </p>
        <Link to="/solutions">
          <button style={{
            padding: "12px 24px",
            borderRadius: 12,
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

  return (
    <>
      <Helmet>
        <title>{detail.title} – SiD Pay</title>
        <meta name="description" content={detail.description} />
      </Helmet>

      <section style={{
        paddingTop: 140,
        paddingBottom: 100,
        background: "linear-gradient(180deg, #f4f7f6 0%, #ffffff 100%)",
        color: "#0c0509",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          width: 500,
          height: 500,
          top: -100,
          left: -100,
          background: "radial-gradient(circle, rgba(229,57,53,0.02) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 960 }}>
          
          {/* Back button */}
          <Link to="/solutions" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "#77676c",
            fontSize: 14.5,
            fontWeight: 600,
            marginBottom: 36,
            textDecoration: "none",
            transition: "all 0.2s ease"
          }}
            onMouseEnter={e => e.currentTarget.style.color = "#e53935"}
            onMouseLeave={e => e.currentTarget.style.color = "#77676c"}
          >
            <FiArrowLeft size={16} /> Back to Solutions
          </Link>

          {/* Heading */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 48, marginBottom: 44 }} className="solution-detail-grid">
            
            {/* Left side details */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                <div style={{
                  width: 54,
                  height: 54,
                  borderRadius: 16,
                  background: "rgba(229, 57, 53, 0.05)",
                  border: "1.5px solid rgba(229, 57, 53, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#e53935",
                  boxShadow: "0 10px 30px rgba(229, 57, 53, 0.03)",
                  padding: 12,
                  boxSizing: "border-box"
                }}>
                  {renderServiceIcon(detail.icon, { size: 28 })}
                </div>
                <h1 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  letterSpacing: "-0.02em",
                  color: "#0c0509",
                  margin: 0
                }}>
                  {detail.title}
                </h1>
              </div>

              <div style={{
                fontSize: 13,
                color: "#77676c",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 28
              }}>
                <div style={{ width: 28, height: 2, background: "linear-gradient(90deg, #e53935, #d81b60)", borderRadius: 1 }} />
                <span>SiD Pay Ecosystem • Solution Specifications</span>
              </div>

              <p style={{
                color: "#524449",
                fontSize: 16,
                lineHeight: 1.8,
                marginBottom: 36,
                marginTop: 0
              }}>
                {detail.description}
              </p>

              {/* Grid of features */}
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 18, marginBottom: 20, color: "#0c0509", marginTop: 0 }}>
                Features &amp; Technical Capabilities
              </h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 32
              }} className="solution-features-subgrid">
                {(detail.features || []).map((feat, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    padding: "16px 18px",
                    background: "#ffffff",
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    borderRadius: 16,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.01)"
                  }}>
                    <FiCheckCircle size={15} style={{ color: "#e53935", flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: 13.5, color: "#524449", lineHeight: 1.45 }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Benefits */}
            <div>
              <div style={{
                background: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                borderRadius: 24,
                padding: "36px 32px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.015)",
                marginBottom: 24
              }}>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#e53935",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  margin: "0 0 24px 0",
                  borderBottom: "1.5px solid rgba(229,57,53,0.12)",
                  paddingBottom: 10
                }}>
                  Key Benefits
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: 14, listStyle: "none", padding: 0, margin: 0 }}>
                  {(detail.benefits || []).map((ben, idx) => (
                    <li key={idx} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: "#0c0509",
                      lineHeight: 1.4
                    }}>
                      <FiCheckCircle size={14} style={{ color: "#e53935", flexShrink: 0 }} />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inquiry card */}
              <div style={{
                background: "linear-gradient(135deg, rgba(229,57,53,0.06), rgba(216,27,96,0.03))",
                border: "1px solid rgba(229, 57, 53, 0.15)",
                borderRadius: 24,
                padding: 24,
                textAlign: "center"
              }}>
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 16, color: "#0c0509", margin: "0 0 8px 0" }}>
                  Need Custom Integration?
                </h4>
                <p style={{ color: "#524449", fontSize: 13, lineHeight: 1.5, margin: "0 0 20px 0" }}>
                  Talk to our tech staff to adjust API flows or request offline test keys.
                </p>
                <Link to="/contact" style={{ textDecoration: "none" }}>
                  <button style={{
                    width: "100%",
                    padding: "11px 20px",
                    borderRadius: 12,
                    border: "none",
                    background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: 13.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(229,57,53,0.18)"
                  }}>
                    <FiSend size={14} /> Get in Touch
                  </button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      <style>{`
        @media(max-width:768px){
          .solution-detail-grid {
            grid-template-columns: 1fr!important;
            gap: 32px!important;
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
