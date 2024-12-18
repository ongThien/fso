import { TextInput, View, StyleSheet, Pressable } from "react-native";
import { useFormik } from "formik";

import * as yup from "yup";


import theme from "../theme";
import Text from "./Text";
import useCreateReview from "../hooks/useCreateReview";

const ReviewForm = () => {

  const createReview = useCreateReview();

  const onSubmit = async (values) => {
    const { repoOwner, repoName, rating, review } = values;
    try {
      await createReview({ repoOwner, repoName, rating, review });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ReviewFormDetail onSubmit={onSubmit} />
  )
}

const initialValues = {
  repoOwner: "",
  repoName: "",
  rating: "",
  review: "",
}

const validationSchema = yup.object().shape({
  repoOwner: yup.string().trim().required("Repository's owner username is required."),
  repoName: yup.string().trim().required("Repository name is required."),
  rating: yup.string().trim().min(0, "Rating must not be lower than 0.").max(100, "Rating must not be higher than 100").required("Rating is required."),
  review: yup.string().trim().optional(),
});

export const ReviewFormDetail = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <View style={formStyles.mainContainer}>
      <TextInput
        style={[formStyles.input, formik.touched.repoOwner && formik.errors.repoOwner && formStyles.inputError]}
        placeholder='Repository Owner'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.repoOwner}
        onChangeText={formik.handleChange("repoOwner")}
      />
      {
        formik.touched.repoOwner && formik.errors.repoOwner && (
          <Text style={{ color: theme.colors.errors }}>{formik.errors.repoOwner}</Text>
        )
      }
      <TextInput
        style={[formStyles.input, formik.touched.repoName && formik.errors.repoName && formStyles.inputError]}
        placeholder='Repository Name'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.repoName}
        onChangeText={formik.handleChange("repoName")}
      />
      {
        formik.touched.repoName && formik.errors.repoName && (
          <Text style={{ color: theme.colors.errors }}>{formik.errors.repoName}</Text>
        )
      }
      <TextInput
        style={[formStyles.input, formik.touched.rating && formik.errors.rating && formStyles.inputError]}
        keyboardType="number-pad"
        placeholder='Rating (0 to 100)'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
      />
      {
        formik.touched.rating && formik.errors.rating && (
          <Text style={{ color: theme.colors.errors }}>{formik.errors.rating}</Text>
        )
      }

      <TextInput
        style={[formStyles.input, formik.touched.review && formik.errors.review && formStyles.inputError]}
        placeholder='Write your review...'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
        multiline
      />
      {
        formik.touched.review && formik.errors.review && (
          <Text style={{ color: theme.colors.errors }}>{formik.errors.review}</Text>
        )
      }


      <Pressable onPress={() => formik.handleSubmit()}>
        <Text
          color='white'
          fontWeight='bold'
          fontSize='subheading'
          style={formStyles.submitBtn}
        >
          Create review
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

export default ReviewForm;
