import { Pressable, StyleSheet, View } from "react-native";
import Constants from 'expo-constants';
import Text from "./Text";

interface AppBarTabProps {
  text: string;
}

const styles = StyleSheet.create({
  container: {
    padding: Constants.statusBarHeight,
  }
});

const AppBarTab = ({text}: AppBarTabProps) => {
  return <View style={styles.container}>
    <Pressable onPress={() => { }}>
      <Text color="white" fontWeight='bold' fontSize='subheading'>{text}</Text>
    </Pressable>
  </View>
}

export default AppBarTab;
