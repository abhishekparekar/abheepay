import React, { useState } from "react";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { sendContactMessage } from "../../services/contactService";

const ContactForm = () => {
  const { tenantId } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error"

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      // Pass form data with a default subject
      await sendContactMessage(tenantId, {
        ...form,
        subject: "Contact Form Submission"
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Name field */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 13.5, fontWeight: 700, color: "#0c0509" }}>Full name</label>
        <input
          name="name"
          required
          value={form.name}
          onChange={onChange}
          style={{
            padding: "13px 18px",
            borderRadius: 10,
            border: "1.5px solid #e1e6eb",
            background: "#fff",
            color: "#080306",
            fontSize: 14.5,
            outline: "none"
          }}
          placeholder="Enter your name"
        />
      </div>

      {/* Email field */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 13.5, fontWeight: 700, color: "#0c0509" }}>Email address</label>
        <input
          name="email"
          type="email"
          required
          value={form.email}
          onChange={onChange}
          style={{
            padding: "13px 18px",
            borderRadius: 10,
            border: "1.5px solid #e1e6eb",
            background: "#fff",
            color: "#080306",
            fontSize: 14.5,
            outline: "none"
          }}
          placeholder="Enter your email"
        />
      </div>

      {/* Phone field */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 13.5, fontWeight: 700, color: "#0c0509" }}>Phone number</label>
        <input
          name="phone"
          value={form.phone}
          onChange={onChange}
          style={{
            padding: "13px 18px",
            borderRadius: 10,
            border: "1.5px solid #e1e6eb",
            background: "#fff",
            color: "#080306",
            fontSize: 14.5,
            outline: "none"
          }}
          placeholder="Enter your number"
        />
      </div>

      {/* Message field */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 13.5, fontWeight: 700, color: "#0c0509" }}>Message</label>
        <textarea
          name="message"
          required
          value={form.message}
          onChange={onChange}
          rows={4}
          style={{
            padding: "13px 18px",
            borderRadius: 10,
            border: "1.5px solid #e1e6eb",
            background: "#fff",
            color: "#080306",
            fontSize: 14.5,
            outline: "none",
            resize: "none"
          }}
          placeholder="How can we assist you?"
        />
      </div>

      {status === "success" && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 18px",
          background: "rgba(74,222,128,0.1)",
          border: "1px solid rgba(74,222,128,0.3)",
          borderRadius: 10,
          color: "#2e7d32",
          fontSize: 13.5,
          fontWeight: 600
        }}>
          <FiCheckCircle size={16} /> Thank you! Message sent successfully.
        </div>
      )}

      {status === "error" && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 18px",
          background: "rgba(229,57,53,0.1)",
          border: "1px solid rgba(229,57,53,0.3)",
          borderRadius: 10,
          color: "#c62828",
          fontSize: 13.5,
          fontWeight: 600
        }}>
          <FiAlertCircle size={16} /> Failed to submit. Please try again.
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px 0",
          background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          border: "none",
          borderRadius: 10,
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 4px 14px rgba(229,57,53,0.25)",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.transform = "none"; }}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
