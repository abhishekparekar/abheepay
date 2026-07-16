import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCollection, setDocument, deleteDocument } from "../../firebase/firestore";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiStar, FiUploadCloud } from "react-icons/fi";

const ManageTestimonials = () => {
  const { tenantId } = useAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [form, setForm] = useState({
    name: "",
    location: "",
    text: "",
    rating: 5,
    avatar: "U", // holds initials or base64 image URL upload
    active: true,
    order: 1
  });

  const loadData = async () => {
    setLoading(true);
    try {
      let data = await getCollection(tenantId, "testimonials");
      if (!data || data.length === 0) {
        const defaults = [
          {
            id: "testimonial-1",
            name: "Mr. Basit",
            location: "Uttar Pradesh",
            text: "SiD Pay's user-friendly interface and lightning-fast transactions have helped us manage a significantly higher volume of daily walk-ins. I am extremely satisfied being a partner.",
            rating: 5,
            avatar: "B",
            active: true,
            order: 1
          },
          {
            id: "testimonial-2",
            name: "Mr. Rajesh",
            location: "Madhya Pradesh",
            text: "The AEPS and withdrawal services provided by SiD Pay are incredibly reliable. The success rate is the best in the industry, and the technical support is always just a call away.",
            rating: 5,
            avatar: "R",
            active: true,
            order: 2
          },
          {
            id: "testimonial-3",
            name: "Mr. Aman",
            location: "Bihar",
            text: "Since I started using SiD Pay for Domestic Money Transfers, my customers' trust has grown immensely. The real-time settlement and transparency are truly unmatched.",
            rating: 5,
            avatar: "A",
            active: true,
            order: 3
          }
        ];
        for (const item of defaults) {
          await setDocument(tenantId, "testimonials", item.id, item);
        }
        data = await getCollection(tenantId, "testimonials");
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
      location: "",
      text: "",
      rating: 5,
      avatar: "U",
      active: true,
      order: list.length + 1
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name || "",
      location: item.location || "",
      text: item.text || "",
      rating: item.rating || 5,
      avatar: item.avatar || "U",
      active: item.active !== false,
      order: item.order || 1
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteDocument(tenantId, "testimonials", id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(f => ({ ...f, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const testimonialId = editingItem ? editingItem.id : `testimonial-${Date.now()}`;
      
      const payload = {
        id: testimonialId,
        name: form.name,
        location: form.location,
        text: form.text,
        rating: Number(form.rating),
        avatar: form.avatar,
        active: form.active,
        order: Number(form.order),
        updatedAt: new Date()
      };

      await setDocument(tenantId, "testimonials", testimonialId, payload);
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
            Manage Testimonials
          </h1>
          <p style={{ color: "#524449", fontSize: 14.5, marginTop: 6, margin: 0 }}>
            Approve, configure, or add business user reviews and testimonials showcased on the portal.
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
          <FiPlus size={16} /> Add Testimonial
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ padding: "80px 0", textAlign: "center", color: "#524449" }}>Loading testimonials...</div>
      ) : list.length === 0 ? (
        <div style={{ padding: "80px 0", textAlign: "center", color: "#524449" }}>No testimonials found. Add one above.</div>
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
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>AVATAR</th>
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>SENDER</th>
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>REVIEW</th>
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>RATING</th>
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
                      fontSize: 12,
                      overflow: "hidden"
                    }}>
                      {item.avatar && (item.avatar.startsWith("data:") || item.avatar.startsWith("http")) ? (
                        <img src={item.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        item.name?.charAt(0).toUpperCase() || "T"
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "18px 24px" }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: "#0c0509" }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#77676c", marginTop: 2 }}>{item.location}</div>
                  </td>
                  <td style={{ padding: "18px 24px", fontSize: 14, color: "#524449", maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    "{item.text}"
                  </td>
                  <td style={{ padding: "18px 24px" }}>
                    <div style={{ display: "flex", gap: 2, color: "#ff9800" }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar key={i} size={13} fill={i < (item.rating || 5) ? "#ff9800" : "transparent"} style={{ opacity: i < (item.rating || 5) ? 1 : 0.15 }} />
                      ))}
                    </div>
                  </td>
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
            maxWidth: 480,
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
              {editingItem ? "Edit Testimonial" : "Add Testimonial"}
            </h2>

            <form onSubmit={onSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label className="input-label">Partner Name</label>
                  <input name="name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" placeholder="e.g. Mr. Rajesh Kumar" />
                </div>
                <div className="form-group">
                  <label className="input-label">Location / State</label>
                  <input name="location" required value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="input-field" placeholder="e.g. Madhya Pradesh" />
                </div>
              </div>

              {/* Upload Avatar Image */}
              <div className="form-group" style={{ marginBottom: 14 }}>
                <label className="input-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <FiUploadCloud size={14} /> Upload Customer Avatar Photo
                </label>
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="input-field" style={{ padding: "6px 12px" }} />
                {form.avatar && form.avatar.startsWith("data:") && (
                  <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11.5, color: "#524449", fontWeight: 600 }}>Preview:</span>
                    <img src={form.avatar} alt="Preview" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(0,0,0,0.06)" }} />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="input-label">Testimonial Review Text</label>
                <textarea name="text" required value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} className="input-field" rows={3} placeholder="What did they say about our services?" style={{ resize: "none" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr 1fr", gap: 12 }}>
                <div className="form-group">
                  <label className="input-label">Rating Stars</label>
                  <select name="rating" value={form.rating} onChange={e => setForm(f => ({ ...f, rating: e.target.value }))} className="input-field" style={{ height: 42 }}>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="input-label">Initials</label>
                  <input name="avatar" value={form.avatar && form.avatar.startsWith("data:") ? "U" : form.avatar} onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} className="input-field" placeholder="R" maxLength="3" style={{ textAlign: "center" }} />
                </div>
                <div className="form-group">
                  <label className="input-label">Display Order</label>
                  <input type="number" name="order" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} className="input-field" />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: 12 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                  <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} style={{ width: 18, height: 18, accentColor: "#e53935" }} />
                  <span style={{ fontSize: 14, color: "#524449", fontWeight: 600 }}>Publish live on website</span>
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: "11px 20px", borderRadius: 10, border: "1px solid #e1e6eb", background: "transparent", color: "#524449", fontWeight: 600, cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: "11px 24px", borderRadius: 10, background: "linear-gradient(135deg,#e53935,#d81b60)", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>
                  Save Testimonial
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

export default ManageTestimonials;
