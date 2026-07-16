import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCollection, setDocument, deleteDocument } from "../../firebase/firestore";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUploadCloud } from "react-icons/fi";

const ManagePartners = () => {
  const { tenantId } = useAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [form, setForm] = useState({
    name: "",
    logo: "", // holds uploaded base64 data URL
    emoji: "", // fallback icon text/class
    order: 1,
    active: true
  });

  const loadData = async () => {
    setLoading(true);
    try {
      let data = await getCollection(tenantId, "partners");
      if (!data || data.length === 0) {
        const defaults = [
          { id: "paysprint", name: "PaySprint", emoji: "🤝", order: 1, active: true },
          { id: "axis", name: "Axis Bank", emoji: "🏦", order: 2, active: true },
          { id: "hdfc", name: "HDFC Bank", emoji: "💳", order: 3, active: true },
          { id: "pinelabs", name: "Pine Labs", emoji: "🟢", order: 4, active: true },
          { id: "razorpay", name: "Razorpay", emoji: "🌐", order: 5, active: true },
          { id: "instantmudra", name: "Instant Mudra", emoji: "📱", order: 6, active: true }
        ];
        for (const item of defaults) {
          await setDocument(tenantId, "partners", item.id, item);
        }
        data = await getCollection(tenantId, "partners");
      }
      const sorted = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));
      setList(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [tenantId]);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm({
      name: "",
      logo: "",
      emoji: "FiBriefcase",
      order: list.length + 1,
      active: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name || "",
      logo: item.logo || "",
      emoji: item.emoji || "FiBriefcase",
      order: item.order || 1,
      active: item.active !== false
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this partner integration?")) return;
    try {
      await deleteDocument(tenantId, "partners", id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(f => ({ ...f, logo: reader.result, emoji: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const partnerId = editingItem ? editingItem.id : form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || `partner-${Date.now()}`;
      
      const payload = {
        id: partnerId,
        name: form.name,
        logo: form.logo,
        emoji: form.emoji,
        order: Number(form.order),
        active: form.active,
        updatedAt: new Date()
      };

      await setDocument(tenantId, "partners", partnerId, payload);
      setModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ animation: "fadeIn 0.35s ease both" }} className="admin-page-container">
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
        <div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 28, margin: 0, color: "#0c0509" }}>
            Manage Partners
          </h1>
          <p style={{ color: "#524449", fontSize: 14.5, marginTop: 6, margin: 0 }}>
            Configure and upload branding logos for corporate and banking partners on your homepage.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 24px",
            background: "linear-gradient(135deg,#e53935,#d81b60)",
            borderRadius: 12,
            fontWeight: 700,
            fontSize: 14,
            color: "#fff",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(229,57,53,0.2)"
          }}
        >
          <FiPlus size={16} /> Add Partner
        </button>
      </div>

      {/* Partners List Table */}
      {loading ? (
        <div style={{ padding: "80px 0", textAlign: "center", color: "#524449" }}>Loading partner integrations...</div>
      ) : list.length === 0 ? (
        <div style={{ padding: "80px 0", textAlign: "center", color: "#524449" }}>No partner configurations found. Add one above.</div>
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
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>ORDER</th>
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>LOGO</th>
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>PARTNER NAME</th>
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>STATUS</th>
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700, textAlign: "right" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, idx) => (
                <tr key={item.id} style={{
                  borderBottom: idx < list.length - 1 ? "1px solid rgba(0, 0, 0, 0.04)" : "none",
                  transition: "background 0.2s ease"
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f9fbfb"}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <td style={{ padding: "18px 24px", fontSize: 14.5, fontWeight: 700, color: "#e53935" }}>{item.order || 0}</td>
                  <td style={{ padding: "18px 24px" }}>
                    {item.logo && (item.logo.startsWith("data:") || item.logo.startsWith("http") || item.logo.startsWith("/")) ? (
                      <img src={item.logo} alt="logo" style={{ height: 32, maxWidth: 100, objectFit: "contain" }} />
                    ) : (
                      <span style={{ fontSize: 22 }}>💼</span>
                    )}
                  </td>
                  <td style={{ padding: "18px 24px", fontSize: 15, fontWeight: 700, color: "#0c0509" }}>{item.name}</td>
                  <td style={{ padding: "18px 24px" }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: item.active !== false ? "#2e7d32" : "#e53935",
                      background: item.active !== false ? "rgba(46,125,50,0.06)" : "rgba(229,57,53,0.06)",
                      border: item.active !== false ? "1px solid rgba(46,125,50,0.15)" : "1px solid rgba(229,57,53,0.15)",
                      padding: "4px 10px",
                      borderRadius: 20
                    }}>
                      {item.active !== false ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>
                  <td style={{ padding: "18px 24px", textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 10 }}>
                      <button onClick={() => handleOpenEdit(item)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", color: "#524449", cursor: "pointer", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#f4f7f6"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#ffffff"; }}
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", color: "#e53935", cursor: "pointer", transition: "all 0.2s" }}
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

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(17, 7, 9, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          backdropFilter: "blur(4px)"
        }}>
          <div style={{
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.05)",
            borderRadius: 24,
            width: "90%",
            maxWidth: 440,
            padding: "24px 28px",
            boxShadow: "0 20px 60px rgba(17,7,9,0.15)",
            position: "relative",
            maxHeight: "90vh",
            overflowY: "auto"
          }} className="admin-modal">
            <button onClick={() => setModalOpen(false)} style={{ position: "absolute", top: 24, right: 24, color: "#524449", background: "none", border: "none", cursor: "pointer" }}>
              <FiX size={20} />
            </button>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 20, color: "#0c0509", marginTop: 0 }}>
              {editingItem ? "Edit Partner" : "Add Partner"}
            </h2>

            <form onSubmit={onSubmit}>
              <div className="form-group" style={{ marginBottom: 14 }}>
                <label className="input-label">Partner Name</label>
                <input name="name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" placeholder="e.g. Axis Bank" />
              </div>

              {/* Upload Branding Logo */}
              <div className="form-group" style={{ marginBottom: 14 }}>
                <label className="input-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <FiUploadCloud size={14} /> Upload Partner Logo Image
                </label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="input-field" style={{ padding: "6px 12px" }} />
                {form.logo && (
                  <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11.5, color: "#524449", fontWeight: 600 }}>Preview:</span>
                    <div style={{
                      padding: 8,
                      background: "#f4f7f6",
                      borderRadius: 8,
                      border: "1px solid rgba(0,0,0,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <img src={form.logo} alt="Preview" style={{ height: 36, maxWidth: 120, objectFit: "contain" }} />
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label className="input-label">Display Order</label>
                  <input type="number" name="order" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} className="input-field" />
                </div>
                <div className="form-group" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <label className="input-label">Active Status</label>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginTop: 8 }}>
                    <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} style={{ width: 18, height: 18, accentColor: "#e53935" }} />
                    <span style={{ fontSize: 14, color: "#524449", fontWeight: 600 }}>Live on website</span>
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: "11px 20px", borderRadius: 10, border: "1px solid #e1e6eb", background: "transparent", color: "#524449", fontWeight: 600, cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: "11px 24px", borderRadius: 10, background: "linear-gradient(135deg,#e53935,#d81b60)", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .admin-page-container .input-field {
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #e1e6eb;
          font-size: 13.5px;
          color: #0c0509;
          outline: none;
          background: #ffffff;
          box-sizing: border-box;
          transition: all 0.25s ease;
        }
        .admin-page-container .input-field:focus,
        .admin-modal .input-field:focus {
          border-color: #e53935 !important;
          box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.08) !important;
        }
        .admin-page-container .input-label,
        .admin-modal .input-label {
          display: block;
          font-size: 10.5px;
          font-weight: 700;
          color: #524449;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 4px;
          margin-top: 10px;
        }
        .admin-modal .input-field {
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #e1e6eb;
          font-size: 13.5px;
          color: #0c0509;
          outline: none;
          background: #ffffff;
          box-sizing: border-box;
          transition: all 0.25s ease;
        }
      `}</style>
    </div>
  );
};

export default ManagePartners;
