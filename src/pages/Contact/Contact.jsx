import React from "react";
import { Helmet } from "react-helmet-async";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import ContactForm from "../../components/Contact/ContactForm";

const contactDetails = [
  {
    Icon: FiMapPin,
    label: "Office Address",
    value: "2nd Floor, Plot No-3, KH. NO. 33/6 Amberhai, Sector-19, Dwarka, New Delhi – 110043",
    href: null,
  },
  {
    Icon: FiPhone,
    label: "Call Us",
    value: "+91 88600 37218",
    href: "tel:+918860037218",
  },
  {
    Icon: FiMail,
    label: "Email Us",
    value: "care@sidpay.com",
    href: "mailto:care@sidpay.com",
  },
  {
    Icon: FiClock,
    label: "Working Hours",
    value: "Mon – Sat: 10:00 AM – 6:00 PM",
    href: null,
  },
];

const Contact = () => (
  <>
    <Helmet>
      <title>Contact Us – SiD Pay</title>
      <meta name="description" content="Get in touch with the SiD Pay team. Fill in the message form or find our office location." />
    </Helmet>

    <section style={{
      padding: "76px 20px 60px",
      background: "#f4f7f6",
      color: "#0c0509",
      minHeight: "100vh"
    }}>
      <div className="container" style={{ maxWidth: 1100 }}>

        {/* Page Heading */}
        <div style={{ marginBottom: 36, textAlign: "center" }}>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            color: "#0c0509",
            margin: "0 0 10px"
          }}>
            Get In Touch
          </h1>
          <p style={{ color: "#77676c", fontSize: 15, margin: 0 }}>
            We'd love to hear from you. Fill in the form or reach us directly.
          </p>
        </div>

        {/* Main Grid */}
        <div className="contact-main-grid">

          {/* LEFT – Contact Form */}
          <div style={{
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.05)",
            borderRadius: 20,
            padding: "36px 32px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.04)"
          }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: "#0c0509",
              marginBottom: 6,
              marginTop: 0
            }}>
              Send a Message
            </h2>
            <p style={{ color: "#77676c", fontSize: 14, marginBottom: 28 }}>
              We'll get back to you within 24 hours.
            </p>
            <ContactForm />
          </div>

          {/* RIGHT – Info + Map */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Contact Details Card */}
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.05)",
              borderRadius: 20,
              padding: "28px 28px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)"
            }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: 17,
                color: "#0c0509",
                marginBottom: 22,
                marginTop: 0
              }}>
                Contact Details
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {contactDetails.map(({ Icon, label, value, href }) => (
                  <div key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "rgba(229,57,53,0.07)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#e53935", flexShrink: 0
                    }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#77676c", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {label}
                      </div>
                      {href ? (
                        <a href={href} style={{ fontSize: 14, fontWeight: 600, color: "#0c0509", textDecoration: "none" }}>
                          {value}
                        </a>
                      ) : (
                        <div style={{ fontSize: 14, fontWeight: 500, color: "#0c0509", lineHeight: 1.5 }}>
                          {value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Maps */}
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.05)",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              height: 220,
              flexShrink: 0
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5620131497217!2d77.05494957549733!3d28.597914875620894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b1bb649fb9b%3A0xc3f7a14e9e0ff959!2sAmberhai%2C%20Sector%2019%2C%20Dwarka%2C%20New%20Delhi%2C%20Delhi%20110075!5e0!3m2!1sen!2sin!4v1716912345678"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SiD Pay Office Location"
              />
            </div>

          </div>
        </div>

        {/* Bottom note */}
        <div style={{ textAlign: "center", marginTop: 36, color: "#77676c", fontSize: 13.5 }}>
          We typically reply within one business day.
        </div>

      </div>
    </section>

    <style>{`
      .contact-main-grid {
        display: grid;
        grid-template-columns: 1.15fr 0.85fr;
        gap: 28px;
        align-items: start;
      }
      @media (max-width: 860px) {
        .contact-main-grid {
          grid-template-columns: 1fr !important;
          gap: 20px !important;
        }
      }
      @media (max-width: 480px) {
        .contact-main-grid > div {
          padding: 24px 18px !important;
          border-radius: 16px !important;
        }
      }
    `}</style>
  </>
);

export default Contact;
