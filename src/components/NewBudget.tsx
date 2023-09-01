import React from 'react';
import {Text, View, TextInput, Pressable, StyleSheet} from 'react-native';
import {globalStyles} from '../assets/styles';

type NewBudgetProps = {
  handleNewBudget: (budget: string) => void;
  budget: string;
  setBudget: React.Dispatch<React.SetStateAction<string>>;
};

const NewBudget = ({handleNewBudget, budget, setBudget}: NewBudgetProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Set budget</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Add budget"
        style={styles.input}
        value={budget}
        onChangeText={setBudget}
      />
      <Pressable style={styles.button} onPress={() => handleNewBudget(budget)}>
        <Text style={styles.buttonText}>Add budget</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3B82F6',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#1048A4',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default NewBudget;
