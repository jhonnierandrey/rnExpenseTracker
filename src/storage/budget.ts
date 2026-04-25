import AsyncStorage from "@react-native-async-storage/async-storage";

import { Budget } from "../types/expense";

const STORAGE_KEY = "rnExpenseTracker:budget";

const DEFAULT_BUDGET: Budget = {
  amount: 1000,
  currency: "EUR",
};

export async function getBudget(): Promise<Budget> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : DEFAULT_BUDGET;
  } catch (error) {
    console.error("Error loading budget:", error);
    return DEFAULT_BUDGET;
  }
}

export async function saveBudget(budget: Budget) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(budget));
  } catch (error) {
    console.error("Error saving budget:", error);
  }
}
