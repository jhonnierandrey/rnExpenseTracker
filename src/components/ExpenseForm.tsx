import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {globalStyles} from '../assets/styles';

import {ExpenseType} from '../types';

type ExpenseFormProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setExpense: React.Dispatch<React.SetStateAction<undefined | ExpenseType>>;
  expense: ExpenseType | undefined;
  handleExpense: (expense: ExpenseType) => void;
  deleteExpense: (id: string) => void;
};

const ExpenseForm = ({
  setModal,
  setExpense,
  expense,
  handleExpense,
  deleteExpense,
}: ExpenseFormProps) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<number | undefined>(0);
  const [id, setId] = useState<string | undefined>('');

  useEffect(() => {
    if (expense?.name) {
      setName(expense.name);
      setAmount(expense.amount);
      setCategory(expense.category);
      setId(expense.id);
      setDate(expense.date);
    }
  }, [expense]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnContainer}>
        <Pressable
          style={[styles.btn, styles.btnCancel]}
          onLongPress={() => {
            setModal(false);
            setExpense(undefined);
          }}>
          <Text style={styles.btnText}>Cancel</Text>
        </Pressable>

        {expense?.id && (
          <Pressable
            style={[styles.btn, styles.btnDelete]}
            onLongPress={() => {
              id && deleteExpense(id);
            }}>
            <Text style={styles.btnText}>Delete</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>
          {expense?.name ? 'Edit' : 'New'} Expense
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Name: </Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Amount: </Text>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Category: </Text>
          <Picker
            selectedValue={category}
            onValueChange={value => setCategory(value)}>
            <Picker.Item label="-- Choose -- " value="" />
            <Picker.Item label="Investment" value="investment" />
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Home" value="home" />
            <Picker.Item label="Miscellaneous" value="miscellaneous" />
            <Picker.Item label="Fun" value="fun" />
            <Picker.Item label="Health" value="health" />
            <Picker.Item label="Subscriptions" value="subscriptions" />
          </Picker>
        </View>

        <Pressable
          style={styles.btnSubmit}
          onPress={() => handleExpense({name, amount, category, id, date})}>
          <Text style={styles.btnSubmitText}>
            {expense?.name ? 'Save' : 'Add'} Expense
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E40AF',
    flex: 1,
  },
  form: {
    ...globalStyles.container,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 30,
    color: '#64748B',
  },
  field: {
    marginVertical: 10,
  },
  label: {
    color: '#64748B',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  btnSubmit: {
    backgroundColor: '#3B82f6',
    padding: 10,
    marginTop: 20,
  },
  btnSubmitText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  btnCancel: {
    backgroundColor: '#DB2777',
  },
  btnText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  btn: {
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    flex: 1,
  },
  btnDelete: {
    backgroundColor: 'red',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ExpenseForm;
