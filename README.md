# Expense Tracker

A minimal and modern **React Native + Expo** expense tracker that helps users monitor their monthly budget, track expenses, and visualize spending progress — all with local data persistence.

![Expense Tracker](https://github.com/jhonnierandrey/rnExpenseTracker/blob/main/src/assets/expensetracker-preview.png?raw=true)

This project is a refreshed version of the original `rnExpenseTracker`, rebuilt with Expo to modernize the architecture, simplify development, and deliver a clean, cross-platform experience across iOS, Android, and Web.

As seen in [React Native - Crea aplicaciones para Android y iOS c/ React by Juan Pablo De la torre Valdez](https://www.udemy.com/course/react-native-crea-aplicaciones-para-android-y-ios-con-react/) TypeScript and migration to Expo by personal preference.

---

## Overview

`rnExpenseTracker` allows users to:

- Set a monthly budget
- Add and manage expenses
- Track total spending
- View remaining balance
- Visualize budget usage with a progress bar

All data is stored locally using AsyncStorage, making the app fast, simple, and fully offline-capable.

---

## Features

- Set and edit monthly budget
- Add, edit, and delete expenses
- Calculate total spent and remaining balance
- Visualize budget usage percentage
- Lightweight progress bar (no heavy chart libraries)
- Local persistence using AsyncStorage
- Automatic light/dark mode (pure black dark theme)
- Cross-platform support (iOS, Android, Web)
- Minimal, clean, finance-style UI

---

## Tech Stack

- React Native
- Expo SDK 54
- TypeScript
- Expo Router
- AsyncStorage
- React Native StyleSheet

---

## Project Structure

```txt
app/
  _layout.tsx
  index.tsx
  expense-form.tsx
  budget-form.tsx

src/
  components/
    BudgetOverview.tsx
    ExpenseCard.tsx
    ProgressBar.tsx
  constants/
    theme.ts
  storage/
    budget.ts
    expenses.ts
  types/
    expense.ts
```

---

## Requirements

- Node.js
- npm
- Expo Go (iOS or Android)

---

## Installation

```bash
git clone https://github.com/jhonnierandrey/rnExpenseTracker.git
cd rnExpenseTracker
npm install
```

Install AsyncStorage (Expo-compatible):

```bash
npx expo install @react-native-async-storage/async-storage
```

---

## Running the App

```bash
npx expo start
```

Options:

- Scan QR with Expo Go
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for Web

---

## Data Model

### Expense

```ts
type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
};
```

### Budget

```ts
type Budget = {
  amount: number;
  currency: "EUR";
};
```

---

## Local Storage

Data is stored using AsyncStorage:

```txt
rnExpenseTracker:budget
rnExpenseTracker:expenses
```

- Persists across app reloads
- Cleared when app is uninstalled

---

## Current Scope

This version focuses on a clean and practical personal finance experience:

- Budget setup
- Expense tracking (CRUD)
- Real-time calculations
- Visual progress indicator
- Local persistence
- Dark mode support
- Cross-platform compatibility

---

## Future Improvements

- Category filters
- Expense charts (weekly/monthly)
- Currency selection
- Recurring expenses
- Export data (CSV/JSON)
- Backup & restore

---

## Development Notes

This project was rebuilt from scratch using Expo instead of migrating legacy React Native code. The goal was to create a modern, maintainable, and portfolio-ready application with a clean architecture and minimal dependencies.

---

## Author

Developed by **JAES Made It**  
Portfolio: https://www.jaesmadeit.com

---

## License

This project is available for personal and portfolio use.
