import { router } from "expo-router";
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
import { getBudget, saveBudget } from "../src/storage/budget";

export default function BudgetFormScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  const [amount, setAmount] = useState("");

  useEffect(() => {
    async function loadBudget() {
      const budget = await getBudget();
      setAmount(budget.amount.toString());
    }

    loadBudget();
  }, []);

  const handleSave = async () => {
    const parsedAmount = Number(amount.replace(",", "."));

    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert("Invalid budget", "Please enter a valid positive budget.");
      return;
    }

    await saveBudget({
      amount: parsedAmount,
      currency: "EUR",
    });

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
          <Text style={styles.title}>Edit budget</Text>

          <Text style={styles.subtitle}>
            Set your available monthly budget. Expenses will be calculated
            against this amount.
          </Text>

          <Text style={styles.label}>Monthly budget *</Text>
          <TextInput
            style={styles.input}
            placeholder="1000"
            placeholderTextColor={theme.mutedText}
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save budget</Text>
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
