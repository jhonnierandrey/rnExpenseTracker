import AsyncStorage from "@react-native-async-storage/async-storage";

import { Expense } from "../types/expense";

const STORAGE_KEY = "rnExpenseTracker:expenses";

export async function getExpenses(): Promise<Expense[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading expenses:", error);
    return [];
  }
}

export async function saveExpenses(expenses: Expense[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error("Error saving expenses:", error);
  }
}

export async function getExpenseById(id: string): Promise<Expense | undefined> {
  const expenses = await getExpenses();
  return expenses.find((expense) => expense.id === id);
}

export async function upsertExpense(expense: Expense) {
  const expenses = await getExpenses();

  const exists = expenses.some((item) => item.id === expense.id);

  const updated = exists
    ? expenses.map((item) => (item.id === expense.id ? expense : item))
    : [expense, ...expenses];

  await saveExpenses(updated);
}

export async function deleteExpense(id: string) {
  const expenses = await getExpenses();
  const updated = expenses.filter((expense) => expense.id !== id);

  await saveExpenses(updated);
}
