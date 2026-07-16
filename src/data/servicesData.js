export const serviceCategories = {
  api: {
    title: "API",
    items: [
      { slug: "digital-payment-solutions", title: "Digital Payment Solutions", icon: "💳" },
      { slug: "assisted-banking", title: "Assisted Banking & Cash Management", icon: "🏦" },
      { slug: "bbps-recharge", title: "BBPS, Recharge & Bill Payments", icon: "⚡" },
      { slug: "lending-credit", title: "Lending & Credit Solutions", icon: "📈" },
      { slug: "insurance-solutions", title: "Insurance Solutions", icon: "🛡️" },
      { slug: "travel-apis", title: "Travel APIs & Travel Services", icon: "✈️" },
      { slug: "technology-api", title: "Technology & API Services", icon: "⚙️" }
    ]
  },
  banking: {
    title: "Banking",
    items: [
      { slug: "digital-payment-solutions", title: "Digital Payment Solutions", icon: "💳" },
      { slug: "assisted-banking", title: "Assisted Banking & Cash Management", icon: "🏦" },
      { slug: "bbps-recharge", title: "BBPS, Recharge & Bill Payments", icon: "⚡" },
      { slug: "lending-credit", title: "Lending & Credit Solutions", icon: "📈" },
      { slug: "insurance-solutions", title: "Insurance Solutions", icon: "🛡️" },
      { slug: "travel-apis", title: "Travel APIs & Travel Services", icon: "✈️" },
      { slug: "technology-api", title: "Technology & API Services", icon: "⚙️" }
    ]
  },
  development: {
    title: "Development",
    items: [
      { slug: "web-infrastructure", title: "Web Infrastructure & Maintenance", icon: "🌐" },
      { slug: "ecommerce-websites", title: "Ecommerce websites", icon: "🛍️" },
      { slug: "software-development", title: "software development", icon: "💻" },
      { slug: "customised-software", title: "Customised software development", icon: "🛠️" },
      { slug: "white-label-software", title: "White label software development", icon: "🏷️" },
      { slug: "app-development", title: "App development", icon: "📱" }
    ]
  }
};

