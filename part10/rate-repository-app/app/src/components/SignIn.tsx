import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { FormikHelpers, useFormik } from 'formik';
import Constants from "expo-constants";

import Text from './Text';
import theme from '../theme';

interface FormValues {
  username: string;
  password: string;
}

interface SignInFormProps {
  onSubmit: (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => void | Promise<any>;
}

const initialValues: FormValues = {
  username: "",
  password: "",
}

const formStyles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    padding: Constants.statusBarHeight,
    gap: 12,
    backgroundColor: theme.colors.white,
  },
  input: {
    // height: 40,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.textSecondary,
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    textAlign: "center",
    padding: 16,
    borderRadius: 4,
  }
});

const SignInForm = ({onSubmit}: SignInFormProps) => {
  const formik = useFormik({
    initialValues,
    onSubmit
  });

  return (
    <View style={formStyles.mainContainer}>
      <TextInput
        style={formStyles.input}
        placeholder='Username'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={formStyles.input}
        placeholder='Password'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry/>

      <Pressable onPress={() => formik.handleSubmit()}>
        <Text
          color='white'
          fontWeight='bold'
          fontSize='subheading'
          style={formStyles.submitBtn}
        >
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default function SignIn() {
  const onSubmit = (values: FormValues) => console.log(values);

  return <SignInForm onSubmit={onSubmit}/>;
}
