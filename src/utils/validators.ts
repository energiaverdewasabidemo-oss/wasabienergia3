export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateSpanishPhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateSpanishPostalCode = (postalCode: string): boolean => {
  const postalCodeRegex = /^[0-5]\d{4}$/;
  return postalCodeRegex.test(postalCode);
};
