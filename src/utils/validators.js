export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => password && password.length >= 6;

export const validateNotEmpty = (value) => value && value.trim().length > 0;
