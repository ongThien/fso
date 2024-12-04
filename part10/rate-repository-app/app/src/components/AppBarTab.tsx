import Constants from 'expo-constants';
import { Pressable, StyleSheet, View } from "react-native";
import { Link } from 'react-router-native';

import Text from "./Text";

interface AppBarTabProps {
  text: string;
  linkTo: string;
}

const styles = StyleSheet.create({
  container: {
    padding: Constants.statusBarHeight,
  }
});

const AppBarTab = ({ text, linkTo }: AppBarTabProps) => {
  return <View style={styles.container}>
    <Pressable onPress={() => {}}>
      <Link to={linkTo}>
        <Text color="white" fontWeight='bold' fontSize='subheading'>{text}</Text>
      </Link>
    </Pressable>
  </View>
}

export default AppBarTab;
