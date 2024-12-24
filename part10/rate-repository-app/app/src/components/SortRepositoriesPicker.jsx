import { Picker } from "@react-native-picker/picker/";
import { View, StyleSheet } from "react-native";

const SortRepositoriesPicker = ({ options, selectedOption, setSelectedOption }) => {

  const findOptionValue = (index) => options[index];

  const handleValueChange = (optionIndex) => {
    if (!optionIndex) return;
    setSelectedOption(findOptionValue(optionIndex))
  }

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={options.indexOf(selectedOption)}
        onValueChange={handleValueChange}
      >
        <Picker.Item label={`Sort by: ${selectedOption.label}`} value=""/>
        {
          options.map((option, index) => <Picker.Item key={option.label} label={option.label} value={index} />)
        }
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
  }
});

export default SortRepositoriesPicker;
