import { submitContact } from "../firebase/firestore";

/**
 * Submit a contact form message under the tenant's Firestore data.
 * @param {string} tenantId
 * @param {{ name, email, phone, subject, message }} formData
 */
export const sendContactMessage = async (tenantId, formData) => {
  return submitContact(tenantId, {
    name: formData.name?.trim() || "",
    email: formData.email?.trim().toLowerCase() || "",
    phone: formData.phone?.trim() || "",
    subject: formData.subject?.trim() || "",
    message: formData.message?.trim() || "",
    status: "unread",
    source: "website",
  });
};
