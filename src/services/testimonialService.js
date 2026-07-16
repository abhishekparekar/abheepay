import { getCollection, addDocument } from "../firebase/firestore";
import { where, orderBy } from "firebase/firestore";

export const fetchTestimonials = async (tenantId) => {
  try {
    const list = await getCollection(tenantId, "testimonials");
    return (list || [])
      .filter(item => item.active !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (err) {
    console.warn("Firestore testimonials error:", err);
    return [];
  }
};

export const submitTestimonial = async (tenantId, testimonialData) => {
  return addDocument(tenantId, "testimonials", {
    ...testimonialData,
    active: false, // requires admin approval by default
    createdAt: new Date(),
    order: 100
  });
};

export const defaultTestimonials = [
  {
    name: "Mr. Basit",
    location: "Uttar Pradesh",
    text: "SiD Pay's user-friendly interface and lightning-fast transactions have helped us manage a significantly higher volume of daily walk-ins. I am extremely satisfied being a partner.",
    rating: 5,
    avatar: "B"
  },
  {
    name: "Mr. Rajesh",
    location: "Madhya Pradesh",
    text: "The AEPS and withdrawal services provided by SiD Pay are incredibly reliable. The success rate is the best in the industry, and the technical support is always just a call away.",
    rating: 5,
    avatar: "R"
  },
  {
    name: "Mr. Aman",
    location: "Bihar",
    text: "Since I started using SiD Pay for Domestic Money Transfers, my customers' trust has grown immensely. The real-time settlement and transparency are truly unmatched.",
    rating: 5,
    avatar: "A"
  }
];
