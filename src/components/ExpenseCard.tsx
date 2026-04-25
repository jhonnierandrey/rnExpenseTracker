import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppTheme } from "../constants/theme";
import { Expense } from "../types/expense";

type Props = {
  expense: Expense;
  theme: AppTheme;
  onEdit: () => void;
  onDelete: () => void;
};

export function ExpenseCard({ expense, theme, onEdit, onDelete }: Props) {
  const styles = createStyles(theme);

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(expense.amount);

  const formattedDate = new Date(expense.date).toLocaleDateString();

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.mainContent} onPress={onEdit}>
        <View>
          <Text style={styles.title}>{expense.title}</Text>
          <Text style={styles.meta}>
            {expense.category} · {formattedDate}
          </Text>
        </View>

        <Text style={styles.amount}>-{formattedAmount}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete} activeOpacity={0.7}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.card,
      borderRadius: 18,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.border,
    },
    mainContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 14,
    },
    title: {
      fontSize: 16,
      fontWeight: "800",
      color: theme.text,
    },
    meta: {
      marginTop: 4,
      fontSize: 13,
      color: theme.mutedText,
    },
    amount: {
      fontSize: 16,
      fontWeight: "900",
      color: theme.text,
    },
    deleteText: {
      marginTop: 12,
      fontSize: 13,
      fontWeight: "800",
      color: theme.dangerText,
    },
  });
