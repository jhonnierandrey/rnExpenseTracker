export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
};

export type Budget = {
  amount: number;
  currency: "EUR";
};
