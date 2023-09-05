import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {globalStyles} from '../assets/styles';
import {currencyFormatter, dateFormatter} from '../helpers';
import IconContainer from './IconContainer';

import {ExpenseType} from '../types';

type ExpenseItemProps = {
  expense: ExpenseType;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setExpense: React.Dispatch<React.SetStateAction<ExpenseType | undefined>>;
};

const ExpenseItem = ({expense, setModal, setExpense}: ExpenseItemProps) => {
  const {name, category, date, amount} = expense;

  const handleActions = () => {
    setModal(true);
    setExpense(expense);
  };

  return (
    <Pressable onLongPress={handleActions}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.imgContainer}>
            <IconContainer name={category} />
            <View style={styles.textContainer}>
              <Text style={styles.category}>{category}</Text>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.date}>{dateFormatter(date)}</Text>
            </View>
          </View>
          <Text style={styles.amount}>{currencyFormatter(amount)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    marginBottom: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  category: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  name: {
    fontSize: 22,
    color: '#64748B',
    marginBottom: 5,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
  },
  date: {
    fontWeight: '700',
    color: '#DB2777',
  },
});

export default ExpenseItem;
