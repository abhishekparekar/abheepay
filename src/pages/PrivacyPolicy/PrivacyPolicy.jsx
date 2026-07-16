import React from "react";
import { Helmet } from "react-helmet-async";

const sections = [
  {
    title: "1. Information We Collect",
    content: "We collect information you provide directly (name, email, payment details), information collected automatically (usage data, device info, IP address), and information from third-party integrations (payment processors, analytics providers).",
  },
  {
    title: "2. How We Use Your Information",
    content: "We use your information to process payments and transactions, provide customer support, send service-related communications, improve our platform, comply with legal obligations, and prevent fraud and abuse.",
  },
  {
    title: "3. Data Security",
    content: "We implement AES-256 encryption, TLS 1.3 for data in transit, PCI DSS Level 1 compliance, regular security audits, and strict access controls. Your payment data is never stored on our servers — it is tokenized immediately.",
  },
  {
    title: "4. Data Sharing",
    content: "We do not sell your personal data. We share data only with: payment processors needed to complete transactions, service providers operating on our behalf, law enforcement when legally required, and with your explicit consent.",
  },
  {
    title: "5. Cookies",
    content: "We use essential cookies for platform functionality, analytics cookies to improve our service (with your consent), and no third-party advertising cookies. You can manage cookie preferences in your account settings.",
  },
  {
    title: "6. Your Rights",
    content: "You have the right to access, correct, or delete your personal data; object to processing; request data portability; and withdraw consent at any time. Contact us at privacy@sidpay.com to exercise these rights.",
  },
  {
    title: "7. Data Retention",
    content: "We retain personal data only as long as necessary for the purposes it was collected — typically 7 years for financial transaction records per RBI guidelines, and 30 days for deleted account data.",
  },
  {
    title: "8. Contact Us",
    content: "For privacy-related queries, contact our Data Protection Officer at privacy@sidpay.com or write to: SiD Pay Privacy Team, Bandra Kurla Complex, Mumbai, Maharashtra, India — 400051.",
  },
];

const PrivacyPolicy = () => (
  <>
    <Helmet>
      <title>Privacy Policy – SiD Pay</title>
      <meta name="description" content="Read SiD Pay's Privacy Policy — how we collect, use, and protect your data." />
    </Helmet>

    <section style={{ paddingTop: 120, paddingBottom: 100, background: "var(--bg-dark)", position: "relative", overflow: "hidden" }}>
      <div className="orb orb-red" style={{ width: 400, height: 400, top: -100, right: -100, opacity: 0.07, animation: "none" }} />
      <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
        <div className="badge" style={{ marginBottom: 16 }}>🔒 Legal</div>
        <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: "clamp(2rem,4vw,2.8rem)", letterSpacing: "-0.02em", marginBottom: 12 }}>
          Privacy <span className="gradient-text">Policy</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 48 }}>
          Last updated: January 1, 2025 &nbsp;·&nbsp; Effective: January 1, 2025
        </p>

        <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.8, marginBottom: 48 }}>
          SiD Pay by Shashwat ("we", "us", or "our") is committed to protecting your privacy. This policy explains how we handle your personal information when you use our payment platform.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {sections.map(({ title, content }) => (
            <div key={title} style={{ padding: "28px 24px", background: "rgba(255,255,255,0.025)", border: "1px solid var(--border-card)", borderRadius: "var(--r-lg)", borderLeft: "3px solid var(--red)" }}>
              <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 12, color: "var(--text-primary)" }}>{title}</h2>
              <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.8 }}>{content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default PrivacyPolicy;
