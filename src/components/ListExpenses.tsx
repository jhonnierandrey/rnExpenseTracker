import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ExpenseItem from './ExpenseItem';
import {ExpenseType} from '../types';

type ListExpensesProps = {
  expenses: ExpenseType[];
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setExpense: React.Dispatch<React.SetStateAction<undefined | ExpenseType>>;
  filterBy: string;
};

const ListExpenses = ({
  expenses,
  setModal,
  setExpense,
  filterBy,
}: ListExpensesProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses</Text>

      {expenses.length === 0 ? (
        <Text style={styles.noExpenses}>
          No expenses yet {filterBy !== '' ? `for ${filterBy}` : null}
        </Text>
      ) : (
        expenses.map(expense => (
          <ExpenseItem
            expense={expense}
            key={expense.id}
            setModal={setModal}
            setExpense={setExpense}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 100,
  },
  title: {
    color: '#64748B',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 20,
  },
  noExpenses: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 20,
  },
});

export default ListExpenses;
