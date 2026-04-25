import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppTheme } from "../constants/theme";
import { ProgressBar } from "./ProgressBar";

type Props = {
  budget: number;
  spent: number;
  remaining: number;
  percentageUsed: number;
  theme: AppTheme;
  onEditBudget: () => void;
};

export function BudgetOverview({
  budget,
  spent,
  remaining,
  percentageUsed,
  theme,
  onEditBudget,
}: Props) {
  const styles = createStyles(theme);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(value);

  const isOverBudget = remaining < 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>Monthly budget</Text>
          <Text style={styles.budget}>{formatCurrency(budget)}</Text>
        </View>

        <TouchableOpacity onPress={onEditBudget} activeOpacity={0.75}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Used</Text>
          <Text style={styles.progressValue}>{percentageUsed.toFixed(0)}%</Text>
        </View>

        <ProgressBar percentage={percentageUsed} theme={theme} />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Spent</Text>
          <Text style={styles.statValue}>{formatCurrency(spent)}</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>
            {isOverBudget ? "Over budget" : "Available"}
          </Text>
          <Text
            style={[
              styles.statValue,
              { color: isOverBudget ? theme.dangerText : theme.primary },
            ]}
          >
            {formatCurrency(Math.abs(remaining))}
          </Text>
        </View>
      </View>
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.card,
      borderRadius: 24,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: 18,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 12,
    },
    kicker: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1,
      fontWeight: "800",
      color: theme.mutedText,
    },
    budget: {
      marginTop: 6,
      fontSize: 34,
      fontWeight: "900",
      color: theme.text,
    },
    editText: {
      fontSize: 14,
      fontWeight: "800",
      color: theme.primary,
    },
    progressSection: {
      marginTop: 22,
    },
    progressHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    progressLabel: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.mutedText,
    },
    progressValue: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.text,
    },
    statsRow: {
      flexDirection: "row",
      gap: 12,
      marginTop: 20,
    },
    statItem: {
      flex: 1,
      backgroundColor: theme.background,
      borderRadius: 18,
      padding: 14,
      borderWidth: 1,
      borderColor: theme.border,
    },
    statLabel: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.mutedText,
    },
    statValue: {
      marginTop: 6,
      fontSize: 18,
      fontWeight: "900",
      color: theme.text,
    },
  });
