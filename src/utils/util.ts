export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePassword = (password: string) => {
  return password.trim().length >= 6;
}

export const validatePhone = (phone: string) => {
  const phoneRegex = /^\+?\d{1,3}[- ]?\(?(?:\d{2,3})\)?[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/;
  return phoneRegex.test(phone.trim());
};

export const currencyFormatterRub = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0
})

export const currencyFormatterUsd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})
