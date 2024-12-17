import Constants from 'expo-constants';
import { GestureResponderEvent, Pressable, StyleSheet, View } from "react-native";
import { Link } from 'react-router-native';

import Text from "./Text";

interface AppBarTabProps {
  text: string;
  linkTo?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const styles = StyleSheet.create({
  container: {
    // padding: Constants.statusBarHeight,
    marginRight: 24,
  }
});

const AppBarTab = ({ text, linkTo, onPress }: AppBarTabProps) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        {onPress ? (
          <Text color="white" fontWeight="bold" fontSize="subheading">
            {text}
          </Text>
        ) : (
          <Link to={linkTo || "/"}>
            <Text color="white" fontWeight="bold" fontSize="subheading">
              {text}
            </Text>
          </Link>
        )}
      </Pressable>
    </View>
  );
}

export default AppBarTab;
