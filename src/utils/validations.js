// Form validation helpers
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone) =>
  /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""));

export const isStrongPassword = (pw) =>
  pw.length >= 6;

export const validateContactForm = ({ name, email, message }) => {
  const errors = {};
  if (!name?.trim()) errors.name = "Name is required.";
  if (!email?.trim()) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email.";
  if (!message?.trim()) errors.message = "Message is required.";
  return errors;
};
