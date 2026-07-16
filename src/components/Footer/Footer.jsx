import React from "react";
import { Link } from "react-router-dom";
import { FiTwitter, FiLinkedin, FiFacebook, FiInstagram } from "react-icons/fi";

const companyLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Join as Retailer", to: "/contact" },
  { label: "Join as Distributor", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
];

const servicesLinks = [
  { label: "Bill Payments Solution", to: "/services/bbps-recharge" },
  { label: "POS Machine", to: "/services/digital-payment-solutions" },
  { label: "AEPS", to: "/services/assisted-banking" },
  { label: "Micro ATM Services", to: "/services/assisted-banking" },
  { label: "Credit Card", to: "/services/lending-credit" },
  { label: "Insurance Solutions", to: "/services/insurance-solutions" },
];

const socials = [
  { Icon: FiLinkedin,  href: "#", label: "LinkedIn"  },
  { Icon: FiTwitter,   href: "#", label: "Twitter"  },
  { Icon: FiFacebook,  href: "#", label: "Facebook"  },
  { Icon: FiInstagram, href: "#", label: "Instagram" },
];

const Footer = () => (
  <footer style={{
    background: "#080306",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    position: "relative",
    overflow: "hidden",
    paddingTop: 80
  }}>
    <div className="orb orb-red" style={{ width: 500, height: 500, bottom: -200, left: -100, opacity: 0.06, animation: "none" }} />

    <div className="container" style={{ position: "relative", zIndex: 1 }}>
      
      {/* Footer Main Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 0.9fr 0.9fr 1fr",
        gap: 40,
        marginBottom: 56
      }} className="footer-grid">
        
        {/* Column 1: Brand Info */}
        <div>
          <Link to="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: 20 }}>
            <div style={{
              fontFamily: "'Outfit',sans-serif",
              fontWeight: 900,
              fontSize: 22,
              letterSpacing: "0.02em",
              color: "#00f0ff"
            }}>
              SID PAY
            </div>
          </Link>
          <p style={{ color: "#c9a8b4", fontSize: 13.5, lineHeight: 1.8, marginBottom: 24, maxWidth: 280 }}>
            Powering digital payments across India with secure and reliable infrastructure.
          </p>
        </div>

        {/* Column 2: Company */}
        <div>
          <h4 style={{ fontSize: 13.5, fontWeight: 800, letterSpacing: "0.06em", color: "#fff", marginBottom: 24 }}>
            Company
          </h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none", padding: 0, margin: 0 }}>
            {companyLinks.map(l => (
              <li key={l.label}>
                <Link to={l.to} style={{ fontSize: 14, color: "#c9a8b4", transition: "all 0.25s ease", textDecoration: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#c9a8b4"; }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Our Services */}
        <div>
          <h4 style={{ fontSize: 13.5, fontWeight: 800, letterSpacing: "0.06em", color: "#fff", marginBottom: 24 }}>
            Our Services
          </h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none", padding: 0, margin: 0 }}>
            {servicesLinks.map(l => (
              <li key={l.label}>
                <Link to={l.to} style={{ fontSize: 14, color: "#c9a8b4", transition: "all 0.25s ease", textDecoration: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#c9a8b4"; }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div>
          <h4 style={{ fontSize: 13.5, fontWeight: 800, letterSpacing: "0.06em", color: "#fff", marginBottom: 24 }}>
            Contact Us
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, color: "#7a5264", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Call Us</div>
              <a href="tel:+918860037218" style={{ fontSize: 14, color: "#f8f0f2", fontWeight: 600, textDecoration: "none" }}>
                +91 88600 37218
              </a>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#7a5264", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Email Us</div>
              <a href="mailto:care@sidpay.com" style={{ fontSize: 14, color: "#f8f0f2", fontWeight: 600, textDecoration: "none" }}>
                care@sidpay.com
              </a>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#7a5264", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Visit Us</div>
              <div style={{ fontSize: 13.5, color: "#c9a8b4", lineHeight: 1.6 }}>
                2nd Floor, Plot No - 3, KH. NO. 33/6 AMBERHAI, SECTOR-19, DWARKA, NEW DELHI- 110043
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        padding: "24px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16
      }}>
        <p style={{ color: "#7a5264", fontSize: 13.5, margin: 0 }}>
          © 2026 SiD Pay. All rights reserved.
        </p>
        
        {/* Social media icons on bottom right */}
        <div style={{ display: "flex", gap: 12 }}>
          {socials.map(({ Icon, href, label }) => (
            <a key={label} href={href} aria-label={label}
              style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#c9a8b4", transition: "all 0.28s ease"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(229,57,53,0.15)";
                e.currentTarget.style.borderColor = "#ef5350";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.color = "#c9a8b4";
              }}>
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

    </div>

    <style>{`
      @media(max-width:1024px){
        .footer-grid {
          grid-template-columns: 1fr 1fr!important;
          gap: 32px!important;
        }
      }
      @media(max-width:560px) {
        .footer-grid {
          grid-template-columns: 1fr!important;
          gap: 28px!important;
        }
      }
    `}</style>
  </footer>
);

export default Footer;
