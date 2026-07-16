import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCollection, setDocument, deleteDocument } from "../../firebase/firestore";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUploadCloud } from "react-icons/fi";

const ManageServices = () => {
  const { tenantId } = useAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [form, setForm] = useState({
    title: "",
    icon: "FiCpu", // holds base64 upload or React Icon name
    category: "api",
    description: "",
    features: "",
    benefits: "",
    requiredInfo: "",
    ctaText: "Apply Now",
    ctaLink: "/contact",
    order: 1,
    active: true
  });

  const loadData = async () => {
    setLoading(true);
    try {
      let data = await getCollection(tenantId, "services");
      if (!data || data.length === 0) {
        const defaults = [
          {
            id: "digital-payment-solutions",
            title: "Digital Payment Solutions",
            icon: "FiCreditCard",
            category: "api",
            description: "Robust online and terminal payment services built for scale.",
            features: [
              "Online Payment Gateway – UPI, Cards, Net Banking, Wallets",
              "POS & Android POS Devices",
              "QR-Based Contactless Payments",
              "QR Code Solutions",
              "Sound Box Services"
            ],
            benefits: [
              "Instant Settlements for high cash flow requirements.",
              "99.9% Transaction Success Rate with multi-bank smart routing.",
              "PCI DSS Level 1 Certified end-to-end security encryption."
            ],
            requiredInfo: "Aadhaar Card, PAN Card, Business Registration Certificate, GST Certificate (optional)",
            ctaText: "Apply Now",
            ctaLink: "/contact",
            order: 1,
            active: true
          },
          {
            id: "assisted-banking",
            title: "Assisted Banking & Cash Management",
            icon: "FiHome",
            category: "banking",
            description: "Cash-out and basic banking operations at merchant locations.",
            features: [
              "AEPS – Cash withdrawal, balance inquiry, mini statement",
              "Micro ATM (mATM) services"
            ],
            benefits: [
              "Empower local retailers to become mini bank branches.",
              "Reliable cash management networks with minimal settlement lag.",
              "Earn attractive commissions on banking services."
            ],
            requiredInfo: "Aadhaar Card, PAN Card, Retail Shop registration certificate",
            ctaText: "Apply Now",
            ctaLink: "/contact",
            order: 2,
            active: true
          },
          {
            id: "bbps-recharge",
            title: "BBPS, Recharge & Bill Payments",
            icon: "FiActivity",
            category: "api",
            description: "National utility payments, mobile top-ups and credit cards bills processing.",
            features: [
              "Mobile, DTH & data card recharges",
              "Credit card bill payments",
              "Electricity, Water, Gas and Broadband bill payments"
            ],
            benefits: [
              "Direct API integration with NPCI Bharat BillPay system.",
              "Real-time status tracking for billing statements.",
              "Unified utility wallet for distributors and retail networks."
            ],
            requiredInfo: "Aadhaar Card, PAN Card, Retail Shop authorization",
            ctaText: "Apply Now",
            ctaLink: "/contact",
            order: 3,
            active: true
          },
          {
            id: "lending-credit",
            title: "Lending & Credit Solutions",
            icon: "FiTrendingUp",
            category: "banking",
            description: "Fast, digital credit and loan onboarding solutions for retailers.",
            features: [
              "Business loans & working capital finance",
              "Personal loans with digital onboarding",
              "Credit card sourcing and lifecycle support"
            ],
            benefits: [
              "Completely paperless application flow directly inside the dashboard.",
              "Flexible repayment structures linked directly to your payout settlement.",
              "Tie-ups with leading NBFCs for instant loan approvals."
            ],
            requiredInfo: "Aadhaar Card, PAN Card, 6 months bank statement, GST filing details",
            ctaText: "Check eligibility",
            ctaLink: "/contact",
            order: 4,
            active: true
          },
          {
            id: "insurance-solutions",
            title: "Insurance Solutions",
            icon: "FiShield",
            category: "banking",
            description: "Protect your health, life, and travel with simplified policy issuances.",
            features: [
              "Health insurance",
              "Life insurance",
              "General & travel insurance"
            ],
            benefits: [
              "Instant certificate generation for customers.",
              "Attractive retail broker commission margins.",
              "Simple, transparent claims submission support."
            ],
            requiredInfo: "Aadhaar Card, PAN Card, IRDA Retail Agent Certificate (optional)",
            ctaText: "Apply Now",
            ctaLink: "/contact",
            order: 5,
            active: true
          },
          {
            id: "travel-apis",
            title: "Travel APIs & Travel Services",
            icon: "FiGlobe",
            category: "api",
            description: "Ticketing APIs and holiday booking systems for agent networks.",
            features: [
              "Flight booking (Domestic & International)",
              "Bus ticket booking",
              "Train ticket booking",
              "Hotel booking",
              "Holiday packages"
            ],
            benefits: [
              "Real-time pricing search index.",
              "Attractive markup management console for distributors.",
              "Instant cancellation and refund processing."
            ],
            requiredInfo: "Aadhaar Card, PAN Card, Agent Business registration",
            ctaText: "Get API access",
            ctaLink: "/contact",
            order: 6,
            active: true
          }
        ];
        for (const item of defaults) {
          await setDocument(tenantId, "services", item.id, item);
        }
        data = await getCollection(tenantId, "services");
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
      title: "",
      icon: "FiCpu",
      category: "api",
      description: "",
      features: "",
      benefits: "",
      requiredInfo: "",
      ctaText: "Apply Now",
      ctaLink: "/contact",
      order: list.length + 1,
      active: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title || "",
      icon: item.icon || "FiCpu",
      category: item.category || "api",
      description: item.description || item.desc || "",
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
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteDocument(tenantId, "services", id);
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
      setForm(f => ({ ...f, icon: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedFeatures = form.features
        .split(",")
        .map(f => f.trim())
        .filter(f => f.length > 0);

      const parsedBenefits = form.benefits
        .split(",")
        .map(b => b.trim())
        .filter(b => b.length > 0);

      const serviceId = editingItem ? editingItem.id : form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || `service-${Date.now()}`;
      
      const documentPayload = {
        id: serviceId,
        title: form.title,
        icon: form.icon,
        category: form.category,
        description: form.description,
        features: parsedFeatures,
        benefits: parsedBenefits,
        requiredInfo: form.requiredInfo,
        ctaText: form.ctaText,
        ctaLink: form.ctaLink,
        order: Number(form.order),
        active: form.active,
        updatedAt: new Date()
      };

      await setDocument(tenantId, "services", serviceId, documentPayload);
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
            Configure Services
          </h1>
          <p style={{ color: "#524449", fontSize: 14.5, marginTop: 6, margin: 0 }}>
            Add, update, or remove payment and banking services displayed on your home page.
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
          <FiPlus size={16} /> Add Service
        </button>
      </div>

      {/* Services Table */}
      {loading ? (
        <div style={{ padding: "80px 0", textAlign: "center", color: "#524449" }}>Loading services list...</div>
      ) : list.length === 0 ? (
        <div style={{ padding: "80px 0", textAlign: "center", color: "#524449" }}>No services found. Add one above.</div>
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
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>ICON / LOGO</th>
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>CATEGORY</th>
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>SERVICE NAME</th>
                <th style={{ padding: "18px 24px", fontSize: 13, color: "#524449", fontWeight: 700 }}>DESCRIPTION</th>
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
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "18px 24px", fontSize: 14.5, fontWeight: 700, color: "#e53935" }}>{item.order || 0}</td>
                  <td style={{ padding: "18px 24px" }}>
                    {item.icon && (item.icon.startsWith("data:") || item.icon.startsWith("http") || item.icon.startsWith("/")) ? (
                      <img src={item.icon} alt="logo" style={{ height: 26, width: 26, objectFit: "contain" }} />
                    ) : (
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#524449" }}>{item.icon || "FiCpu"}</span>
                    )}
                  </td>
                  <td style={{ padding: "18px 24px", fontSize: 13, fontWeight: 700, color: "#e53935", textTransform: "uppercase" }}>{item.category || "API"}</td>
                  <td style={{ padding: "18px 24px", fontSize: 15, fontWeight: 700, color: "#0c0509" }}>{item.title}</td>
                  <td style={{ padding: "18px 24px", fontSize: 14, color: "#524449", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.description}
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
            maxWidth: 500,
            padding: "24px 28px",
            boxShadow: "0 20px 60px rgba(17,7,9,0.15)",
            position: "relative",
            maxHeight: "90vh",
            overflowY: "auto"
          }} className="admin-modal">
            <button onClick={() => setModalOpen(false)} style={{ position: "absolute", top: 24, right: 24, color: "#524449", background: "none", border: "none", cursor: "pointer" }}>
              <FiX size={20} />
            </button>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 20, color: "#0c0509", marginTop: 0 }}>
              {editingItem ? "Edit Service" : "Add Service"}
            </h2>

            <form onSubmit={onSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr 1fr", gap: 12 }}>
                <div className="form-group">
                  <label className="input-label">Service Title</label>
                  <input name="title" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="input-field" placeholder="e.g. BBPS Bill Payment" />
                </div>
                <div className="form-group">
                  <label className="input-label">Category</label>
                  <select name="category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field" style={{ height: 42 }}>
                    <option value="api">API</option>
                    <option value="banking">Banking</option>
                    <option value="development">Development</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="input-label">React Icon Name</label>
                  <input name="icon" required value={form.icon && (form.icon.startsWith("data:") || form.icon.startsWith("http")) ? "FiCpu" : form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} className="input-field" placeholder="e.g. FiCpu" />
                </div>
              </div>

              {/* Upload Custom Service Logo/Image */}
              <div className="form-group" style={{ marginBottom: 14 }}>
                <label className="input-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <FiUploadCloud size={14} /> Upload Custom Logo/Image File
                </label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="input-field" style={{ padding: "6px 12px" }} />
                {form.icon && (form.icon.startsWith("data:") || form.icon.startsWith("http")) && (
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
                      <img src={form.icon} alt="Preview" style={{ height: 36, width: 36, objectFit: "contain" }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="input-label">Short Description</label>
                <textarea name="description" required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="input-field" rows={2} placeholder="Explain the service value proposition..." style={{ resize: "none" }} />
              </div>

              <div className="form-group">
                <label className="input-label">Features / Bullets (Comma-separated)</label>
                <input name="features" value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} className="input-field" placeholder="Feature 1, Feature 2, Feature 3" />
              </div>

              <div className="form-group">
                <label className="input-label">Integration Benefits (Comma-separated)</label>
                <input name="benefits" value={form.benefits} onChange={e => setForm(f => ({ ...f, benefits: e.target.value }))} className="input-field" placeholder="Benefit 1, Benefit 2, Benefit 3" />
              </div>

              <div className="form-group">
                <label className="input-label">Required Documents / Info</label>
                <input name="requiredInfo" value={form.requiredInfo} onChange={e => setForm(f => ({ ...f, requiredInfo: e.target.value }))} className="input-field" placeholder="e.g. Aadhaar Card, PAN Card, Business Registration Certificate" />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 12 }}>
                <div className="form-group">
                  <label className="input-label">Apply Button Text</label>
                  <input name="ctaText" value={form.ctaText} onChange={e => setForm(f => ({ ...f, ctaText: e.target.value }))} className="input-field" placeholder="Apply Now" />
                </div>
                <div className="form-group">
                  <label className="input-label">Apply Link / Route</label>
                  <input name="ctaLink" value={form.ctaLink} onChange={e => setForm(f => ({ ...f, ctaLink: e.target.value }))} className="input-field" placeholder="/contact" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 4 }}>
                <div className="form-group">
                  <label className="input-label">Display Order</label>
                  <input type="number" name="order" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} className="input-field" />
                </div>
                <div className="form-group" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <label className="input-label">Active Status</label>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginTop: 8 }}>
                    <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} style={{ width: 18, height: 18, accentColor: "#e53935" }} />
                    <span style={{ fontSize: 14, color: "#524449", fontWeight: 600 }}>Live on homepage</span>
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 20 }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: "11px 20px", borderRadius: 10, border: "1px solid #e1e6eb", background: "transparent", color: "#524449", fontWeight: 600, cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: "11px 24px", borderRadius: 10, background: "linear-gradient(135deg,#e53935,#d81b60)", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>
                  Save Service
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

export default ManageServices;
