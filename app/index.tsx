import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { BudgetOverview } from "../src/components/BudgetOverview";
import { ExpenseCard } from "../src/components/ExpenseCard";
import { darkTheme, lightTheme } from "../src/constants/theme";
import { getBudget } from "../src/storage/budget";
import { deleteExpense, getExpenses } from "../src/storage/expenses";
import { Budget, Expense } from "../src/types/expense";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  const [budget, setBudget] = useState<Budget>({
    amount: 1000,
    currency: "EUR",
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const [storedBudget, storedExpenses] = await Promise.all([
      getBudget(),
      getExpenses(),
    ]);

    const sortedExpenses = storedExpenses.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    setBudget(storedBudget);
    setExpenses(sortedExpenses);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const spent = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remaining = budget.amount - spent;
  const percentageUsed =
    budget.amount > 0 ? Math.min((spent / budget.amount) * 100, 100) : 0;

  const removeExpense = async (id: string) => {
    await deleteExpense(id);
    await loadData();
  };

  const handleDeleteExpense = (id: string) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Delete this expense?");

      if (confirmed) {
        removeExpense(id);
      }

      return;
    }

    Alert.alert(
      "Delete expense",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => removeExpense(id),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>Local budget monitor</Text>
          <Text style={styles.title}>Expense Tracker</Text>
          <Text style={styles.subtitle}>
            Track spending, monitor your budget usage, and keep your data stored
            locally.
          </Text>
        </View>

        <BudgetOverview
          budget={budget.amount}
          spent={spent}
          remaining={remaining}
          percentageUsed={percentageUsed}
          theme={theme}
          onEditBudget={() => router.push("/budget-form")}
        />

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/expense-form")}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>+ Add expense</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Expenses</Text>
          <Text style={styles.sectionMeta}>{expenses.length} items</Text>
        </View>

        {loading ? (
          <Text style={styles.helperText}>Loading expenses...</Text>
        ) : expenses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>€</Text>
            <Text style={styles.emptyTitle}>No expenses yet</Text>
            <Text style={styles.emptyText}>
              Add your first expense to start tracking your budget.
            </Text>
          </View>
        ) : (
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <ExpenseCard
                expense={item}
                theme={theme}
                onEdit={() =>
                  router.push({
                    pathname: "/expense-form",
                    params: { id: item.id },
                  })
                }
                onDelete={() => handleDeleteExpense(item.id)}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: typeof lightTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      padding: 20,
    },
    hero: {
      marginBottom: 18,
    },
    kicker: {
      fontSize: 12,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 1,
      color: theme.mutedText,
    },
    title: {
      marginTop: 8,
      fontSize: 34,
      fontWeight: "900",
      color: theme.text,
    },
    subtitle: {
      marginTop: 8,
      fontSize: 15,
      lineHeight: 22,
      color: theme.mutedText,
    },
    actionsRow: {
      marginBottom: 20,
    },
    primaryButton: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 15,
      alignItems: "center",
    },
    primaryButtonText: {
      color: theme.primaryText,
      fontSize: 15,
      fontWeight: "900",
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "900",
      color: theme.text,
    },
    sectionMeta: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.mutedText,
    },
    helperText: {
      textAlign: "center",
      color: theme.mutedText,
    },
    list: {
      paddingBottom: 32,
    },
    emptyState: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 80,
    },
    emptyIcon: {
      fontSize: 48,
      color: theme.primary,
    },
    emptyTitle: {
      marginTop: 16,
      fontSize: 22,
      fontWeight: "900",
      color: theme.text,
    },
    emptyText: {
      marginTop: 8,
      textAlign: "center",
      fontSize: 15,
      lineHeight: 22,
      color: theme.mutedText,
    },
  });
