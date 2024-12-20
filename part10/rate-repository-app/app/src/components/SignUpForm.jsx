import { TextInput, View, StyleSheet, Pressable } from "react-native";
import { useFormik } from "formik";

import * as yup from "yup";
import useCreateUser from "../hooks/useCreateUser";
import useSignIn from "../hooks/useSignIn";

import theme from "../theme";
import Text from "./Text";

const SignUpForm = () => {
  const createUser = useCreateUser();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ username, password });
      await signIn({ username, password });
    } catch (error) {
      console.log(error);
    }
  };

  return <SignUpFormDetail onSubmit={onSubmit} />
};

const initialValues = {
  username: "",
  password: "",
  confirmedPassword: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().trim().min(5, "Username must be at least 5 characters.").max(30, "Username must not exceed 30 characters.").required("Username is required."),
  password: yup.string().trim().min(5, "Password must be at least 5 characters.").max(50, "Password must not exceed 50 characters.").required("Password is required."),
  confirmedPassword: yup.string().oneOf([yup.ref("password"), null], "Does not match password!").required("Password confirmation is required."),
});

export const SignUpFormDetail = ({ onSubmit }) => {

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
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
      <TextInput
        style={[formStyles.input, formik.touched.confirmedPassword && formik.errors.confirmedPassword && formStyles.inputError]}
        placeholder='Password confirmation'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.confirmedPassword}
        onChangeText={formik.handleChange("confirmedPassword")}
        secureTextEntry
      />
      {
        formik.touched.confirmedPassword && formik.errors.confirmedPassword && (
          <Text style={{ color: theme.colors.errors }}>{formik.errors.confirmedPassword}</Text>
        )
      }

      <Pressable onPress={() => formik.handleSubmit()} disabled={formik.isSubmitting}>
        <Text
          color='white'
          fontWeight='bold'
          fontSize='subheading'
          style={formStyles.submitBtn}
        >
          {formik.isSubmitting ? "Signing up..." : "Sign up"}
        </Text>
      </Pressable>
    </View>
  );
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

export default SignUpForm;
