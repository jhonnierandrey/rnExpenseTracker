import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { darkTheme, lightTheme } from "../src/constants/theme";
import { getExpenseById, upsertExpense } from "../src/storage/expenses";
import { Expense } from "../src/types/expense";

export default function ExpenseFormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const isEditing = Boolean(id);

  useEffect(() => {
    async function loadExpense() {
      if (!id) return;

      const expense = await getExpenseById(id);

      if (!expense) return;

      setTitle(expense.title);
      setAmount(expense.amount.toString());
      setCategory(expense.category);
      setDate(expense.date.slice(0, 10));
    }

    loadExpense();
  }, [id]);

  const handleSave = async () => {
    if (!title || !amount || !category || !date) {
      Alert.alert(
        "Missing information",
        "Please complete all required fields.",
      );
      return;
    }

    const parsedAmount = Number(amount.replace(",", "."));

    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert("Invalid amount", "Please enter a valid positive amount.");
      return;
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      Alert.alert("Invalid date", "Please use the format YYYY-MM-DD.");
      return;
    }

    const expense: Expense = {
      id: id ?? Date.now().toString(),
      title,
      amount: parsedAmount,
      category,
      date: parsedDate.toISOString(),
      createdAt: new Date().toISOString(),
    };

    await upsertExpense(expense);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>
            {isEditing ? "Edit expense" : "New expense"}
          </Text>

          <Text style={styles.subtitle}>
            Add the expense details to update your budget usage.
          </Text>

          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Groceries"
            placeholderTextColor={theme.mutedText}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Amount *</Text>
          <TextInput
            style={styles.input}
            placeholder="25.50"
            placeholderTextColor={theme.mutedText}
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Category *</Text>
          <TextInput
            style={styles.input}
            placeholder="Food"
            placeholderTextColor={theme.mutedText}
            value={category}
            onChangeText={setCategory}
          />

          <Text style={styles.label}>Date *</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={theme.mutedText}
            value={date}
            onChangeText={setDate}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {isEditing ? "Save changes" : "Create expense"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (theme: typeof lightTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    keyboardView: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    content: {
      padding: 20,
      paddingBottom: 40,
    },
    title: {
      fontSize: 32,
      fontWeight: "900",
      color: theme.text,
    },
    subtitle: {
      marginTop: 8,
      marginBottom: 24,
      fontSize: 15,
      lineHeight: 22,
      color: theme.mutedText,
    },
    label: {
      marginBottom: 8,
      fontSize: 14,
      fontWeight: "800",
      color: theme.text,
    },
    input: {
      backgroundColor: theme.card,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginBottom: 16,
      fontSize: 16,
      color: theme.text,
      borderWidth: 1,
      borderColor: theme.border,
    },
    saveButton: {
      marginTop: 8,
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 18,
      alignItems: "center",
    },
    saveButtonText: {
      color: theme.primaryText,
      fontSize: 16,
      fontWeight: "900",
    },
    cancelButton: {
      marginTop: 12,
      paddingVertical: 16,
      borderRadius: 18,
      alignItems: "center",
    },
    cancelButtonText: {
      color: theme.mutedText,
      fontSize: 16,
      fontWeight: "800",
    },
  });
