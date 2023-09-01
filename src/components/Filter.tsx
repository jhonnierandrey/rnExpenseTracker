import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {globalStyles} from '../assets/styles';

type FilterProps = {
  filterBy: string;
  setFilterBy: React.Dispatch<React.SetStateAction<string>>;
};

const Filter = ({setFilterBy, filterBy}: FilterProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filter expenses</Text>
      <Picker
        selectedValue={filterBy}
        onValueChange={value => setFilterBy(value)}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    transform: [{translateY: 0}],
    marginTop: 80,
  },
  label: {
    fontSize: 22,
    fontWeight: '900',
    color: '#64748B',
  },
});

export default Filter;
