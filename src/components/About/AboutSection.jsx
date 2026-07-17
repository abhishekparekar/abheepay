import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

const AboutSection = () => (
  <section style={{
    padding: "var(--section-py) 0",
    background: "#ffffff",
    color: "#0c0509",
    position: "relative",
    overflow: "hidden"
  }}>
    <div style={{
      position: "absolute",
      top: "10%",
      left: "50%",
      transform: "translateX(-50%)",
      width: 600,
      height: 600,
      background: "radial-gradient(circle, rgba(229,57,53,0.03) 0%, transparent 70%)",
      pointerEvents: "none"
    }} />

    <div className="container" style={{ position: "relative", zIndex: 1 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 60,
        alignItems: "center"
      }} className="about-layout">

        {/* ── LEFT – Visual Collage with scroll entrance ── */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ position: "relative", minHeight: 380 }} 
          className="about-collage-container"
        >
          {/* Main Image */}
          <div style={{
            width: "80%",
            height: 280,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 12px 36px rgba(0,0,0,0.15)",
            border: "4px solid #fff"
          }}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
              alt="SiD Pay Team"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Overlapping offset Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              position: "absolute",
              bottom: 0,
              right: 10,
              width: "45%",
              height: 180,
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 12px 36px rgba(0,0,0,0.2)",
              border: "6px solid #fff"
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
              alt="Fintech Manager"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>

          {/* Red badge */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            style={{
              position: "absolute",
              top: 20,
              right: "10%",
              background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
              borderRadius: 16,
              padding: "16px 24px",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(229,57,53,0.3)",
              textAlign: "center",
              zIndex: 3
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 900 }}>30K+</div>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", marginTop: 4, textTransform: "uppercase" }}>Active Partners</div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT – Text & Checkmarks ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span style={{
            fontSize: 12,
            fontWeight: 800,
            color: "#e53935",
            textTransform: "uppercase",
            letterSpacing: "0.08em"
          }}>
            ABOUT SID PAY
          </span>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
            color: "#0c0509",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginTop: 10,
            marginBottom: 20
          }}>
            Powering Digital Finance for Modern Indian Businesses
          </h2>

          <p style={{ color: "#524449", fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>
            SiD Pay is a technology-driven fintech and digital financial services company delivering secure, scalable, and compliance-ready solutions across India.
          </p>

          <p style={{ color: "#524449", fontSize: 15, lineHeight: 1.75, marginBottom: 32 }}>
            Designed to serve merchants, MSMEs, enterprises, partners, and consumers, SiD Pay combines robust financial infrastructure with innovation-led technology to simplify transactions and enable sustainable business growth.
          </p>

          {/* Check Features */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "18px 24px",
            marginBottom: 36
          }} className="about-bullets">
            {[
              "Secure & Scalable Payment Solutions",
              "Banking, Credit & Insurance Services",
              "API-Led Financial Infrastructure",
              "Trusted Platform for MSMEs & Enterprises"
            ].map((feat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx + 0.3 }}
                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <FiCheckCircle size={15} style={{ color: "#e53935", flexShrink: 0, marginTop: 3 }} />
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "#2d2427", lineHeight: 1.4 }}>{feat}</span>
              </motion.div>
            ))}
          </div>

          <Link to="/about">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "13px 30px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 14.5,
                border: "none",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                color: "#fff",
                boxShadow: "0 6px 20px rgba(229, 57, 53, 0.35)",
                cursor: "pointer",
                transition: "box-shadow 0.25s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 10px 28px rgba(229, 57, 53, 0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(229, 57, 53, 0.35)"; }}
            >
              Know More <FiArrowRight size={15} />
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </div>

    <style>{`
      @media(max-width:860px){
        .about-layout {
          grid-template-columns: 1fr!important;
          gap: 40px!important;
        }
        .about-collage-container {
          min-height: 320px!important;
        }
      }
    `}</style>
  </section>
);

export default AboutSection;
