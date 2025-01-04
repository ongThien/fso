import { StyleSheet, View } from 'react-native';
import { Navigate, Route, Routes } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SingleRepositoryView from './SingleRepositoryView';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ReviewForm from './ReviewForm';
import ReviewList from "./ReviewList";

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
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/repos/:id" element={<SingleRepositoryView />} />
        <Route path="/reviewForm" element={<ReviewForm />} />
        <Route path="/reviewList" element={<ReviewList />} />
        <Route path="*" element={<Navigate to={"/"} replace />}/>
      </Routes>
    </View>
  );
};

export default Main;
