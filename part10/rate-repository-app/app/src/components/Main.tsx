import { StyleSheet, View } from 'react-native';
import { Navigate, Route, Routes } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundSecondary,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to={"/"} replace />}/>
      </Routes>
    </View>
  );
};

export default Main;
