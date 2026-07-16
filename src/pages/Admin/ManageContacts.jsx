import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCollection, updateDocument, deleteDocument } from "../../firebase/firestore";
import { FiMail, FiUser, FiMapPin, FiPhone, FiTrash2, FiCheckCircle } from "react-icons/fi";

const ManageContacts = () => {
  const { tenantId } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("contacts"); // "contacts" | "join"

  const loadData = async () => {
    setLoading(true);
    try {
      const c = await getCollection(tenantId, "contacts");
      const j = await getCollection(tenantId, "join_requests");

      const sortFn = (x, y) => (y.createdAt?.seconds || 0) - (x.createdAt?.seconds || 0);
      setContacts([...c].sort(sortFn));
      setJoinRequests([...j].sort(sortFn));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [tenantId]);

  const toggleStatus = async (col, id, currentStatus) => {
    try {
      const nextStatus = currentStatus === "read" ? "unread" : "read";
      await updateDocument(tenantId, col, id, { status: nextStatus });
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (col, id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteDocument(tenantId, col, id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const currentList = activeTab === "contacts" ? contacts : joinRequests;
  const targetCol = activeTab === "contacts" ? "contacts" : "join_requests";

  return (
    <div style={{ animation: "fadeIn 0.35s ease both" }} className="admin-page-container">
      
      {/* Title */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 28, margin: 0, color: "#0c0509" }}>
          Manage Inquiries
        </h1>
        <p style={{ color: "#524449", fontSize: 14.5, marginTop: 6, margin: 0 }}>
          Review contact forms and partner application submissions from your website.
        </p>
      </div>

      {/* Tabs Row */}
      <div style={{
        display: "flex",
        gap: 12,
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        marginBottom: 32,
        paddingBottom: 12
      }}>
        <button
          onClick={() => setActiveTab("contacts")}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 700,
            color: activeTab === "contacts" ? "#e53935" : "#524449",
            background: activeTab === "contacts" ? "rgba(229,57,53,0.07)" : "transparent",
            border: activeTab === "contacts" ? "1px solid rgba(229,57,53,0.18)" : "1px solid transparent",
            cursor: "pointer",
            transition: "all 0.25s ease"
          }}
        >
          📩 Contact Form ({contacts.length})
        </button>
        <button
          onClick={() => setActiveTab("join")}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 700,
            color: activeTab === "join" ? "#e53935" : "#524449",
            background: activeTab === "join" ? "rgba(229,57,53,0.07)" : "transparent",
            border: activeTab === "join" ? "1px solid rgba(229,57,53,0.18)" : "1px solid transparent",
            cursor: "pointer",
            transition: "all 0.25s ease"
          }}
        >
          🤝 Join Form ({joinRequests.length})
        </button>
      </div>

      {/* Loading state */}
      {loading ? (
        <div style={{ padding: "80px 0", textAlign: "center", color: "#524449" }}>Loading submission data...</div>
      ) : currentList.length === 0 ? (
        <div style={{ padding: "80px 0", textAlign: "center", color: "#524449" }}>No submissions found under this category.</div>
      ) : (
        <div style={{
          background: "#ffffff",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          borderRadius: 20,
          boxShadow: "0 4px 20px rgba(0,0,0,0.015)",
          overflow: "hidden"
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.05)", background: "#f4f7f6" }}>
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>SENDER INFO</th>
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>MESSAGE</th>
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>DATE</th>
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>STATUS</th>
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700, textAlign: "right" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentList.map((item, idx) => (
                <tr key={item.id} style={{
                  borderBottom: idx < currentList.length - 1 ? "1px solid rgba(0, 0, 0, 0.04)" : "none",
                  transition: "background 0.2s ease"
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f9fbfb"}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  {/* Sender Details */}
                  <td style={{ padding: "18px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "rgba(229,57,53,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#e53935",
                        fontWeight: 700,
                        fontSize: 12
                      }}>
                        {item.name ? item.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <div style={{ fontSize: 14.5, fontWeight: 700, color: "#0c0509" }}>{item.name}</div>
                        <div style={{ fontSize: 11.5, color: "#524449", marginTop: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                          <span>📧 {item.email}</span>
                          <span>📞 {item.phone}</span>
                          {item.city && <span>📍 {item.city}</span>}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Message body */}
                  <td style={{ padding: "18px 24px", fontSize: 14, color: "#524449", maxWidth: 320, verticalAlign: "top" }}>
                    <div style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}>{item.message}</div>
                  </td>

                  {/* Submission date */}
                  <td style={{ padding: "18px 24px", fontSize: 13, color: "#77676c", verticalAlign: "top" }}>
                    {item.createdAt?.seconds 
                      ? new Date(item.createdAt.seconds * 1000).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })
                      : "Recently"
                    }
                  </td>

                  {/* Read / Unread */}
                  <td style={{ padding: "18px 24px", verticalAlign: "top" }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: item.status === "read" ? "#2e7d32" : "#ff9800",
                      background: item.status === "read" ? "rgba(46,125,50,0.06)" : "rgba(255,152,0,0.06)",
                      border: item.status === "read" ? "1px solid rgba(46,125,50,0.15)" : "1px solid rgba(255,152,0,0.15)",
                      padding: "4px 10px",
                      borderRadius: 20
                    }}>
                      {item.status === "read" ? "READ" : "UNREAD"}
                    </span>
                  </td>

                  {/* Actions buttons */}
                  <td style={{ padding: "18px 24px", textAlign: "right", verticalAlign: "top" }}>
                    <div style={{ display: "inline-flex", gap: 10 }}>
                      <button onClick={() => toggleStatus(targetCol, item.id, item.status)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", color: "#524449", cursor: "pointer", transition: "all 0.2s" }}
                        title={item.status === "read" ? "Mark as unread" : "Mark as read"}
                        onMouseEnter={e => { e.currentTarget.style.background = "#f4f7f6"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#ffffff"; }}
                      >
                        <FiCheckCircle size={14} style={{ color: item.status === "read" ? "#2e7d32" : "#524449" }} />
                      </button>
                      <button onClick={() => handleDelete(targetCol, item.id)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", color: "#e53935", cursor: "pointer", transition: "all 0.2s" }}
                        title="Delete Inquiry"
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(229,57,53,0.05)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#ffffff"; }}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageContacts;
