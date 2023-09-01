export const currencyFormatter = (amount: string) => {
  return Number(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const generateId = (): string => {
  const random = Math.random().toString(36).substring(2, 11);
  const date = Date.now().toString(36);
  return random + date;
};

export const dateFormatter = (date: number | undefined) => {
  if (date) {
    const newDate = new Date(date);

    return newDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  }
  return '';
};
