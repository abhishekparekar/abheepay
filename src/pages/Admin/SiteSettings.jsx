import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getTenant, updateTenant } from "../../firebase/firestore";
import { FiSave, FiCheckCircle } from "react-icons/fi";

const SiteSettings = () => {
  const { tenantId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "SiD Pay",
    tagline: "One Platform for BBPS & Recharge Services",
    email: "care@sidpay.com",
    phone: "+91 98765 43210",
    address: "Bandra Kurla Complex, Mumbai, Maharashtra, India - 400051",
    whatsapp: "919876543210"
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTenant(tenantId);
        if (data) {
          setForm({
            name: data.name || "SiD Pay",
            tagline: data.tagline || "One Platform for BBPS & Recharge Services",
            email: data.email || "care@sidpay.com",
            phone: data.phone || "+91 98765 43210",
            address: data.address || "Bandra Kurla Complex, Mumbai, Maharashtra, India - 400051",
            whatsapp: data.whatsapp || "919876543210"
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [tenantId]);

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    try {
      await updateTenant(tenantId, form);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ animation: "fadeIn 0.35s ease both", maxWidth: 640 }} className="admin-page-container">
      
      {/* Title */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 28, margin: 0, color: "#0c0509" }}>
          Portal Settings
        </h1>
        <p style={{ color: "#524449", fontSize: 14.5, marginTop: 6, margin: 0 }}>
          Update your tenant profile name, contact info, support email, phone numbers, and office addresses.
        </p>
      </div>

      {loading ? (
        <div style={{ padding: "40px 0", color: "#524449" }}>Loading settings configuration...</div>
      ) : (
        <form onSubmit={onSubmit} style={{
          background: "#ffffff",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          borderRadius: 20,
          padding: "24px 28px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.015)"
        }}>
          
          <div className="form-group" style={{ marginBottom: 14 }}>
            <label className="input-label">PORTAL BRAND NAME *</label>
            <input name="name" required value={form.name} onChange={onChange} className="input-field" placeholder="e.g. SiD Pay" />
          </div>

          <div className="form-group" style={{ marginBottom: 14 }}>
            <label className="input-label">HOMEPAGE TAGLINE / SUBTITLE *</label>
            <input name="tagline" required value={form.tagline} onChange={onChange} className="input-field" placeholder="e.g. One Platform for BBPS & Recharge Services" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="form-group" style={{ marginBottom: 14 }}>
              <label className="input-label">SUPPORT EMAIL ADDRESS *</label>
              <input name="email" type="email" required value={form.email} onChange={onChange} className="input-field" placeholder="care@sidpay.com" />
            </div>
            <div className="form-group" style={{ marginBottom: 14 }}>
              <label className="input-label">CONTACT PHONE NUMBER *</label>
              <input name="phone" required value={form.phone} onChange={onChange} className="input-field" placeholder="+91 98765 43210" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="form-group" style={{ marginBottom: 14 }}>
              <label className="input-label">WHATSAPP NUMBER (Digits only) *</label>
              <input name="whatsapp" required value={form.whatsapp} onChange={onChange} className="input-field" placeholder="e.g. 919876543210" />
            </div>
            <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
              <p style={{ fontSize: 11.5, color: "#77676c", margin: "14px 0 0 0", lineHeight: 1.4 }}>
                Include country code without + or spaces (e.g. 91 for India) to power the WhatsApp contact button.
              </p>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="input-label">OFFICE HEADQUARTERS ADDRESS *</label>
            <textarea name="address" required value={form.address} onChange={onChange} className="input-field" rows={2} placeholder="Full address details..." style={{ resize: "none" }} />
          </div>

          {success && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 18px",
              background: "rgba(46,125,50,0.06)",
              border: "1px solid rgba(46,125,50,0.15)",
              borderRadius: 12,
              marginBottom: 20,
              color: "#2e7d32",
              fontSize: 14,
              fontWeight: 600
            }}>
              <FiCheckCircle size={16} /> Portal configurations updated successfully!
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px 28px",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(229,57,53,0.22)",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
          >
            <FiSave size={16} /> SAVE SETTINGS
          </button>
        </form>
      )}

      <style>{`
        .admin-page-container .input-field {
          width: 100%;
          padding: 11px 14px;
          border-radius: 10px;
          border: 1px solid #e1e6eb;
          font-size: 14px;
          color: #0c0509;
          outline: none;
          background: #ffffff;
          box-sizing: border-box;
          transition: all 0.25s ease;
        }
        .admin-page-container .input-field:focus {
          border-color: #e53935 !important;
          box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.08) !important;
        }
        .admin-page-container .input-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: #524449;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 6px;
          margin-top: 14px;
        }
      `}</style>
    </div>
  );
};

export default SiteSettings;
