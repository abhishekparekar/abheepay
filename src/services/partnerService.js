import { getPartners } from "../firebase/firestore";

export const fetchPartners = async (tenantId) => {
  return await getPartners(tenantId);
};

export const defaultPartners = [
  { id: "visa", name: "Visa", order: 1, active: true },
  { id: "mastercard", name: "Mastercard", order: 2, active: true },
  { id: "amex", name: "American Express", order: 3, active: true },
  { id: "paypal", name: "PayPal", order: 4, active: true },
  { id: "stripe", name: "Stripe", order: 5, active: true },
  { id: "apple-pay", name: "Apple Pay", order: 6, active: true },
  { id: "google-pay", name: "Google Pay", order: 7, active: true },
  { id: "amazon-pay", name: "Amazon Pay", order: 8, active: true },
];
