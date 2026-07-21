export const formatCurrency = (value) => {
  if (value === undefined || value === null) return 'Rs. 0.00';
  const num = Number(value || 0);
  return `Rs. ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
