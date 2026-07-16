import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiArrowLeft } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle, authLoading, authError, clearError } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [localError, setLocalError] = useState("");

  const onChange = (e) => {
    clearError();
    setLocalError("");
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setLocalError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }
    try {
      await register(form.email, form.password, form.name);
      navigate("/");
    } catch {}
  };

  const onGoogle = async () => {
    try { await loginWithGoogle(); navigate("/"); } catch {}
  };

  const error = localError || authError;

  return (
    <>
      <Helmet><title>Create Account – SiD Pay</title></Helmet>
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #080306 0%, #0d0408 50%, #0a0306 100%)",
        position: "relative", overflow: "hidden", padding: "40px 16px",
      }}>
        <div className="orb orb-red"     style={{ width: 600, height: 600, top: -200, right: -150, opacity: 0.1 }} />
        <div className="orb orb-magenta" style={{ width: 400, height: 400, bottom: -100, left: -100, opacity: 0.09, animationDelay: "-5s" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(229,57,53,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(229,57,53,0.03) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />

        <div style={{ width: "100%", maxWidth: 460, position: "relative", zIndex: 1 }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: 14, marginBottom: 28, transition: "var(--ease)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}>
            <FiArrowLeft size={15} /> Back to Home
          </Link>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "36px 32px", backdropFilter: "blur(20px)" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 24px rgba(229,57,53,0.45)", margin: "0 auto 18px" }}>
                <FiShield size={26} color="#fff" />
              </div>
              <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 24, marginBottom: 6 }}>Create your account</h1>
              <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Start accepting payments today — free for 30 days</p>
            </div>

            <button onClick={onGoogle} disabled={authLoading} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "12px", marginBottom: 20, background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-card)", borderRadius: "var(--r-sm)", color: "var(--text-primary)", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "var(--ease)", fontFamily: "inherit" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
              <FcGoogle size={20} /> Sign up with Google
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: "var(--border-card)" }} />
              <span style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 500 }}>OR</span>
              <div style={{ flex: 1, height: 1, background: "var(--border-card)" }} />
            </div>

            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label className="input-label">Full Name</label>
                <div style={{ position: "relative" }}>
                  <FiUser size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                  <input name="name" required value={form.name} onChange={onChange} className="input-field" placeholder="Your full name" style={{ paddingLeft: 42 }} />
                </div>
              </div>
              <div className="form-group">
                <label className="input-label">Email Address</label>
                <div style={{ position: "relative" }}>
                  <FiMail size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                  <input name="email" type="email" required value={form.email} onChange={onChange} className="input-field" placeholder="you@example.com" style={{ paddingLeft: 42 }} />
                </div>
              </div>
              <div className="form-group">
                <label className="input-label">Password</label>
                <div style={{ position: "relative" }}>
                  <FiLock size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                  <input name="password" type={showPw ? "text" : "password"} required value={form.password} onChange={onChange} className="input-field" placeholder="Min. 6 characters" style={{ paddingLeft: 42, paddingRight: 44 }} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                    {showPw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="input-label">Confirm Password</label>
                <div style={{ position: "relative" }}>
                  <FiLock size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                  <input name="confirm" type="password" required value={form.confirm} onChange={onChange} className="input-field" placeholder="Re-enter password" style={{ paddingLeft: 42 }} />
                </div>
              </div>

              {error && <div className="error-msg" style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>⚠ {error}</div>}

              <button type="submit" className="btn-gradient" disabled={authLoading} style={{ width: "100%", padding: 14, fontSize: 15, opacity: authLoading ? 0.7 : 1 }}>
                {authLoading ? "Creating account..." : "Create Free Account"}
              </button>

              <p style={{ textAlign: "center", marginTop: 20, color: "var(--text-muted)", fontSize: 13 }}>
                By signing up, you agree to our{" "}
                <Link to="/terms" style={{ color: "var(--red-light)", fontWeight: 600 }}>Terms</Link> and{" "}
                <Link to="/privacy" style={{ color: "var(--red-light)", fontWeight: 600 }}>Privacy Policy</Link>.
              </p>
            </form>

            <p style={{ textAlign: "center", marginTop: 20, color: "var(--text-muted)", fontSize: 14, borderTop: "1px solid var(--border-card)", paddingTop: 20 }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "var(--red-light)", fontWeight: 700 }}>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
