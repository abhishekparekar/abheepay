import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FiHome, FiAlertTriangle } from "react-icons/fi";

const NotFound = () => (
  <>
    <Helmet><title>404 – Page Not Found | SiD Pay</title></Helmet>
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--bg-dark)", position: "relative", overflow: "hidden", padding: "40px 16px",
    }}>
      <div className="orb orb-red" style={{ width: 500, height: 500, top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.07, animation: "none" }} />
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "clamp(6rem,15vw,10rem)", fontFamily: "'Outfit',sans-serif", fontWeight: 900, background: "var(--gradient-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1, marginBottom: 8 }}>
          404
        </div>
        <FiAlertTriangle size={40} style={{ color: "var(--red-light)", marginBottom: 20 }} />
        <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem,3vw,2rem)", marginBottom: 12 }}>Page Not Found</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 400, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <button className="btn-gradient" style={{ gap: 10, padding: "13px 28px" }}>
            <FiHome size={16} /> Back to Home
          </button>
        </Link>
      </div>
    </div>
  </>
);

export default NotFound;
