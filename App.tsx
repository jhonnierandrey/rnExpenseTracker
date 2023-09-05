import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Alert,
  Pressable,
  Modal,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {ExpenseType} from './src/types';

import {
  Header,
  NewBudget,
  BudgetControl,
  ExpenseForm,
  ListExpenses,
  Filter,
  IconContainer,
} from './src/components';

import {generateId} from './src/helpers';

const App = () => {
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [budget, setBudget] = useState('0');
  const [expenses, setExpenses] = useState<ExpenseType[] | []>([]);
  const [modal, setModal] = useState(false);
  const [expense, setExpense] = useState<ExpenseType | undefined>(undefined);
  const [filterBy, setFilterBy] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseType[] | []>(
    [],
  );

  useEffect(() => {
    const getSavedBudgetFromStorage = async () => {
      try {
        const budgetStorage =
          (await AsyncStorage.getItem('expensetracker_budget')) ?? '0';

        if (Number(budgetStorage) > 0) {
          setBudget(budgetStorage);
          setIsValidBudget(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSavedBudgetFromStorage();
  }, []);

  useEffect(() => {
    const getSavedExpensesFromStorage = async () => {
      try {
        const expensesStorage = await AsyncStorage.getItem(
          'expensetracker_expenses',
        );
        setExpenses(expensesStorage ? JSON.parse(expensesStorage) : undefined);
      } catch (error) {
        console.log(error);
      }
    };

    getSavedExpensesFromStorage();
  }, []);

  useEffect(() => {
    if (isValidBudget) {
      const saveBudgetToStorage = async () => {
        try {
          await AsyncStorage.setItem('expensetracker_budget', budget);
        } catch (error) {
          console.log(error);
        }
      };
      saveBudgetToStorage();
    }
  }, [isValidBudget]);

  useEffect(() => {
    const saveExpensesToStorage = async () => {
      try {
        await AsyncStorage.setItem(
          'expensetracker_expenses',
          JSON.stringify(expenses),
        );
      } catch (error) {
        console.log(error);
      }
    };

    saveExpensesToStorage();
  }, [expenses]);

  useEffect(() => {
    if (filterBy === '') {
      setFilteredExpenses(expenses);
    } else {
      const newFilteredExpenses = expenses.filter(
        expenseFilter => expenseFilter.category === filterBy,
      );

      setFilteredExpenses(newFilteredExpenses);
    }
  }, [expenses, filterBy]);

  const handleNewBudget = (budget: string) => {
    if (Number(budget) > 0) {
      setIsValidBudget(true);
    } else {
      Alert.alert('Error', 'Budget cannot be $0');
    }
  };

  const handleExpense = (expense: ExpenseType) => {
    if ([expense.name, expense.category, expense.amount].includes('')) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (expense?.id) {
      const expensesUpdated = expenses.map(expenseState =>
        expenseState.id === expense.id ? expense : expenseState,
      );

      setExpenses(expensesUpdated);
    } else {
      expense.id = generateId();
      expense.date = Date.now();
      setExpenses([...expenses, expense]);
    }
    setModal(!modal);
  };

  const deleteExpense = (id: string | undefined) => {
    if (id) {
      Alert.alert(
        'Do you want to delete this expense?',
        'Deleted expenses cannot be recovered',
        [
          {text: 'No', style: 'cancel'},
          {
            text: 'Yes, Delete',
            onPress: () => {
              const updatedExpenses = expenses.filter(
                expenseItem => expenseItem.id !== id,
              );

              setExpenses(updatedExpenses);
              setModal(!modal);
              setExpense(undefined);
            },
          },
        ],
      );
    }
  };

  const resetApp = () => {
    Alert.alert(
      'Do you want to reset the app?',
      'This will remove budget and expenses',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes, Delete',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setIsValidBudget(false);
              setBudget('0');
              setExpenses([]);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidBudget ? (
            <BudgetControl
              budget={budget}
              expenses={expenses}
              resetApp={resetApp}
            />
          ) : (
            <NewBudget
              handleNewBudget={handleNewBudget}
              setBudget={setBudget}
              budget={budget}
            />
          )}
        </View>

        {isValidBudget && (
          <>
            <Filter filterBy={filterBy} setFilterBy={setFilterBy} />
            <ListExpenses
              expenses={filteredExpenses}
              setModal={setModal}
              setExpense={setExpense}
              filterBy={filterBy}
            />
          </>
        )}
      </ScrollView>

      {modal && (
        <Modal
          animationType="slide"
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}>
          <ExpenseForm
            setModal={setModal}
            handleExpense={handleExpense}
            setExpense={setExpense}
            expense={expense}
            deleteExpense={deleteExpense}
          />
        </Modal>
      )}
      {isValidBudget && (
        <Pressable style={styles.pressable} onPress={() => setModal(!modal)}>
          <IconContainer name="add" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400,
  },
  pressable: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 30,
  },
  image: {
    width: 60,
    height: 60,
  },
});

export default App;
