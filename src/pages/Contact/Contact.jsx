import React from "react";
import { Helmet } from "react-helmet-async";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import ContactForm from "../../components/Contact/ContactForm";

const Contact = () => (
  <>
    <Helmet>
      <title>Contact Us – SiD Pay</title>
      <meta name="description" content="Get in touch with the SiD Pay team. Fill in the message form or find our office location." />
    </Helmet>

    {/* Section Wrapper */}
    <section style={{
      padding: "160px 24px 80px",
      background: "#f4f7f6",
      color: "#0c0509",
      minHeight: "100vh"
    }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        
        {/* Main Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 32,
          alignItems: "start"
        }} className="contact-main-grid">
          
          {/* Left Form Card */}
          <div style={{
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.05)",
            borderRadius: 24,
            padding: "44px 40px",
            boxShadow: "0 8px 28px rgba(0,0,0,0.02)"
          }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: 26,
              color: "#0c0509",
              marginBottom: 8,
              marginTop: 0
            }}>
              Send a message
            </h2>
            <p style={{ color: "#77676c", fontSize: 14.5, marginBottom: 32 }}>
              Fill in the details below and we'll get back to you within 24 hours.
            </p>
            <ContactForm />
          </div>

          {/* Right Info Stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* Top Info Card */}
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.05)",
              borderRadius: 24,
              padding: "36px 32px",
              boxShadow: "0 8px 28px rgba(0,0,0,0.02)"
            }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 19,
                color: "#0c0509",
                marginBottom: 28,
                marginTop: 0
              }}>
                Contact Details
              </h3>

              {/* Stack of detail points */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                
                {/* Office Address */}
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "rgba(229,57,53,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#e53935",
                    flexShrink: 0
                  }}>
                    <FiMapPin size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#77676c", marginBottom: 4 }}>Office Address</div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: "#0c0509", lineHeight: 1.5 }}>
                      2nd Floor, Plot No - 3, KH. NO. 33/6 AMBERHAI, SECTOR-19, DWARKA, NEW DELHI- 110043
                    </div>
                  </div>
                </div>

                {/* Call Us */}
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "rgba(229,57,53,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#e53935",
                    flexShrink: 0
                  }}>
                    <FiPhone size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#77676c", marginBottom: 4 }}>Call us</div>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: "#0c0509" }}>
                      +91 88600 37218
                    </div>
                  </div>
                </div>

                {/* Email Us */}
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "rgba(229,57,53,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#e53935",
                    flexShrink: 0
                  }}>
                    <FiMail size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#77676c", marginBottom: 4 }}>Email us</div>
                    <a href="mailto:care@sidpay.com" style={{ fontSize: 14.5, fontWeight: 700, color: "#e53935", textDecoration: "none" }}>
                      care@sidpay.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Google Maps Card */}
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.05)",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 8px 28px rgba(0,0,0,0.02)",
              height: 240
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5620131497217!2d77.05494957549733!3d28.597914875620894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b1bb649fb9b%3A0xc3f7a14e9e0ff959!2sAmberhai%2C%20Sector%2019%2C%20Dwarka%2C%20New%20Delhi%2C%20Delhi%20110075!5e0!3m2!1sen!2sin!4v1716912345678"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
              ></iframe>
            </div>

          </div>

        </div>

        {/* Footer Subtext */}
        <div style={{ textAlign: "center", marginTop: 44, color: "#77676c", fontSize: 14, fontWeight: 600 }}>
          We typically reply within one business day.
        </div>

      </div>
    </section>

    <style>{`
      @media(max-width:860px){
        .contact-main-grid {
          grid-template-columns: 1fr!important;
          gap: 24px!important;
        }
      }
    `}</style>
  </>
);

export default Contact;
