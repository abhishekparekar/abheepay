import React from "react";
import { Helmet } from "react-helmet-async";

const sections = [
  { title: "1. Acceptance of Terms",        content: "By accessing or using SiD Pay's services, you agree to be bound by these Terms of Service. If you do not agree to all the terms, you may not use our services. These terms apply to all users, merchants, and developers using the platform." },
  { title: "2. Account Registration",       content: "You must provide accurate, current, and complete information during registration. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorised access." },
  { title: "3. Payment Processing",         content: "SiD Pay facilitates payment processing between merchants and their customers. We are not a bank and do not hold funds. Settlement timelines depend on your plan (T+1 or T+2). You are responsible for ensuring transactions comply with applicable laws." },
  { title: "4. Prohibited Activities",      content: "You may not use SiD Pay for illegal transactions, money laundering, funding terrorism, selling prohibited goods, processing stolen payment credentials, or any activity that violates RBI guidelines or applicable Indian laws." },
  { title: "5. Fees & Pricing",             content: "Transaction fees are displayed on your dashboard and may vary by payment method, volume, and plan. We reserve the right to change fees with 30 days' notice. All fees are non-refundable except where required by law." },
  { title: "6. Chargebacks & Disputes",     content: "You are responsible for addressing customer disputes and chargebacks. SiD Pay may place a reserve on your account if chargeback rates exceed acceptable thresholds. Repeated violations may result in account suspension." },
  { title: "7. Intellectual Property",      content: "All intellectual property in the SiD Pay platform, including software, design, and documentation, is owned by Shashwat Technologies Pvt. Ltd. You are granted a limited, non-exclusive licence to use our services as intended." },
  { title: "8. Termination",                content: "Either party may terminate this agreement with 30 days' notice. We may immediately suspend your account for violations of these terms. Upon termination, any outstanding settlements will be processed within 90 days." },
  { title: "9. Limitation of Liability",    content: "To the maximum extent permitted by law, SiD Pay's liability is limited to the fees paid by you in the preceding 3 months. We are not liable for indirect, incidental, or consequential damages arising from your use of our services." },
  { title: "10. Governing Law",             content: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra. For disputes under ₹50 lakh, we encourage arbitration through the DIAC." },
];

const Terms = () => (
  <>
    <Helmet>
      <title>Terms of Service – SiD Pay</title>
      <meta name="description" content="Read SiD Pay's Terms of Service to understand your rights and obligations." />
    </Helmet>

    <section style={{ paddingTop: 120, paddingBottom: 100, background: "var(--bg-dark)", position: "relative", overflow: "hidden" }}>
      <div className="orb orb-magenta" style={{ width: 400, height: 400, top: -100, left: -100, opacity: 0.07, animation: "none" }} />
      <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
        <div className="badge" style={{ marginBottom: 16 }}>📄 Legal</div>
        <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: "clamp(2rem,4vw,2.8rem)", letterSpacing: "-0.02em", marginBottom: 12 }}>
          Terms of <span className="gradient-text">Service</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 48 }}>
          Last updated: January 1, 2025 &nbsp;·&nbsp; Effective: January 1, 2025
        </p>

        <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.8, marginBottom: 48 }}>
          Please read these Terms of Service carefully before using SiD Pay's payment platform operated by Shashwat Technologies Pvt. Ltd.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {sections.map(({ title, content }) => (
            <div key={title} style={{ padding: "26px 24px", background: "rgba(255,255,255,0.025)", border: "1px solid var(--border-card)", borderRadius: "var(--r-lg)", borderLeft: "3px solid var(--magenta)" }}>
              <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{title}</h2>
              <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.8 }}>{content}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, padding: "24px", background: "rgba(229,57,53,0.07)", border: "1px solid var(--border-hover)", borderRadius: "var(--r-lg)", textAlign: "center" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
            Questions about our terms? Contact us at{" "}
            <a href="mailto:legal@sidpay.com" style={{ color: "var(--red-light)", fontWeight: 600 }}>legal@sidpay.com</a>
          </p>
        </div>
      </div>
    </section>
  </>
);

export default Terms;
