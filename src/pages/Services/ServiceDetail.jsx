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
        padding: "160px 24px 100px",
        textAlign: "center",
        background: "#f4f7f6",
        minHeight: "80vh",
        color: "#524449"
      }}>
        <h2>Loading service specifications...</h2>
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
        <h1 style={{ fontSize: 32, marginBottom: 20 }}>Service Not Found</h1>
        <p style={{ color: "#524449", marginBottom: 32 }}>
          The requested service page does not exist or has been relocated.
        </p>
        <Link to="/services">
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
        paddingTop: 140,
        paddingBottom: 100,
        background: "linear-gradient(180deg, #f4f7f6 0%, #ffffff 100%)",
        color: "#0c0509",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle background glow */}
        <div style={{
          position: "absolute",
          width: 500,
          height: 500,
          top: -100,
          right: -100,
          background: "radial-gradient(circle, rgba(229,57,53,0.02) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
          
          {/* Back button */}
          <Link to="/services" style={{
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
            <FiArrowLeft size={16} /> Back to Services
          </Link>

          {/* Heading block */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "rgba(229, 57, 53, 0.05)",
              border: "1.5px solid rgba(229, 57, 53, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e53935",
              boxShadow: "0 10px 30px rgba(229, 57, 53, 0.03)",
              padding: 16,
              boxSizing: "border-box"
            }}>
              {renderServiceIcon(detail.icon, { size: 36 })}
            </div>
            <div>
              <div style={{
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: 20,
                background: "rgba(229,57,53,0.06)",
                border: "1px solid rgba(229,57,53,0.12)",
                fontSize: 10.5,
                fontWeight: 700,
                color: "#e53935",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 6
              }}>
                {detail.category || "API"}
              </div>
              <h1 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                letterSpacing: "-0.02em",
                margin: 0
              }}>
                {detail.title}
              </h1>
            </div>
          </div>

          <p style={{
            color: "#524449",
            fontSize: 16.5,
            lineHeight: 1.8,
            marginBottom: 44,
            maxWidth: 760,
            marginTop: 0
          }}>
            {detail.description || detail.desc}
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginBottom: 36
          }} className="detail-split-grid">
            
            {/* Features block */}
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              borderRadius: 24,
              padding: 32,
              boxShadow: "0 8px 30px rgba(0,0,0,0.015)"
            }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 17,
                color: "#0c0509",
                marginBottom: 20,
                marginTop: 0
              }}>
                Core Features Included
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: 14, listStyle: "none", padding: 0, margin: 0 }}>
                {detail.features && detail.features.map((feat, idx) => (
                  <li key={idx} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    fontSize: 14,
                    color: "#524449",
                    lineHeight: 1.5
                  }}>
                    <FiCheckCircle size={14} style={{ color: "#e53935", flexShrink: 0, marginTop: 3 }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits block */}
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              borderRadius: 24,
              padding: 32,
              boxShadow: "0 8px 30px rgba(0,0,0,0.015)"
            }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 17,
                color: "#0c0509",
                marginBottom: 20,
                marginTop: 0
              }}>
                Key Integration Benefits
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: 14, listStyle: "none", padding: 0, margin: 0 }}>
                {detail.benefits && detail.benefits.map((benefit, idx) => (
                  <li key={idx} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    fontSize: 14,
                    color: "#524449",
                    lineHeight: 1.5
                  }}>
                    <FiCheckCircle size={14} style={{ color: "#e53935", flexShrink: 0, marginTop: 3 }} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Required Information Block */}
          {detail.requiredInfo && (
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              borderRadius: 24,
              padding: 32,
              boxShadow: "0 8px 30px rgba(0,0,0,0.015)",
              marginBottom: 44
            }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 17,
                color: "#0c0509",
                marginBottom: 16,
                marginTop: 0,
                display: "flex",
                alignItems: "center",
                gap: 8
              }}>
                <FiFileText size={18} style={{ color: "#e53935" }} /> Required Information &amp; Documents
              </h3>
              <p style={{ color: "#524449", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                {detail.requiredInfo}
              </p>
            </div>
          )}

          {/* Quick Inquiry CTA card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(229,57,53,0.06), rgba(216,27,96,0.03))",
            border: "1px solid rgba(229, 57, 53, 0.15)",
            borderRadius: 24,
            padding: "40px 36px",
            textAlign: "center"
          }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 20, color: "#0c0509", marginBottom: 12, marginTop: 0 }}>
              Ready to deploy {detail.title}?
            </h3>
            <p style={{ color: "#524449", fontSize: 14.5, marginBottom: 28, maxWidth: 500, margin: "0 auto 28px" }}>
              Get detailed documentation, credentials keys, or request setup help from our technical onboarding team.
            </p>
            <Link to={detail.ctaLink || "/contact"} style={{ textDecoration: "none" }}>
              <button style={{
                padding: "12px 28px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 14.5,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(229,57,53,0.22)",
                transition: "all 0.2s ease"
              }}
                onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
              >
                <FiSend size={15} /> {detail.ctaText || "Apply Now"}
              </button>
            </Link>
          </div>

        </div>
      </section>

      <style>{`
        @media(max-width:768px){
          .detail-split-grid {
            grid-template-columns: 1fr!important;
            gap: 20px!important;
          }
        }
      `}</style>
    </>
  );
};

export default ServiceDetail;
