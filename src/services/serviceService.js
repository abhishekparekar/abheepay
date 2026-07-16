import { getServices } from "../firebase/firestore";

export const fetchServices = async (tenantId) => {
  return await getServices(tenantId);
};

export const defaultServices = [
  {
    id: "payment-processing",
    icon: "💳",
    title: "Payment Processing",
    description: "Lightning-fast, secure payment processing with 99.9% uptime and support for 150+ currencies worldwide.",
    features: ["Multi-currency support", "Instant settlements", "Fraud detection", "PCI DSS compliant"],
    order: 1,
    active: true,
  },
  {
    id: "digital-wallets",
    icon: "📱",
    title: "Digital Wallets",
    description: "Empower your customers with seamless digital wallet experiences across all devices and platforms.",
    features: ["Apple Pay & Google Pay", "QR code payments", "Contactless NFC", "Biometric auth"],
    order: 2,
    active: true,
  },
  {
    id: "api-integration",
    icon: "🔗",
    title: "API Integration",
    description: "Developer-first payment APIs with comprehensive documentation, SDKs, and sandbox environments.",
    features: ["RESTful APIs", "Webhooks", "SDKs for 10+ languages", "Sandbox testing"],
    order: 3,
    active: true,
  },
  {
    id: "analytics",
    icon: "📊",
    title: "Analytics & Reporting",
    description: "Real-time dashboards and custom reporting to track revenue, trends, and customer behavior.",
    features: ["Real-time dashboards", "Custom reports", "Revenue analytics", "Chargeback management"],
    order: 4,
    active: true,
  },
  {
    id: "fraud-prevention",
    icon: "🛡️",
    title: "Fraud Prevention",
    description: "AI-powered fraud detection that protects your business with adaptive machine learning models.",
    features: ["AI risk scoring", "3D Secure 2.0", "Velocity checks", "IP geolocation"],
    order: 5,
    active: true,
  },
  {
    id: "recurring-billing",
    icon: "🔄",
    title: "Recurring Billing",
    description: "Flexible subscription management with smart retry logic and automatic failed payment recovery.",
    features: ["Subscription plans", "Smart retries", "Proration", "Dunning management"],
    order: 6,
    active: true,
  },
];
