import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCollection, setDocument, deleteDocument } from "../../firebase/firestore";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import IconPicker, { renderIcon } from "../../components/Admin/IconPicker";

const defaultServices = [
  { id: "digital-payment-solutions", title: "Digital Payment Solutions", icon: "FiCreditCard", category: "api", description: "Robust online and terminal payment services built for scale.", features: ["Online Payment Gateway – UPI, Cards, Net Banking, Wallets", "POS & Android POS Devices", "QR-Based Contactless Payments", "QR Code Solutions", "Sound Box Services"], benefits: ["Instant Settlements for high cash flow requirements.", "99.9% Transaction Success Rate with multi-bank smart routing.", "PCI DSS Level 1 Certified end-to-end security encryption."], requiredInfo: "Aadhaar Card, PAN Card, Business Registration Certificate, GST Certificate (optional)", ctaText: "Apply Now", ctaLink: "/contact", order: 1, active: true },
  { id: "assisted-banking", title: "Assisted Banking & Cash Management", icon: "FiHome", category: "banking", description: "Cash-out and basic banking operations at merchant locations.", features: ["AEPS – Cash withdrawal, balance inquiry, mini statement", "Micro ATM (mATM) services"], benefits: ["Empower local retailers to become mini bank branches.", "Reliable cash management networks with minimal settlement lag.", "Earn attractive commissions on banking services."], requiredInfo: "Aadhaar Card, PAN Card, Retail Shop registration certificate", ctaText: "Apply Now", ctaLink: "/contact", order: 2, active: true },
  { id: "bbps-recharge", title: "BBPS, Recharge & Bill Payments", icon: "FiActivity", category: "api", description: "National utility payments, mobile top-ups and credit card bills processing.", features: ["Mobile, DTH & data card recharges", "Credit card bill payments", "Electricity, Water, Gas and Broadband bill payments"], benefits: ["Direct API integration with NPCI Bharat BillPay system.", "Real-time status tracking for billing statements.", "Unified utility wallet for distributors and retail networks."], requiredInfo: "Aadhaar Card, PAN Card, Retail Shop authorization", ctaText: "Apply Now", ctaLink: "/contact", order: 3, active: true },
  { id: "lending-credit", title: "Lending & Credit Solutions", icon: "FiTrendingUp", category: "banking", description: "Fast, digital credit and loan onboarding solutions for retailers.", features: ["Business loans & working capital finance", "Personal loans with digital onboarding", "Credit card sourcing and lifecycle support"], benefits: ["Completely paperless application flow.", "Flexible repayment structures linked to your payout settlement.", "Tie-ups with leading NBFCs for instant loan approvals."], requiredInfo: "Aadhaar Card, PAN Card, 6 months bank statement, GST filing details", ctaText: "Check eligibility", ctaLink: "/contact", order: 4, active: true },
  { id: "insurance-solutions", title: "Insurance Solutions", icon: "FiShield", category: "banking", description: "Protect your health, life, and travel with simplified policy issuances.", features: ["Health insurance", "Life insurance", "General & travel insurance"], benefits: ["Instant certificate generation for customers.", "Attractive retail broker commission margins.", "Simple, transparent claims submission support."], requiredInfo: "Aadhaar Card, PAN Card, IRDA Retail Agent Certificate (optional)", ctaText: "Apply Now", ctaLink: "/contact", order: 5, active: true },
  { id: "travel-apis", title: "Travel APIs & Travel Services", icon: "FiGlobe", category: "api", description: "Ticketing APIs and holiday booking systems for agent networks.", features: ["Flight booking (Domestic & International)", "Bus ticket booking", "Train ticket booking", "Hotel booking", "Holiday packages"], benefits: ["Real-time pricing search index.", "Attractive markup management console for distributors.", "Instant cancellation and refund processing."], requiredInfo: "Aadhaar Card, PAN Card, Agent Business registration", ctaText: "Get API access", ctaLink: "/contact", order: 6, active: true },
];

const emptyForm = { title: "", icon: "FiCpu", image: "", category: "api", description: "", features: "", benefits: "", requiredInfo: "", ctaText: "Apply Now", ctaLink: "/contact", order: 1, active: true };

