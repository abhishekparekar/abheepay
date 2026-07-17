import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCollection, updateDocument, deleteDocument } from "../../firebase/firestore";
import { FiMail, FiUser, FiMapPin, FiPhone, FiTrash2, FiCheckCircle, FiCircle, FiRefreshCw } from "react-icons/fi";

const ManageContacts = () => {
  const { tenantId } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("contacts");

  const loadData = async () => {
    setLoading(true);
    try {
      const [c, j] = await Promise.all([
        getCollection(tenantId, "contacts"),
        getCollection(tenantId, "join_requests"),
      ]);
      const sortFn = (x, y) => (y.createdAt?.seconds || 0) - (x.createdAt?.seconds || 0);
      setContacts([...c].sort(sortFn));
      setJoinRequests([...j].sort(sortFn));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [tenantId]);

  const toggleStatus = async (col, id, current) => {
    try {
      await updateDocument(tenantId, col, id, { status: current === "read" ? "unread" : "read" });
      loadData();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (col, id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteDocument(tenantId, col, id);
      loadData();
    } catch (err) { console.error(err); }
  };

  const list = activeTab === "contacts" ? contacts : joinRequests;
  const col  = activeTab === "contacts" ? "contacts" : "join_requests";

  const fmtDate = (ts) =>
    ts?.seconds
      ? new Date(ts.seconds * 1000).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
      : "—";

  return (
    <div className="admin-page-container">

      {/* Title + refresh */}
      <div className="admin-top-bar">
        <div className="admin-page-title" style={{ marginBottom: 0 }}>
          <h1>Manage Inquiries</h1>
          <p>Contact forms and partner application submissions.</p>
        </div>
        <button className="admin-btn-primary" onClick={loadData} disabled={loading} style={{ background: "#fff", color: "#524449", boxShadow: "none", border: "1px solid rgba(0,0,0,0.1)" }}>
          <FiRefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab-btn ${activeTab === "contacts" ? "active" : ""}`}
          onClick={() => setActiveTab("contacts")}
        >
          Contact Forms
          <span className="admin-badge" style={{ marginLeft: 8, background: activeTab === "contacts" ? "rgba(229,57,53,0.1)" : "rgba(0,0,0,0.05)", color: activeTab === "contacts" ? "#e53935" : "#524449" }}>
            {contacts.length}
          </span>
        </button>
        <button
          className={`admin-tab-btn ${activeTab === "join" ? "active" : ""}`}
          onClick={() => setActiveTab("join")}
        >
          Partner Applications
          <span className="admin-badge" style={{ marginLeft: 8, background: activeTab === "join" ? "rgba(229,57,53,0.1)" : "rgba(0,0,0,0.05)", color: activeTab === "join" ? "#e53935" : "#524449" }}>
            {joinRequests.length}
          </span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="admin-empty">Loading…</div>
      ) : list.length === 0 ? (
        <div className="admin-empty">No {activeTab === "contacts" ? "contact forms" : "partner applications"} yet.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {list.map((item) => (
            <div key={item.id} className="admin-card" style={{
              padding: "18px 20px",
              borderLeft: `3px solid ${item.status === "read" ? "rgba(0,0,0,0.07)" : "#e53935"}`,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>

                {/* Main Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                    <span style={{ fontSize: 14.5, fontWeight: 600, color: "#0c0509" }}>
                      {item.name || "Unknown"}
                    </span>
                    <span className={`admin-badge ${item.status === "read" ? "green" : "red"}`}>
                      {item.status === "read" ? "Read" : "Unread"}
                    </span>
                    {item.role && (
                      <span className="admin-badge gray">{item.role}</span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
                    {item.email && (
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#524449" }}>
                        <FiMail size={12} /> {item.email}
                      </span>
                    )}
                    {item.phone && (
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#524449" }}>
                        <FiPhone size={12} /> {item.phone}
                      </span>
                    )}
                    {(item.city || item.state) && (
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#524449" }}>
                        <FiMapPin size={12} /> {[item.city, item.state].filter(Boolean).join(", ")}
                      </span>
                    )}
                  </div>

                  {item.message && (
                    <p style={{ fontSize: 13, color: "#77676c", marginTop: 8, marginBottom: 0, lineHeight: 1.5 }}>
                      {item.message.length > 160 ? item.message.slice(0, 160) + "…" : item.message}
                    </p>
                  )}
                  {item.subject && (
                    <p style={{ fontSize: 13, color: "#77676c", marginTop: 6, marginBottom: 0 }}>
                      <strong>Subject:</strong> {item.subject}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                  <span style={{ fontSize: 11.5, color: "#77676c" }}>{fmtDate(item.createdAt)}</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      className="admin-btn-icon"
                      title={item.status === "read" ? "Mark Unread" : "Mark Read"}
                      onClick={() => toggleStatus(col, item.id, item.status)}
                      style={{ color: item.status === "read" ? "#16a34a" : "#524449" }}
                    >
                      {item.status === "read" ? <FiCheckCircle size={14} /> : <FiCircle size={14} />}
                    </button>
                    <button
                      className="admin-btn-icon danger"
                      title="Delete"
                      onClick={() => handleDelete(col, item.id)}
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageContacts;
