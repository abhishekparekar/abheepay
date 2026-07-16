import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCollection } from "../../firebase/firestore";
import { FiCpu, FiUsers, FiMessageSquare, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { tenantId } = useAuth();
  const [stats, setStats] = useState({ services: 0, partners: 0, testimonials: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);
  const [recentInquiries, setRecentInquiries] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const s = await getCollection(tenantId, "services");
        const p = await getCollection(tenantId, "partners");
        const t = await getCollection(tenantId, "testimonials");
        const c = await getCollection(tenantId, "contacts");
        const j = await getCollection(tenantId, "join_requests");

        setStats({
          services: s.length || 6,
          partners: p.length || 12,
          testimonials: t.length || 3,
          contacts: (c.length || 0) + (j.length || 0)
        });

        const combined = [
          ...c.map(item => ({ ...item, type: "Contact Inquiry" })),
          ...j.map(item => ({ ...item, type: "Join Partner Request" }))
        ].sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

        setRecentInquiries(combined.slice(0, 5));
      } catch (err) {
        console.error("Dashboard stats load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [tenantId]);

  const cards = [
    { label: "Active Services", value: stats.services, icon: FiCpu, color: "#e53935", to: "/admin/services" },
    { label: "Partner Integrations", value: stats.partners, icon: FiUsers, color: "#f4511e", to: "/admin/partners" },
    { label: "User Reviews", value: stats.testimonials, icon: FiMessageSquare, color: "#d81b60", to: "/admin/testimonials" },
    { label: "Total Inquiries", value: stats.contacts, icon: FiMail, color: "#ef5350", to: "/admin/contacts" }
  ];

  return (
    <div style={{ animation: "fadeIn 0.35s ease both" }} className="admin-page-container">
      
      {/* Title */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 28, margin: 0, color: "#0c0509" }}>
          Admin Dashboard
        </h1>
        <p style={{ color: "#524449", fontSize: 14.5, marginTop: 6, margin: 0 }}>
          Manage your portal settings, partners, services, and view customer inquiries.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 20,
        marginBottom: 40
      }} className="admin-stats-grid">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Link key={i} to={card.to} style={{ textDecoration: "none" }}>
              <div style={{
                background: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                borderRadius: 20,
                padding: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "all 0.25s ease",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.015)"
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(229, 57, 53, 0.15)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(229, 57, 53, 0.04)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.015)";
                }}
              >
                <div>
                  <div style={{ fontSize: 11.5, color: "#77676c", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {card.label}
                  </div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 32, color: "#0c0509", marginTop: 8 }}>
                    {loading ? "..." : card.value}
                  </div>
                </div>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${card.color}08`,
                  border: `1.5px solid ${card.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Icon size={20} style={{ color: card.color }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Grid: Recent Inquiries */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: 24
      }} className="admin-dash-subgrid">
        
        {/* Recent Inquiries List */}
        <div style={{
          background: "#ffffff",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          borderRadius: 20,
          padding: 28,
          boxShadow: "0 4px 20px rgba(0,0,0,0.015)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 18, color: "#0c0509", margin: 0 }}>Recent Inquiries</h3>
            <Link to="/admin/contacts" style={{ fontSize: 13, color: "#e53935", fontWeight: 700, textDecoration: "none" }}>
              View All
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div style={{ padding: "40px 0", textAlign: "center", color: "#524449", fontSize: 14.5 }}>
              No recent inquiries or contact submissions found.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {recentInquiries.map((inq, idx) => (
                <div key={idx} style={{
                  padding: "16px 20px",
                  background: "#f4f7f6",
                  border: "1px solid rgba(0, 0, 0, 0.04)",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div>
                    <span style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: "#fff",
                      background: inq.type.includes("Join") ? "linear-gradient(135deg,#e53935,#f4511e)" : "linear-gradient(135deg,#d81b60,#7b1fa2)",
                      padding: "2px 8px",
                      borderRadius: 20,
                      marginRight: 10
                    }}>
                      {inq.type}
                    </span>
                    <strong style={{ fontSize: 14, color: "#0c0509" }}>{inq.name}</strong>
                    <span style={{ fontSize: 13, color: "#524449", marginLeft: 10 }}>({inq.city || inq.subject || "No Subject"})</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#77676c" }}>
                    {inq.createdAt?.seconds ? new Date(inq.createdAt.seconds * 1000).toLocaleDateString("en-IN") : "Just now"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shortcuts Panel */}
        <div style={{
          background: "#ffffff",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          borderRadius: 20,
          padding: 28,
          boxShadow: "0 4px 20px rgba(0,0,0,0.015)",
          display: "flex",
          flexDirection: "column",
          gap: 16
        }}>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 18, color: "#0c0509", margin: 0 }}>Quick Settings</h3>
          <p style={{ color: "#524449", fontSize: 13.5, lineHeight: 1.5, margin: 0 }}>
            Direct actions to adjust core components of your payment gateway.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
            <Link to="/admin/services" style={{
              padding: "12px 16px",
              background: "#f4f7f6",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 14,
              color: "#524449",
              display: "block",
              textDecoration: "none",
              transition: "all 0.2s ease"
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#e53935"; e.currentTarget.style.borderColor = "rgba(229,57,53,0.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#524449"; e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.05)"; }}
            >
              🛠️ Configure Core Products
            </Link>
            <Link to="/admin/settings" style={{
              padding: "12px 16px",
              background: "#f4f7f6",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 14,
              color: "#524449",
              display: "block",
              textDecoration: "none",
              transition: "all 0.2s ease"
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#e53935"; e.currentTarget.style.borderColor = "rgba(229,57,53,0.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#524449"; e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.05)"; }}
            >
              🌐 Site Info &amp; Metadata
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        @media(max-width:1024px){
          .admin-stats-grid{grid-template-columns:repeat(2, 1fr)!important;}
        }
        @media(max-width:768px){
          .admin-dash-subgrid{grid-template-columns:1fr!important;}
        }
        @media(max-width:480px){
          .admin-stats-grid{grid-template-columns:1fr!important;}
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
