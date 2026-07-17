import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCollection, setDocument, deleteDocument } from "../../firebase/firestore";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUploadCloud, FiImage } from "react-icons/fi";

const ManagePartners = () => {
  const { tenantId } = useAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);

  const emptyForm = { name: "", logo: "", order: 1, active: true };
  const [form, setForm] = useState(emptyForm);

  const loadData = async () => {
    setLoading(true);
    try {
      let data = await getCollection(tenantId, "partners");
      if (!data || data.length === 0) {
        const defaults = [
          { id: "paysprint",    name: "PaySprint",     emoji: "🤝", order: 1, active: true },
          { id: "axis",         name: "Axis Bank",     emoji: "🏦", order: 2, active: true },
          { id: "hdfc",         name: "HDFC Bank",     emoji: "💳", order: 3, active: true },
          { id: "pinelabs",     name: "Pine Labs",     emoji: "🟢", order: 4, active: true },
          { id: "razorpay",     name: "Razorpay",      emoji: "🌐", order: 5, active: true },
          { id: "instantmudra", name: "Instant Mudra", emoji: "📱", order: 6, active: true },
        ];
        for (const item of defaults) await setDocument(tenantId, "partners", item.id, item);
        data = await getCollection(tenantId, "partners");
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
    setForm({ name: item.name || "", logo: item.logo || "", order: item.order || 1, active: item.active !== false });
    setModalOpen(true);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this partner?")) return;
    await deleteDocument(tenantId, "partners", id);
    loadData();
  };

  /** Compress + resize image using Canvas before storing in Firestore.
   *  Max width: 160px, max height: 80px, JPEG quality: 0.6
   *  This keeps base64 well under Firestore's 1MB document limit.
   */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const MAX_W = 160;
        const MAX_H = 80;
        let w = img.width;
        let h = img.height;

        // Scale down proportionally
        if (w > MAX_W) { h = Math.round((h * MAX_W) / w); w = MAX_W; }
        if (h > MAX_H) { w = Math.round((w * MAX_H) / h); h = MAX_H; }

        const canvas = document.createElement("canvas");
        canvas.width  = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);

        // Export as JPEG at 60% quality (keeps size tiny)
        const compressed = canvas.toDataURL("image/jpeg", 0.6);
        setForm(f => ({ ...f, logo: compressed }));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const id = editingItem
        ? editingItem.id
        : (form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || `partner-${Date.now()}`);
      await setDocument(tenantId, "partners", id, {
        id, name: form.name, logo: form.logo, emoji: form.logo || "🏦",
        order: Number(form.order), active: form.active, updatedAt: new Date()
      });
      setModalOpen(false);
      loadData();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const isImg = (s) => s && (s.startsWith("data:image") || s.startsWith("http") || s.startsWith("/"));

  return (
    <div className="admin-page-container">

      {/* Top Bar */}
      <div className="admin-top-bar">
        <div className="admin-page-title" style={{ marginBottom: 0 }}>
          <h1>Manage Partners</h1>
          <p>Add, edit or remove partner logos displayed on your homepage.</p>
        </div>
        <button className="admin-btn-primary" onClick={openAdd}>
          <FiPlus size={15} /> Add Partner
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-empty">Loading…</div>
      ) : list.length === 0 ? (
        <div className="admin-empty">No partners found. Add one above.</div>
      ) : (
        <div className="admin-table-wrap">
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>#</th>
                  <th style={{ width: 80 }}>Logo</th>
                  <th>Name</th>
                  <th style={{ width: 100 }}>Status</th>
                  <th style={{ width: 100, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 700, color: "#e53935" }}>{item.order || "—"}</td>
                    <td>
                      {isImg(item.logo) ? (
                        <img src={item.logo} alt={item.name} style={{ height: 30, maxWidth: 80, objectFit: "contain", display: "block" }} />
                      ) : (
                        <span style={{ fontSize: 22 }}>{item.emoji || "🏦"}</span>
                      )}
                    </td>
                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                    <td>
                      <span className={`admin-badge ${item.active !== false ? "green" : "red"}`}>
                        {item.active !== false ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <button className="admin-btn-icon" onClick={() => openEdit(item)} title="Edit">
                          <FiEdit2 size={14} />
                        </button>
                        <button className="admin-btn-icon danger" onClick={() => handleDelete(item.id)} title="Delete">
                          <FiTrash2 size={14} />
                        </button>
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
          <div className="admin-modal-box" onClick={e => e.stopPropagation()}>
            <button onClick={() => setModalOpen(false)} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", color: "#524449" }}>
              <FiX size={20} />
            </button>
            <h2 className="admin-modal-title">{editingItem ? "Edit Partner" : "Add Partner"}</h2>

            <form onSubmit={onSubmit}>
              <div className="admin-form-group">
                <label className="admin-form-label">Partner Name *</label>
                <input
                  className="admin-form-input"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Axis Bank"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <FiUploadCloud size={13} /> Upload Logo Image
                </label>
                <input
                  className="admin-form-input"
                  type="file" accept="image/*"
                  onChange={handleImageUpload}
                  style={{ padding: "8px 12px", cursor: "pointer" }}
                />
                {form.logo && isImg(form.logo) && (
                  <div style={{ marginTop: 10, padding: 10, background: "#f9fafb", borderRadius: 10, border: "1px solid rgba(0,0,0,0.06)", display: "inline-block" }}>
                    <div style={{ fontSize: 11, color: "#77676c", marginBottom: 6 }}>Preview</div>
                    <img src={form.logo} alt="preview" style={{ height: 40, maxWidth: 120, objectFit: "contain", display: "block" }} />
                  </div>
                )}
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">Display Order</label>
                  <input
                    className="admin-form-input"
                    type="number" min="1"
                    value={form.order}
                    onChange={e => setForm(f => ({ ...f, order: e.target.value }))}
                  />
                </div>
                <div className="admin-form-group" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <label className="admin-form-label">Status</label>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginTop: 4 }}>
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={e => setForm(f => ({ ...f, active: e.target.checked }))}
                      style={{ width: 16, height: 16, accentColor: "#e53935" }}
                    />
                    <span style={{ fontSize: 13.5, color: "#524449", fontWeight: 500 }}>Active on website</span>
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
                <button type="button" onClick={() => setModalOpen(false)}
                  style={{ padding: "9px 18px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.1)", background: "#f9fafb", color: "#524449", fontWeight: 600, cursor: "pointer", fontSize: 13.5 }}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn-primary">
                  {saving ? "Saving…" : editingItem ? "Update" : "Add Partner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePartners;