export const serviceDetails = {
  "digital-payment-solutions": {
    title: "Digital Payment Solutions",
    icon: "💳",
    desc: "Robust online payment gateway, terminals, and contactless payments built for enterprise scale.",
    features: [
      "Online Payment Gateway – UPI, Cards, Net Banking, Wallets",
      "POS & Android POS Devices",
      "QR-Based Contactless Payments",
      "QR Code Solutions",
      "Sound Box Services"
    ],
    benefits: [
      "Instant Settlements for high cash flow requirements.",
      "99.9% Transaction Success Rate with multi-bank smart routing.",
      "PCI DSS Level 1 Certified end-to-end security encryption."
    ],
    color: "#e53935"
  },
  "assisted-banking": {
    title: "Assisted Banking & Cash Management",
    icon: "🏦",
    desc: "Extend basic banking services like cash withdrawals and deposits at local merchant points.",
    features: [
      "AEPS – Cash withdrawal, balance inquiry, mini statement",
      "Micro ATM (mATM) services"
    ],
    benefits: [
      "Empower local retailers to become mini bank branches.",
      "Reliable cash management networks with minimal settlement lag.",
      "Earn attractive commissions on banking services."
    ],
    color: "#f4511e"
  },
  "bbps-recharge": {
    title: "BBPS, Recharge & Bill Payments",
    icon: "⚡",
    desc: "Integrated utility bill payments, mobile recharges, and credit card payments via BBPS.",
    features: [
      "Mobile, DTH & data card recharges",
      "Credit card bill payments",
      "Electricity, Water, Gas and Broadband bill payments"
    ],
    benefits: [
      "Direct API integration with NPCI Bharat BillPay system.",
      "Real-time status tracking for billing statements.",
      "Unified utility wallet for distributors and retail networks."
    ],
    color: "#d81b60"
  },
  "lending-credit": {
    title: "Lending & Credit Solutions",
    icon: "📈",
    desc: "Seamless working capital support and digital loan onboarding for MSMEs and retailers.",
    features: [
      "Business loans & working capital finance",
      "Personal loans with digital onboarding",
      "Credit card sourcing and lifecycle support"
    ],
    benefits: [
      "Completely paperless application flow directly inside the dashboard.",
      "Flexible repayment structures linked directly to your payout settlement.",
      "Tie-ups with leading NBFCs for instant loan approvals."
    ],
    color: "#e53935"
  },
  "insurance-solutions": {
    title: "Insurance Solutions",
    icon: "🛡️",
    desc: "Protect your retail assets, health, and family with instant policy generation.",
    features: [
      "Health insurance",
      "Life insurance",
      "General & travel insurance"
    ],
    benefits: [
      "Instant certificate generation for customers.",
      "Attractive retail broker commission margins.",
      "Simple, transparent claims submission support."
    ],
    color: "#f4511e"
  },
  "travel-apis": {
    title: "Travel APIs & Travel Services",
    icon: "✈️",
    desc: "Ticketing APIs and travel portal packages for agents to book transport and hotels.",
    features: [
      "Flight booking (Domestic & International)",
      "Bus ticket booking",
      "Train ticket booking",
      "Hotel booking",
      "Holiday packages"
    ],
    benefits: [
      "Real-time pricing search index.",
      "Attractive markup management console for distributors.",
      "Instant cancellation and refund processing."
    ],
    color: "#d81b60"
  },
  "technology-api": {
    title: "Technology & API Services",
    icon: "⚙️",
    desc: "Empowering fintech startups with developer-first payment, wallet, and travel APIs.",
    features: [
      "Payment, banking, travel & wallet APIs",
      "Merchant, distributor & admin dashboards",
      "White-label fintech & travel platforms"
    ],
    benefits: [
      "Full API sandbox sandbox testing keys.",
      "Intuitive developer documentation with 10+ language SDKs.",
      "Robust webhook monitoring with auto-retries."
    ],
    color: "#e53935"
  },
  "web-infrastructure": {
    title: "Web Infrastructure & Maintenance",
    icon: "🌐",
    desc: "Professional system administration, web hosting and security monitoring for fintech apps.",
    features: [
      "Secure hosting infrastructure setup",
      "Performance optimization & CDN configs",
      "Database backups and server health audits",
      "24/7 web security monitoring"
    ],
    benefits: [
      "Achieve optimal loading speeds with modern content delivery networks.",
      "Rest assured with automated secure offsite databases backups.",
      "Active intrusion prevention systems safeguard transaction logs."
    ],
    color: "#f4511e"
  },
  "ecommerce-websites": {
    title: "Ecommerce websites",
    icon: "🛍️",
    desc: "Turnkey e-commerce store setups with checkout page optimizations.",
    features: [
      "Fully responsive custom storefront templates",
      "Shopping cart and order inventory systems",
      "Instant billing integrations",
      "SEO optimized configurations out-of-the-box"
    ],
    benefits: [
      "Accept UPI and cards natively with standard SiD Pay gateway.",
      "Easily scale from a single product store to thousands.",
      "Responsive UI built for mobile-first shoppers."
    ],
    color: "#d81b60"
  },
  "software-development": {
    title: "software development",
    icon: "💻",
    desc: "Custom application building across Node, React, and native app frameworks.",
    features: [
      "Web app design & architecture",
      "Relational & non-relational database design",
      "System integration consulting",
      "Modern code review and maintenance services"
    ],
    benefits: [
      "Codebases written using industry best-practices and patterns.",
      "Highly scalable systems designed to handle parallel transactions.",
      "Clear, readable documentation for long-term project viability."
    ],
    color: "#e53935"
  },
  "customised-software": {
    title: "Customised software development",
    icon: "🛠️",
    desc: "Tailored enterprise solutions engineered to suit complex proprietary business logics.",
    features: [
      "Proprietary backend algorithm setups",
      "Enterprise systems migration and integration",
      "Dedicated developer hours allocated",
      "Secure banking system integrations"
    ],
    benefits: [
      "Engineered strictly according to your specific enterprise standards.",
      "Seamless bridge connections with legacy database architectures.",
      "Dedicated operational support SLA guarantees."
    ],
    color: "#f4511e"
  },
  "white-label-software": {
    title: "White label software development",
    icon: "🏷️",
    desc: "Custom branded software platforms ready to launch under your domain.",
    features: [
      "Branded payment portal layout setup",
      "Domain name mapping settings",
      "Merchant markup commission panels",
      "Automatic software updates"
    ],
    benefits: [
      "Launch a fully working payment portal within 48 hours.",
      "Your own brand logo, domain name, and pricing setup.",
      "Zero dev maintenance overhead — handled by our cloud servers."
    ],
    color: "#d81b60"
  },
  "app-development": {
    title: "App development",
    icon: "📱",
    desc: "Native iOS and Android mobile app development for transaction processing.",
    features: [
      "React Native & Flutter app development",
      "Responsive layout optimized for smartphones",
      "App Store & Play Store publishing",
      "Biometric login configurations"
    ],
    benefits: [
      "Provide a highly convenient mobile app experience for retailers.",
      "Enable instant push alerts for cash-out transactions.",
      "Lightweight download sizes for maximum device compatibility."
    ],
    color: "#e53935"
  }
};
