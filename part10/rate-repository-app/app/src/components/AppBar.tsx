import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    gap: 4,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text='Repositories' linkTo='/' />
        <AppBarTab text='Sign In' linkTo='/signin'/>
      </ScrollView>
    </View>
  );
};

export default AppBar;
