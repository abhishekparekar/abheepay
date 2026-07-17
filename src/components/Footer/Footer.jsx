import React from "react";
import { Link } from "react-router-dom";
import { FiLinkedin, FiTwitter, FiFacebook, FiInstagram, FiPhone, FiMail } from "react-icons/fi";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Partners", to: "/partners" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
];

const serviceLinks = [
  { label: "Bill Payments", to: "/services/bbps-recharge" },
  { label: "POS Machine", to: "/services/digital-payment-solutions" },
  { label: "Micro ATM", to: "/services/assisted-banking" },
  { label: "Credit Card", to: "/services/lending-credit" },
  { label: "Insurance", to: "/services/insurance-solutions" },
  { label: "AEPS", to: "/services/assisted-banking" },
];

const socials = [
  { Icon: FiLinkedin, href: "#", label: "LinkedIn" },
  { Icon: FiTwitter, href: "#", label: "Twitter" },
  { Icon: FiFacebook, href: "#", label: "Facebook" },
  { Icon: FiInstagram, href: "#", label: "Instagram" },
];

const Footer = () => (
  <footer style={{
    background: "#080306",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    position: "relative",
    overflow: "hidden"
  }}>
    <div style={{
      position: "absolute",
      width: 400, height: 400,
      bottom: -150, left: -100,
      background: "radial-gradient(circle, rgba(229,57,53,0.05) 0%, transparent 70%)",
      pointerEvents: "none"
    }} />

    <div className="container" style={{ position: "relative", zIndex: 1, padding: "48px 24px 0" }}>

      <div className="footer-main-grid">

        {/* Brand Column */}
        <div className="footer-brand-col">
          <Link to="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: 12 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 22, color: "#00f0ff", letterSpacing: "0.02em" }}>
              SID PAY
            </div>
            <div style={{ fontSize: 11, color: "#7a5264", fontWeight: 600, letterSpacing: "0.06em" }}>
              BY SHASHWAT
            </div>
          </Link>
          <p style={{ color: "#c9a8b4", fontSize: 13, lineHeight: 1.75, marginBottom: 20, maxWidth: 260 }}>
            Powering digital payments across India with secure, reliable infrastructure.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {socials.map(({ Icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#c9a8b4", transition: "all 0.25s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(229,57,53,0.15)";
                  e.currentTarget.style.borderColor = "#e53935";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "#c9a8b4";
                }}>
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", color: "#fff", marginBottom: 16, marginTop: 0, textTransform: "uppercase" }}>
            Quick Links
          </h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
            {quickLinks.map(l => (
              <li key={l.label}>
                <Link to={l.to} style={{ fontSize: 13.5, color: "#c9a8b4", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#c9a8b4"; }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", color: "#fff", marginBottom: 16, marginTop: 0, textTransform: "uppercase" }}>
            Services
          </h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
            {serviceLinks.map(l => (
              <li key={l.label}>
                <Link to={l.to} style={{ fontSize: 13.5, color: "#c9a8b4", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#c9a8b4"; }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", color: "#fff", marginBottom: 16, marginTop: 0, textTransform: "uppercase" }}>
            Contact Us
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <a href="tel:+918860037218" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(229,57,53,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#e53935", flexShrink: 0 }}>
                <FiPhone size={13} />
              </div>
              <span style={{ fontSize: 13.5, color: "#c9a8b4", fontWeight: 600 }}>+91 88600 37218</span>
            </a>
            <a href="mailto:care@sidpay.com" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(229,57,53,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#e53935", flexShrink: 0 }}>
                <FiMail size={13} />
              </div>
              <span style={{ fontSize: 13.5, color: "#c9a8b4", fontWeight: 600 }}>care@sidpay.com</span>
            </a>
            <p style={{ fontSize: 12.5, color: "#7a5264", lineHeight: 1.6, margin: 0 }}>
              2nd Floor, Plot No-3, Sector-19, Dwarka, New Delhi - 110043
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "16px 0",
        marginTop: 40,
        textAlign: "center"
      }}>
        <p style={{ color: "#7a5264", fontSize: 12.5, margin: 0 }}>
          © 2026 SiD Pay by Shashwat. All rights reserved.
        </p>
      </div>

    </div>

    <style>{`
      .footer-main-grid {
        display: grid;
        grid-template-columns: 1.3fr 0.9fr 0.9fr 1.1fr;
        gap: 40px;
      }
      @media(max-width: 1024px) {
        .footer-main-grid {
          grid-template-columns: 1fr 1fr !important;
          gap: 32px !important;
        }
      }
      @media(max-width: 560px) {
        .footer-main-grid {
          grid-template-columns: 1fr 1fr !important;
          gap: 24px !important;
        }
        .footer-brand-col {
          grid-column: 1 / -1 !important;
        }
      }
    `}</style>
  </footer>
);

export default Footer;
