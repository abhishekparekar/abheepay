import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiCheckCircle, FiArrowLeft, FiGrid, FiSend, FiFileText } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { getCollection } from "../../firebase/firestore";
import { serviceDetails } from "../../data/servicesData";
import { renderServiceIcon } from "../../utils/iconHelper";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const { tenantId } = useAuth();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const list = await getCollection(tenantId, "services");
        const found = list.find(s => s.id === serviceId);
        if (found) {
          setDetail(found);
        } else {
          // Try to load from staticFallback
          const staticFound = serviceDetails[serviceId];
          if (staticFound) {
            setDetail({
              ...staticFound,
              id: serviceId,
              benefits: staticFound.benefits || [],
              requiredInfo: "Aadhaar Card, PAN Card, Business Registration Certificate, GST Certificate (optional)",
              ctaText: "Apply Now",
              ctaLink: "/contact"
            });
          } else {
            setDetail(null);
          }
        }
      } catch (err) {
        console.error(err);
        setDetail(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [serviceId, tenantId]);

  if (loading) {
    return (
      <div style={{
        padding: "100px 16px 60px",
        textAlign: "center",
        background: "#f4f7f6",
        minHeight: "70vh",
        color: "#524449"
      }}>
        <h2>Loading service specifications...</h2>
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
        <h1 style={{ fontSize: 28, marginBottom: 16 }}>Service Not Found</h1>
        <p style={{ color: "#524449", marginBottom: 24 }}>
          The requested service page does not exist or has been relocated.
        </p>
        <Link to="/services">
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
            <FiGrid size={16} style={{ marginRight: 8, verticalAlign: "middle" }} /> View All Services
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{detail.title} – SiD Pay</title>
        <meta name="description" content={detail.description || detail.desc} />
      </Helmet>

      <section style={{
        paddingTop: 96,
        paddingBottom: 48,
        background: "linear-gradient(180deg, #f4f7f6 0%, #ffffff 100%)",
        color: "#0c0509",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle background glow */}
        <div style={{
          position: "absolute",
          width: 400,
          height: 400,
          top: -100,
          right: -100,
          background: "radial-gradient(circle, rgba(229,57,53,0.02) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 900, padding: "0 16px" }}>
          
          {/* Back button */}
          <Link to="/services" style={{
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
            <FiArrowLeft size={15} /> Back to Services
          </Link>

          {/* Heading block */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(229, 57, 53, 0.05)",
              border: "1.5px solid rgba(229, 57, 53, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e53935",
              padding: 12,
              boxSizing: "border-box",
              flexShrink: 0
            }}>
              {renderServiceIcon(detail.icon, { height: "24px", width: "auto", objectFit: "contain" })}
            </div>
            <div>
              <div style={{
                display: "inline-block",
                padding: "3px 8px",
                borderRadius: 20,
                background: "rgba(229,57,53,0.06)",
                border: "1px solid rgba(229,57,53,0.12)",
                fontSize: 10,
                fontWeight: 700,
                color: "#e53935",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 4
              }}>
                {detail.category || "API"}
              </div>
              <h1 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                letterSpacing: "-0.02em",
                margin: 0
              }}>
                {detail.title}
              </h1>
            </div>
          </div>

          {/* Service Image Banner */}
          {detail.image && (
            <div style={{
              width: "100%",
              height: "clamp(160px, 35vh, 280px)",
              overflow: "hidden",
              borderRadius: 20,
              marginBottom: 28,
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.02)"
            }}>
              <img src={detail.image} alt={detail.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}

          <p style={{
            color: "#524449",
            fontSize: 15,
            lineHeight: 1.7,
            marginBottom: 28,
            maxWidth: 760,
            marginTop: 0
          }}>
            {detail.description || detail.desc}
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginBottom: 24
          }} className="detail-split-grid">
            
            {/* Features block */}
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              borderRadius: 20,
              padding: "24px 20px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.01)"
            }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 16,
                color: "#0c0509",
                marginBottom: 16,
                marginTop: 0
              }}>
                Core Features Included
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
                {detail.features && detail.features.map((feat, idx) => (
                  <li key={idx} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    fontSize: 13.5,
                    color: "#524449",
                    lineHeight: 1.45
                  }}>
                    <FiCheckCircle size={14} style={{ color: "#e53935", flexShrink: 0, marginTop: 2 }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits block */}
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              borderRadius: 20,
              padding: "24px 20px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.01)"
            }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 16,
                color: "#0c0509",
                marginBottom: 16,
                marginTop: 0
              }}>
                Key Integration Benefits
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
                {detail.benefits && detail.benefits.length > 0 ? (
                  detail.benefits.map((benefit, idx) => (
                    <li key={idx} style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      fontSize: 13.5,
                      color: "#524449",
                      lineHeight: 1.45
                    }}>
                      <FiCheckCircle size={14} style={{ color: "#e53935", flexShrink: 0, marginTop: 2 }} />
                      <span>{benefit}</span>
                    </li>
                  ))
                ) : (
                  <li style={{ fontSize: 13.5, color: "#77676c", fontStyle: "italic" }}>
                    No specific integration benefits listed.
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Required Information Block */}
          {detail.requiredInfo && (
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              borderRadius: 20,
              padding: "24px 20px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.01)",
              marginBottom: 24
            }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 16,
                color: "#0c0509",
                marginBottom: 12,
                marginTop: 0,
                display: "flex",
                alignItems: "center",
                gap: 8
              }}>
                <FiFileText size={16} style={{ color: "#e53935" }} /> Required Information &amp; Documents
              </h3>
              <p style={{ color: "#524449", fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
                {detail.requiredInfo}
              </p>
            </div>
          )}

          {/* Quick Inquiry CTA card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(229,57,53,0.04), rgba(216,27,96,0.01))",
            border: "1px solid rgba(229, 57, 53, 0.12)",
            borderRadius: 20,
            padding: "28px 24px",
            textAlign: "center"
          }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 18, color: "#0c0509", marginBottom: 8, marginTop: 0 }}>
              Ready to deploy {detail.title}?
            </h3>
            <p style={{ color: "#524449", fontSize: 13.5, marginBottom: 20, maxWidth: 500, margin: "0 auto 20px" }}>
              Get detailed documentation, credentials keys, or request setup help from our technical onboarding team.
            </p>
            <Link to={detail.ctaLink || "/contact"} style={{ textDecoration: "none" }}>
              <button style={{
                padding: "10px 24px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 13.5,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(229,57,53,0.18)",
                transition: "all 0.2s ease"
              }}
                onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
              >
                <FiSend size={14} /> {detail.ctaText || "Apply Now"}
              </button>
            </Link>
          </div>

        </div>
      </section>

      <style>{`
        @media(max-width:768px){
          .detail-split-grid {
            grid-template-columns: 1fr!important;
            gap: 16px!important;
          }
        }
      `}</style>
    </>
  );
};

export default ServiceDetail;
