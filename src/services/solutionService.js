import { getSolutions } from "../firebase/firestore";

export const fetchSolutions = async (tenantId) => {
  return await getSolutions(tenantId);
};

export const defaultSolutions = [
  {
    id: "enterprise",
    title: "Enterprise Payments",
    description: "Scalable payment infrastructure for large enterprises with dedicated support, SLA guarantees, and custom integrations.",
    icon: "🏢",
    color: "#6366f1",
    order: 1,
    active: true,
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description: "Complete checkout solutions optimized for conversion, with one-click payments and smart cart recovery.",
    icon: "🛍️",
    color: "#8b5cf6",
    order: 2,
    active: true,
  },
  {
    id: "marketplace",
    title: "Marketplace Payouts",
    description: "Split payments and automated payouts for marketplace platforms with built-in compliance management.",
    icon: "🏪",
    color: "#06b6d4",
    order: 3,
    active: true,
  },
  {
    id: "saas",
    title: "SaaS Billing",
    description: "Metered and seat-based billing for SaaS businesses with usage tracking, trials, and flexible pricing.",
    icon: "☁️",
    color: "#10b981",
    order: 4,
    active: true,
  },
];
