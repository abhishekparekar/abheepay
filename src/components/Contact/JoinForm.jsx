import React, { useState } from "react";
import { FiSend, FiCheckCircle, FiAlertCircle, FiShield } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { addDocument } from "../../firebase/firestore";

const JoinForm = () => {
  const { tenantId } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error"

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await addDocument(tenantId, "join_requests", {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        message: form.message.trim(),
        status: "unread",
        source: "join_form",
        createdAt: new Date()
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", city: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{
      padding: "44px 0 60px",
      background: "linear-gradient(135deg, #ffffff 0%, #f4f7f6 100%)",
      color: "#0c0509",
      position: "relative",
      overflow: "hidden"
    }} className="join-section">
      {/* Decorative Orb */}
      <div style={{
        position: "absolute",
        width: 400,
        height: 400,
        top: "50%",
        left: "-100px",
        transform: "translateY(-50%)",
        background: "radial-gradient(circle, rgba(229,57,53,0.02) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 48,
          alignItems: "stretch"
        }} className="join-grid">
          
          {/* Left Column: Form */}
          <div style={{
            background: "#ffffff",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            borderRadius: 24,
            padding: "48px 40px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.015)"
          }} className="join-form-card">
            
            {/* Header Badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              borderRadius: "999px",
              background: "rgba(229,57,53,0.07)",
              border: "1px solid rgba(229,57,53,0.18)",
              fontSize: 11,
              fontWeight: 700,
              color: "#e53935",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 20
            }}>
              <FiShield size={12} /> Contact Us
            </div>

            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              letterSpacing: "-0.01em",
              color: "#0c0509",
              marginBottom: 32,
              marginTop: 0
            }}>
              Join{" "}
              <span style={{
                background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                Form
              </span>
            </h2>

            <form onSubmit={onSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="join-fields-row">
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label className="input-label">FULL NAME *</label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={onChange}
                    className="input-field"
                    placeholder="Your Full Name"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label className="input-label">EMAIL ADDRESS *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    className="input-field"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="join-fields-row">
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label className="input-label">PHONE NUMBER *</label>
                  <input
                    name="phone"
                    required
                    value={form.phone}
                    onChange={onChange}
                    className="input-field"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label className="input-label">CITY *</label>
                  <input
                    name="city"
                    required
                    value={form.city}
                    onChange={onChange}
                    className="input-field"
                    placeholder="e.g. Mumbai, Delhi"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 28 }}>
                <label className="input-label">MESSAGE *</label>
                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={onChange}
                  className="input-field"
                  rows={4}
                  placeholder="Introduce your business / requirement..."
                  style={{ resize: "none" }}
                />
              </div>

              {status === "success" && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 18px",
                  background: "rgba(74,222,128,0.08)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  borderRadius: 12,
                  marginBottom: 20,
                  color: "#2e7d32",
                  fontSize: 14,
                  fontWeight: 600
                }}>
                  <FiCheckCircle size={16} /> Submission successful! We will contact you soon.
                </div>
              )}

              {status === "error" && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 18px",
                  background: "rgba(229,57,53,0.08)",
                  border: "1px solid rgba(229,57,53,0.25)",
                  borderRadius: 12,
                  marginBottom: 20,
                  color: "#e53935",
                  fontSize: 14,
                  fontWeight: 600
                }}>
                  <FiAlertCircle size={16} /> Failed to submit. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px 28px",
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
                  boxShadow: "0 4px 20px rgba(229, 57, 53, 0.25)",
                  transition: "all 0.28s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(229, 57, 53, 0.4)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(229, 57, 53, 0.25)";
                }}
              >
                {loading ? "SENDING..." : <><FiSend size={15} /> SEND NOW</>}
              </button>
            </form>
          </div>

          {/* Right Column: Google Map Embed */}
          <div style={{
            borderRadius: 24,
            overflow: "hidden",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.015)",
            background: "#ffffff",
            position: "relative",
            minHeight: 400
          }}>
            <iframe
              title="Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.996163351989!2d77.05608757621445!3d28.629881075665805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d051dbfffffff%3A0x6bde33ff44eb2d1f!2sDwarka%20Sector%2019!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, position: "absolute", inset: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <style>{`
        .join-form-card .input-field {
          width: 100%;
          padding: 12px 16px;
          background: #ffffff !important;
          border: 1px solid #e1e6eb !important;
          border-radius: 10px !important;
          font-size: 14px !important;
          color: #0c0509 !important;
          outline: none;
          transition: all 0.25s ease;
          box-sizing: border-box;
        }
        .join-form-card .input-field:focus {
          border-color: #e53935 !important;
          box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.08) !important;
        }
        .join-form-card .input-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: #524449;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        @media(max-width:820px){
          .join-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media(max-width:480px){
          .join-fields-row {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .join-form-card {
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default JoinForm;