const ManageServices = () => {
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
      let data = await getCollection(tenantId, "services");
      if (!data || data.length === 0) {
        for (const item of defaultServices) await setDocument(tenantId, "services", item.id, item);
        data = await getCollection(tenantId, "services");
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
      icon: item.icon || "FiCpu",
      image: item.image || "",
      category: item.category || "api",
      description: item.description || "",
      features: Array.isArray(item.features) ? item.features.join(", ") : (item.features || ""),
      benefits: Array.isArray(item.benefits) ? item.benefits.join(", ") : (item.benefits || ""),
      requiredInfo: item.requiredInfo || "",
      ctaText: item.ctaText || "Apply Now",
      ctaLink: item.ctaLink || "/contact",
      order: item.order || 1,
      active: item.active !== false
    });
    setModalOpen(true);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    await deleteDocument(tenantId, "services", id);
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
        : (form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || `service-${Date.now()}`);
      await setDocument(tenantId, "services", id, {
        id,
        title: form.title,
        icon: form.icon,
        image: form.image || "",
        category: form.category,
        description: form.description,
        features: form.features.split(",").map(s => s.trim()).filter(Boolean),
        benefits: form.benefits.split(",").map(s => s.trim()).filter(Boolean),
        requiredInfo: form.requiredInfo,
        ctaText: form.ctaText,
        ctaLink: form.ctaLink,
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
          <h1>Manage Services</h1>
          <p>Add, update, or remove payment and banking services shown on your homepage.</p>
        </div>
        <button className="admin-btn-primary" onClick={openAdd}>
          <FiPlus size={15} /> Add Service
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-empty">Loading…</div>
      ) : list.length === 0 ? (
        <div className="admin-empty">No services found.</div>
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
                  <th style={{ width: 90 }}>Category</th>
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
                    <td style={{ fontWeight: 600, maxWidth: 200 }}>
                      <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: "#77676c", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.description}</div>
                    </td>
                    <td>
                      <span className="admin-badge gray" style={{ textTransform: "uppercase", fontSize: 10 }}>{item.category}</span>
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
          <div className="admin-modal-box" style={{ maxWidth: 600 }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setModalOpen(false)} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", color: "#524449" }}>
              <FiX size={20} />
            </button>
            <h2 className="admin-modal-title">{editingItem ? "Edit Service" : "Add Service"}</h2>

            <form onSubmit={onSubmit}>
              {/* Title + Category + Order */}
              <div className="admin-form-row">
                <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="admin-form-label">Service Title *</label>
                  <input className="admin-form-input" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. BBPS Bill Payment" />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">Category</label>
                  <select className="admin-form-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    <option value="api">API / Digital</option>
                    <option value="banking">Banking</option>
                    <option value="development">Development</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Display Order</label>
                  <input className="admin-form-input" type="number" min="1" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} />
                </div>
              </div>

              {/* Icon Picker */}
              <div className="admin-form-group">
                <label className="admin-form-label">Select Icon</label>
                <IconPicker value={form.icon} onChange={v => setForm(f => ({ ...f, icon: v }))} />
              </div>

              {/* Service Image Upload */}
              <div className="admin-form-group">
                <label className="admin-form-label">Service Image (shown on detail page)</label>
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
                <label className="admin-form-label">Short Description *</label>
                <textarea className="admin-form-textarea" required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe the service value proposition…" style={{ minHeight: 70 }} />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Features (comma-separated)</label>
                <input className="admin-form-input" value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} placeholder="Feature 1, Feature 2, Feature 3" />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Benefits (comma-separated)</label>
                <input className="admin-form-input" value={form.benefits} onChange={e => setForm(f => ({ ...f, benefits: e.target.value }))} placeholder="Benefit 1, Benefit 2, Benefit 3" />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Required Documents</label>
                <input className="admin-form-input" value={form.requiredInfo} onChange={e => setForm(f => ({ ...f, requiredInfo: e.target.value }))} placeholder="e.g. Aadhaar Card, PAN Card" />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">CTA Button Text</label>
                  <input className="admin-form-input" value={form.ctaText} onChange={e => setForm(f => ({ ...f, ctaText: e.target.value }))} placeholder="Apply Now" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">CTA Link / Route</label>
                  <input className="admin-form-input" value={form.ctaLink} onChange={e => setForm(f => ({ ...f, ctaLink: e.target.value }))} placeholder="/contact" />
                </div>
              </div>

              <div className="admin-form-group">
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} style={{ width: 16, height: 16, accentColor: "#e53935" }} />
                  <span style={{ fontSize: 13.5, color: "#524449" }}>Active — show on homepage</span>
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: "9px 18px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.1)", background: "#f9fafb", color: "#524449", fontWeight: 600, cursor: "pointer", fontSize: 13.5 }}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn-primary">
                  {saving ? "Saving…" : editingItem ? "Update Service" : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
