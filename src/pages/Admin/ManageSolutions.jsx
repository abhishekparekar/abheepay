import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCollection, setDocument, deleteDocument } from "../../firebase/firestore";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import IconPicker, { renderIcon } from "../../components/Admin/IconPicker";

const defaultSolutions = [
  { id: "qr-code-solutions", title: "QR Code Solutions", icon: "FiGrid", description: "Merchant-specific static & dynamic QR code setups with instant credit confirmations.", features: ["Dynamic UPI QR generation", "Instant payment SMS callbacks", "Soundbox sync compatibility"], benefits: ["Zero setup fee", "Universal app payments support", "Fast reconciliation analytics"], order: 1, active: true },
  { id: "sound-box-services", title: "Sound Box Services", icon: "FiVolume2", description: "Instant voice announcement soundbox systems for walk-in retail transactions.", features: ["Multi-lingual audio announcements", "Sim-based GPRS connectivity", "Long battery life standby support"], benefits: ["Reduce payment confirmation fraud", "Boost teller cash efficiency", "Low subscription rental costs"], order: 2, active: true },
  { id: "online-payment-gateway", title: "Online Payment Gateway", icon: "FiCreditCard", description: "Lightning-fast UPI, cards, and net-banking integration kits for developers.", features: ["150+ integrated payment modes", "Smart dynamic checkout UI templates", "Robust REST API wrappers"], benefits: ["Industry leading success rates", "Automated refunds engine", "Instant settlement availability"], order: 3, active: true },
];

const emptyForm = { title: "", icon: "FiLayers", image: "", description: "", features: "", benefits: "", order: 1, active: true };

const ManageSolutions = () => {
  const { tenantId } = useAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const loadData = async () => {
    setLoading(true);
    try {
      let data = await getCollection(tenantId, "solutions");
      if (!data || data.length === 0) {
        for (const item of defaultSolutions) await setDocument(tenantId, "solutions", item.id, item);
        data = await getCollection(tenantId, "solutions");
      }
      setList([...data].sort((a, b) => (a.order || 0) - (b.order || 0)));
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadData(); }, [tenantId]);

  const openAdd = () => {
    setEditingItem(null);
    setForm({ ...emptyForm, order: list.length + 1 });
    setModalOpen(true);
  };
  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title || "",
      icon: item.icon || "FiLayers",
      image: item.image || "",
      description: item.description || "",
      features: Array.isArray(item.features) ? item.features.join(", ") : (item.features || ""),
      benefits: Array.isArray(item.benefits) ? item.benefits.join(", ") : (item.benefits || ""),
      order: item.order || 1,
      active: item.active !== false
    });
    setModalOpen(true);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this solution?")) return;
    await deleteDocument(tenantId, "solutions", id);
    loadData();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(f => ({ ...f, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const id = editingItem
        ? editingItem.id
        : (form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || `solution-${Date.now()}`);
      await setDocument(tenantId, "solutions", id, {
        id,
        title: form.title,
        icon: form.icon,
        image: form.image || "",
        description: form.description,
        features: form.features.split(",").map(s => s.trim()).filter(Boolean),
        benefits: form.benefits.split(",").map(s => s.trim()).filter(Boolean),
        order: Number(form.order),
        active: form.active,
        updatedAt: new Date()
      });
      setModalOpen(false);
      loadData();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const isImg = (s) => s && (s.startsWith("data:") || s.startsWith("http") || s.startsWith("/"));

  return (
    <div className="admin-page-container">

      {/* Top Bar */}
      <div className="admin-top-bar">
        <div className="admin-page-title" style={{ marginBottom: 0 }}>
          <h1>Manage Solutions</h1>
          <p>Configure product solutions shown on the Solutions page.</p>
        </div>
        <button className="admin-btn-primary" onClick={openAdd}>
          <FiPlus size={15} /> Add Solution
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-empty">Loading…</div>
      ) : list.length === 0 ? (
        <div className="admin-empty">No solutions found.</div>
      ) : (
        <div className="admin-table-wrap">
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: 50 }}>#</th>
                  <th style={{ width: 60 }}>Icon</th>
                  <th style={{ width: 70 }}>Image</th>
                  <th>Title</th>
                  <th style={{ width: 90 }}>Status</th>
                  <th style={{ width: 90, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 700, color: "#e53935" }}>{item.order}</td>
                    <td>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(229,57,53,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {renderIcon(item.icon, 16, "#e53935")}
                      </div>
                    </td>
                    <td>
                      {isImg(item.image) ? (
                        <img src={item.image} alt="" style={{ height: 32, width: 48, objectFit: "cover", borderRadius: 6, display: "block" }} />
                      ) : (
                        <span style={{ fontSize: 11, color: "#77676c" }}>No image</span>
                      )}
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 240 }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: "#77676c", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 240 }}>{item.description}</div>
                    </td>
                    <td>
                      <span className={`admin-badge ${item.active !== false ? "green" : "red"}`}>
                        {item.active !== false ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <button className="admin-btn-icon" onClick={() => openEdit(item)} title="Edit"><FiEdit2 size={14} /></button>
                        <button className="admin-btn-icon danger" onClick={() => handleDelete(item.id)} title="Delete"><FiTrash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-box" style={{ maxWidth: 580 }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setModalOpen(false)} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", color: "#524449" }}>
              <FiX size={20} />
            </button>
            <h2 className="admin-modal-title">{editingItem ? "Edit Solution" : "Add Solution"}</h2>

            <form onSubmit={onSubmit}>

              <div className="admin-form-row">
                <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="admin-form-label">Solution Title *</label>
                  <input className="admin-form-input" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. QR Code Solutions" />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Display Order</label>
                <input className="admin-form-input" type="number" min="1" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} style={{ maxWidth: 120 }} />
              </div>

              {/* Visual Icon Picker */}
              <div className="admin-form-group">
                <label className="admin-form-label">Select Icon</label>
                <IconPicker value={form.icon} onChange={v => setForm(f => ({ ...f, icon: v }))} />
              </div>

              {/* Solution Image Upload */}
              <div className="admin-form-group">
                <label className="admin-form-label">Solution Image (shown on detail page)</label>
                <input className="admin-form-input" type="file" accept="image/*" onChange={handleImageUpload} style={{ padding: "8px 12px", cursor: "pointer" }} />
                {isImg(form.image) && (
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
                    <img src={form.image} alt="preview" style={{ height: 56, width: 100, objectFit: "cover", borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)" }} />
                    <button type="button" onClick={() => setForm(f => ({ ...f, image: "" }))} style={{ fontSize: 12, color: "#e53935", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Description *</label>
                <textarea className="admin-form-textarea" required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe this solution…" style={{ minHeight: 70 }} />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Features (comma-separated)</label>
                <input className="admin-form-input" value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} placeholder="Feature 1, Feature 2, Feature 3" />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Benefits (comma-separated)</label>
                <input className="admin-form-input" value={form.benefits} onChange={e => setForm(f => ({ ...f, benefits: e.target.value }))} placeholder="Benefit 1, Benefit 2" />
              </div>

              <div className="admin-form-group">
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} style={{ width: 16, height: 16, accentColor: "#e53935" }} />
                  <span style={{ fontSize: 13.5, color: "#524449" }}>Active — show on website</span>
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: "9px 18px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.1)", background: "#f9fafb", color: "#524449", fontWeight: 600, cursor: "pointer", fontSize: 13.5 }}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn-primary">
                  {saving ? "Saving…" : editingItem ? "Update Solution" : "Add Solution"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSolutions;
