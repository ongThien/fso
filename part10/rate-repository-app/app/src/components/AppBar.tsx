import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import useUserInfo from "../hooks/useUserInfo";
import useSignOut from "../hooks/useSignOut";

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.backgroundPrimary,
  },
  // ...
});

const AppBar = () => {
  const user = useUserInfo();
  // console.log("USER", user);
  const handleSignOut = useSignOut();
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text='Repositories' linkTo='/' />
        {user ? (
          <AppBarTab
            text='Sign Out'
            onPress={() => handleSignOut()} // Handle sign-out here
          />
        ) : (
          <AppBarTab text='Sign In' linkTo='/signin' />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
