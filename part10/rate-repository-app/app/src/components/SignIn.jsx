import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';

import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";

import Text from './Text';
import theme from '../theme';

const initialValues = {
  username: "",
  password: "",
};

const formStyles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    gap: 12,
    padding: 24,
    backgroundColor: theme.colors.white,
  },
  input: {
    // height: 40,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.textSecondary,
  },
  inputError: {
    borderColor: theme.colors.errors,
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    textAlign: "center",
    padding: 16,
    borderRadius: 4,
  }
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInFormDetail = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <View style={formStyles.mainContainer}>
      <TextInput
        style={[formStyles.input, formik.touched.username && formik.errors.username && formStyles.inputError]}
        placeholder='Username'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {
        formik.touched.username && formik.errors.username && (
          <Text style={{ color: theme.colors.errors }}>{formik.errors.username}</Text>
        )
      }
      <TextInput
        style={[formStyles.input, formik.touched.password && formik.errors.password && formStyles.inputError]}
        placeholder='Password'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      {
        formik.touched.password && formik.errors.password && (
          <Text style={{ color: theme.colors.errors }}>{formik.errors.password}</Text>
        )
      }

      <Pressable onPress={() => formik.handleSubmit()} disabled={formik.isSubmitting}>
        <Text
          color='white'
          fontWeight='bold'
          fontSize='subheading'
          style={formStyles.submitBtn}
        >
          {formik.isSubmitting ? "Loading..." : "Sign in"}
        </Text>
      </Pressable>
    </View>
  );
};

export default function SignInForm() {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const token = await signIn({ username, password });
      console.log(token);
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInFormDetail onSubmit={onSubmit} />;
}
