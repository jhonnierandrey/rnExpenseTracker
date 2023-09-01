import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {globalStyles} from '../assets/styles';
import {currencyFormatter} from '../helpers';

import {ExpenseType} from '../types';

type BudgetControlProps = {
  budget: string;
  expenses: ExpenseType[];
  resetApp: () => void;
};

const BudgetControl = ({budget, expenses, resetApp}: BudgetControlProps) => {
  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const totalSpent = expenses.reduce(
      (total, expense) => Number(expense.amount) + total,
      0,
    );
    const totalAvailable = Number(budget) - totalSpent;

    const newPercentage =
      ((Number(budget) - totalAvailable) / Number(budget)) * 100;

    setPercentage(newPercentage);

    setAvailable(totalAvailable);
    setSpent(totalSpent);
  }, [expenses]);

  return (
    <View style={styles.container}>
      <View style={styles.graphCenter}>
        <CircularProgress
          value={percentage}
          duration={1000}
          radius={150}
          valueSuffix="%"
          title="Spent"
          inActiveStrokeColor="#F5F5F5"
          inActiveStrokeWidth={20}
          activeStrokeColor="#3B82F6"
          activeStrokeWidth={20}
          titleStyle={{
            fontWeight: 'bold',
            fontSize: 20,
          }}
          titleColor="#64748B"
        />
      </View>
      <View style={styles.textContainer}>
        <Pressable style={styles.btn} onLongPress={resetApp}>
          <Text style={styles.btnText}>Restart app</Text>
        </Pressable>
        <Text style={styles.textValue}>
          <Text style={styles.label}>Budget: </Text> {currencyFormatter(budget)}
        </Text>
        <Text style={styles.textValue}>
          <Text style={styles.label}>Available: </Text>
          {currencyFormatter(available.toString())}
        </Text>
        <Text style={styles.textValue}>
          <Text style={styles.label}>Spent: </Text>
          {currencyFormatter(spent.toString())}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  graphCenter: {
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  textContainer: {
    marginTop: 50,
  },
  textValue: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
    color: '#3B82F6',
  },
  btn: {
    backgroundColor: '#DB2777',
    padding: 10,
    marginBottom: 40,
    borderRadius: 5,
  },
  btnText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default BudgetControl;
