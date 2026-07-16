import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiLock, FiEye, FiEyeOff, FiArrowLeft, FiShield, FiUser } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login, authLoading, authError, clearError } = useAuth();
  
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleInputChange = (e) => {
    clearError();
    setLocalError("");
    if (e.target.name === "identifier") {
      setIdentifier(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    
    const input = identifier.trim();
    if (!input) {
      setLocalError("Please enter your Phone or Email.");
      return;
    }

    try {
      if (input.includes("@")) {
        // Email login (Admin or Email-based accounts)
        await login(input, password);
        navigate("/admin");
      } else {
        // Phone login (User/Merchant Portal)
        const cleanPhone = input.replace(/[^0-9]/g, "");
        if (cleanPhone.length < 8) {
          setLocalError("Please enter a valid phone number or email address.");
          return;
        }
        const mappedEmail = `phone_${cleanPhone}@sidpay.com`;
        
        await login(mappedEmail, password);
        navigate("/admin");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const errorMsg = localError || authError;

  return (
    <>
      <Helmet>
        <title>Sign In – SiD Pay</title>
      </Helmet>

      <div style={{
        height: "100vh",
        maxHeight: "100vh",
        background: "linear-gradient(135deg, #ffffff 0%, #f4f7f6 100%)",
        color: "#0c0509",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        boxSizing: "border-box",
        overflow: "hidden"
      }} className="login-page-wrapper">
        
        {/* Main centered column wrapper */}
        <div style={{
          maxWidth: 370,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 12
        }}>
          
          {/* Back Link */}
          <div style={{ textAlign: "left" }}>
            <Link to="/" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#77676c",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease"
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#e53935"}
              onMouseLeave={e => e.currentTarget.style.color = "#77676c"}
            >
              <FiArrowLeft size={15} /> Back to Home
            </Link>
          </div>

          {/* Logo Brand Header */}
          <div style={{ textAlign: "center", marginBottom: 4 }}>
            {/* SVG Logo circle */}
            <div style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#110709",
              border: "2px solid #e53935",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 8px",
              boxShadow: "0 4px 12px rgba(229,57,53,0.12)"
            }}>
              <FiShield size={20} style={{ color: "#e53935" }} />
            </div>
            
            {/* Title */}
            <div style={{
              fontSize: 22,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              lineHeight: 1.1,
              display: "flex",
              justifyContent: "center",
              gap: 4
            }}>
              <span style={{ color: "#e53935" }}>SiD</span>
              <span style={{ color: "#110709" }}>Pay</span>
            </div>
            
            {/* Subtitle */}
            <p style={{ color: "#524449", fontSize: 13, fontWeight: 600, marginTop: 4, marginBottom: 0 }}>
              Simplifying Your Financial Transactions
            </p>
          </div>

          {/* Login Container Card */}
          <div style={{
            background: "#ffffff",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            borderRadius: 20,
            padding: "24px 28px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.01)"
          }} className="login-card">

            {/* Header label */}
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: 18,
              textAlign: "center",
              marginBottom: 20,
              color: "#0c0509",
              marginTop: 0
            }}>
              Log In to Your Account
            </h2>

            {/* Form */}
            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              
              {/* Identifier Input */}
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label className="field-label">Phone or Email *</label>
                <div style={{ position: "relative" }}>
                  <input
                    name="identifier"
                    type="text"
                    required
                    value={identifier}
                    onChange={handleInputChange}
                    className="login-input"
                    placeholder="Enter phone number or email"
                  />
                </div>
              </div>

              {/* Password field */}
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label className="field-label">Password *</label>
                <div style={{ position: "relative" }}>
                  <input
                    name="password"
                    type={showPw ? "text" : "password"}
                    required
                    value={password}
                    onChange={handleInputChange}
                    className="login-input"
                    style={{ paddingRight: 40 }}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#77676c",
                      cursor: "pointer"
                    }}
                  >
                    {showPw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "#e53935",
                  background: "rgba(229,57,53,0.05)",
                  border: "1px solid rgba(229,57,53,0.15)",
                  padding: "8px 12px",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}>
                  <span>⚠</span> {errorMsg}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={authLoading}
                style={{
                  width: "100%",
                  padding: "12px 0",
                  background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
                  color: "#fff",
                  fontSize: 14.5,
                  fontWeight: 700,
                  border: "none",
                  borderRadius: 8,
                  cursor: authLoading ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 14px rgba(229,57,53,0.22)",
                  transition: "all 0.2s ease",
                  marginTop: 4
                }}
                onMouseEnter={e => { if (!authLoading) e.currentTarget.style.filter = "brightness(1.05)"; }}
                onMouseLeave={e => { if (!authLoading) e.currentTarget.style.filter = "none"; }}
              >
                {authLoading ? "Logging In..." : "Log In"}
              </button>
            </form>

            {/* Forgot password */}
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <Link to="/contact" style={{ fontSize: 13, color: "#e53935", fontWeight: 600, textDecoration: "none" }}>
                Forgot Password?
              </Link>
            </div>

          </div>

          {/* Sign up prompt */}
          <p style={{ color: "#524449", fontSize: 13, marginTop: 12, marginBottom: 0, textAlign: "center" }}>
            Don't have a merchant account?{" "}
            <Link to="/register" style={{ color: "#e53935", fontWeight: 700, textDecoration: "none" }}>
              Sign Up
            </Link>
          </p>

        </div>
      </div>

      <style>{`
        .login-card .login-input {
          width: 100%;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #e1e6eb;
          font-size: 13.5px;
          color: #0c0509;
          outline: none;
          transition: all 0.25s ease;
          box-sizing: border-box;
          background: #ffffff;
        }
        .login-card .login-input:focus {
          border-color: #e53935;
          box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.08);
        }
        .login-card .field-label {
          font-size: 10.5px;
          font-weight: 700;
          color: #524449;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
      `}</style>
    </>
  );
};

export default Login;
