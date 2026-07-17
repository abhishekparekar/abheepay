import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCollection } from "../../firebase/firestore";
import { FiCpu, FiUsers, FiMessageSquare, FiMail, FiSettings, FiFileText, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { tenantId } = useAuth();
  const [stats, setStats] = useState({ services: 0, partners: 0, testimonials: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);
  const [recentInquiries, setRecentInquiries] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, p, t, c, j] = await Promise.all([
          getCollection(tenantId, "services"),
          getCollection(tenantId, "partners"),
          getCollection(tenantId, "testimonials"),
          getCollection(tenantId, "contacts"),
          getCollection(tenantId, "join_requests"),
        ]);
        setStats({
          services: s.length || 6,
          partners: p.length || 12,
          testimonials: t.length || 3,
          contacts: (c.length || 0) + (j.length || 0),
        });
        const combined = [
          ...c.map(i => ({ ...i, type: "Contact" })),
          ...j.map(i => ({ ...i, type: "Partner Request" })),
        ].sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setRecentInquiries(combined.slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [tenantId]);

  const statCards = [
    { label: "Services", value: stats.services, icon: FiCpu, color: "#e53935", to: "/admin/services" },
    { label: "Partners", value: stats.partners, icon: FiUsers, color: "#f4511e", to: "/admin/partners" },
    { label: "Reviews", value: stats.testimonials, icon: FiMessageSquare, color: "#d81b60", to: "/admin/testimonials" },
    { label: "Inquiries", value: stats.contacts, icon: FiMail, color: "#7c3aed", to: "/admin/contacts" },
  ];

  const quickLinks = [
    { label: "Manage Services", to: "/admin/services", icon: FiCpu },
    { label: "Manage Partners", to: "/admin/partners", icon: FiUsers },
    { label: "Manage Solutions", to: "/admin/solutions", icon: FiFileText },
    { label: "View Testimonials", to: "/admin/testimonials", icon: FiMessageSquare },
    { label: "Site Settings", to: "/admin/settings", icon: FiSettings },
  ];

  return (
    <div className="admin-page-container">

      {/* Title */}
      <div className="admin-page-title">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's an overview of your SiD Pay portal.</p>
      </div>

      {/* Stat Cards */}
      <div className="admin-stats-grid">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} to={card.to} style={{ textDecoration: "none" }}>
              <div className="admin-card" style={{ cursor: "pointer", padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: "#77676c", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {card.label}
                  </span>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10,
                    background: `${card.color}10`, border: `1px solid ${card.color}20`,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <Icon size={15} style={{ color: card.color }} />
                  </div>
                </div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 30, color: "#0c0509" }}>
                  {loading ? "—" : card.value}
                </div>
                <div style={{ fontSize: 12, color: card.color, marginTop: 4, fontWeight: 600 }}>
                  <FiTrendingUp size={11} style={{ verticalAlign: "middle", marginRight: 3 }} />
                  View All →
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Grid */}
      <div className="admin-dash-subgrid">

        {/* Recent Inquiries */}
        <div className="admin-card" style={{ padding: "22px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 16, color: "#0c0509", margin: 0 }}>
              Recent Inquiries
            </h3>
            <Link to="/admin/contacts" style={{ fontSize: 12.5, color: "#e53935", fontWeight: 600, textDecoration: "none" }}>
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="admin-empty">Loading…</div>
          ) : recentInquiries.length === 0 ? (
            <div className="admin-empty">No recent inquiries found.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recentInquiries.map((inq, idx) => (
                <div key={idx} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "11px 14px", background: "#f9fafb",
                  border: "1px solid rgba(0,0,0,0.04)", borderRadius: 10
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    <span className={`admin-badge ${inq.type === "Contact" ? "purple" : "red"}`}>
                      {inq.type}
                    </span>
                    <span style={{ fontSize: 13.5, color: "#0c0509", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {inq.name || "Unknown"}
                    </span>
                  </div>
                  <span style={{ fontSize: 11.5, color: "#77676c", flexShrink: 0, marginLeft: 8 }}>
                    {inq.createdAt?.seconds
                      ? new Date(inq.createdAt.seconds * 1000).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
                      : "Now"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="admin-card" style={{ padding: "22px 24px" }}>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 16, color: "#0c0509", margin: "0 0 16px" }}>
            Quick Access
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {quickLinks.map((lnk) => {
              const Icon = lnk.icon;
              return (
                <Link key={lnk.label} to={lnk.to} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 14px", borderRadius: 10,
                  background: "#f9fafb", border: "1px solid rgba(0,0,0,0.05)",
                  fontSize: 13.5, color: "#524449", fontWeight: 500,
                  textDecoration: "none", transition: "all 0.2s ease"
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#e53935"; e.currentTarget.style.borderColor = "rgba(229,57,53,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#524449"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)"; }}
                >
                  <Icon size={14} />
                  {lnk.label}
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
