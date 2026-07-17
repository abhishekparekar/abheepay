import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCollection, setDocument, deleteDocument } from "../../firebase/firestore";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiStar } from "react-icons/fi";

const defaultTestimonials = [
  { id: "testimonial-1", name: "Mr. Basit", location: "Uttar Pradesh", text: "SiD Pay's user-friendly interface and lightning-fast transactions have helped us manage a significantly higher volume of daily walk-ins. I am extremely satisfied being a partner.", rating: 5, avatar: "B", active: true, order: 1 },
  { id: "testimonial-2", name: "Mr. Rajesh", location: "Madhya Pradesh", text: "The AEPS and withdrawal services provided by SiD Pay are incredibly reliable. The success rate is the best in the industry, and the technical support is always just a call away.", rating: 5, avatar: "R", active: true, order: 2 },
  { id: "testimonial-3", name: "Mr. Aman", location: "Bihar", text: "Since I started using SiD Pay for Domestic Money Transfers, my customers' trust has grown immensely. The real-time settlement and transparency are truly unmatched.", rating: 5, avatar: "A", active: true, order: 3 },
];

const Stars = ({ n }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1,2,3,4,5].map(i => (
      <FiStar key={i} size={13} style={{ color: i <= n ? "#f59e0b" : "#d1d5db", fill: i <= n ? "#f59e0b" : "none" }} />
    ))}
  </div>
);

const ManageTestimonials = () => {
  const { tenantId } = useAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);

  const emptyForm = { name: "", location: "", text: "", rating: 5, avatar: "", active: true, order: 1 };
  const [form, setForm] = useState(emptyForm);

  const loadData = async () => {
    setLoading(true);
    try {
      let data = await getCollection(tenantId, "testimonials");
      if (!data || data.length === 0) {
        for (const item of defaultTestimonials)
          await setDocument(tenantId, "testimonials", item.id, item);
        data = await getCollection(tenantId, "testimonials");
      }
      setList([...data].sort((a, b) => (a.order || 0) - (b.order || 0)));
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadData(); }, [tenantId]);

  const openAdd = () => { setEditingItem(null); setForm({ ...emptyForm, order: list.length + 1 }); setModalOpen(true); };
  const openEdit = (item) => { setEditingItem(item); setForm({ name: item.name || "", location: item.location || "", text: item.text || "", rating: item.rating || 5, avatar: item.avatar || item.name?.charAt(0) || "U", active: item.active !== false, order: item.order || 1 }); setModalOpen(true); };
  const handleDelete = async (id) => { if (!window.confirm("Delete this testimonial?")) return; await deleteDocument(tenantId, "testimonials", id); loadData(); };

  const onSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const id = editingItem ? editingItem.id : `testimonial-${Date.now()}`;
      await setDocument(tenantId, "testimonials", id, {
        id, name: form.name, location: form.location, text: form.text,
        rating: Number(form.rating), avatar: form.avatar || form.name?.charAt(0)?.toUpperCase() || "U",
        active: form.active, order: Number(form.order), updatedAt: new Date()
      });
      setModalOpen(false); loadData();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-page-container">

      <div className="admin-top-bar">
        <div className="admin-page-title" style={{ marginBottom: 0 }}>
          <h1>Manage Testimonials</h1>
          <p>Customer reviews displayed on your homepage.</p>
        </div>
        <button className="admin-btn-primary" onClick={openAdd}>
          <FiPlus size={15} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="admin-empty">Loading…</div>
      ) : list.length === 0 ? (
        <div className="admin-empty">No testimonials yet.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {list.map((item) => (
            <div key={item.id} className="admin-card" style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>

                {/* Avatar */}
                <div style={{
                  width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg,#e53935,#d81b60)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 700, fontSize: 18
                }}>
                  {item.avatar?.length <= 2 ? item.avatar : item.name?.charAt(0) || "U"}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 14.5, color: "#0c0509" }}>{item.name}</span>
                    {item.location && <span style={{ fontSize: 12.5, color: "#77676c" }}>{item.location}</span>}
                    <Stars n={item.rating || 5} />
                    <span className={`admin-badge ${item.active !== false ? "green" : "gray"}`}>
                      {item.active !== false ? "Active" : "Hidden"}
                    </span>
                  </div>
                  <p style={{ fontSize: 13.5, color: "#524449", margin: 0, lineHeight: 1.55 }}>
                    {item.text?.length > 180 ? item.text.slice(0, 180) + "…" : item.text}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <button className="admin-btn-icon" onClick={() => openEdit(item)} title="Edit"><FiEdit2 size={14} /></button>
                  <button className="admin-btn-icon danger" onClick={() => handleDelete(item.id)} title="Delete"><FiTrash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-box" onClick={e => e.stopPropagation()}>
            <button onClick={() => setModalOpen(false)} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", color: "#524449" }}>
              <FiX size={20} />
            </button>
            <h2 className="admin-modal-title">{editingItem ? "Edit Testimonial" : "Add Testimonial"}</h2>
            <form onSubmit={onSubmit}>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">Customer Name *</label>
                  <input className="admin-form-input" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Mr. Rajesh" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Location</label>
                  <input className="admin-form-input" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Bihar" />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Review Text *</label>
                <textarea className="admin-form-textarea" required value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} placeholder="Customer review…" />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">Star Rating</label>
                  <select className="admin-form-select" value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))}>
                    {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>)}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Display Order</label>
                  <input className="admin-form-input" type="number" min="1" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} />
                </div>
              </div>

              <div className="admin-form-group">
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} style={{ width: 16, height: 16, accentColor: "#e53935" }} />
                  <span style={{ fontSize: 13.5, color: "#524449" }}>Show on website</span>
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: "9px 18px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.1)", background: "#f9fafb", color: "#524449", fontWeight: 600, cursor: "pointer", fontSize: 13.5 }}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn-primary">
                  {saving ? "Saving…" : editingItem ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTestimonials;
