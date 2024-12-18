import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import useUserInfo from "../hooks/useUserInfo";
import useSignOut from "../hooks/useSignOut";

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight,
    // height: Constants.statusBarHeight,
    padding: 8,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  // ...
});

const AppBar = () => {
  const { data, loading, error } = useUserInfo();

  // console.log("USER", user);
  const handleSignOut = useSignOut();
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text='Repositories' linkTo='/' />
        {data && data.me ? (
          <>
            <AppBarTab
              text="Create a review"
              linkTo='/reviewForm'
            />
            <AppBarTab
              text='Sign Out'
              onPress={() => handleSignOut()} // Handle sign-out here
            />
          </>
        ) : (
          <AppBarTab text='Sign In' linkTo='/signin' />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
