import { TextInput, View, StyleSheet, Pressable } from "react-native";
import { useFormik } from "formik";

import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";

import theme from "../theme";
import Text from "./Text";

const ReviewForm = () => {

  const createReview = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      await createReview({ ownerName, repositoryName, rating, text });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ReviewFormDetail onSubmit={onSubmit} />
  )
}

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().trim().required("Repository's owner username is required."),
  repositoryName: yup.string().trim().required("Repository name is required."),
  rating: yup.number().min(0, "Rating must not be lower than 0.").max(100, "Rating must not be higher than 100.").required("Rating is required."),
  text: yup.string().trim().optional(),
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
        style={[formStyles.input, formik.touched.ownerName && formik.errors.ownerName && formStyles.inputError]}
        placeholder='Repository Owner'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
      />
      {
        formik.touched.ownerName && formik.errors.ownerName && (
          <Text style={{ color: theme.colors.errors }}>{formik.errors.ownerName}</Text>
        )
      }
      <TextInput
        style={[formStyles.input, formik.touched.repositoryName && formik.errors.repositoryName && formStyles.inputError]}
        placeholder='Repository Name'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
      />
      {
        formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text style={{ color: theme.colors.errors }}>{formik.errors.repositoryName}</Text>
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
        style={[formStyles.input, formik.touched.text && formik.errors.text && formStyles.inputError]}
        placeholder='Write your text...'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        multiline
      />
      {
        formik.touched.text && formik.errors.text && (
          <Text style={{ color: theme.colors.errors }}>{formik.errors.text}</Text>
        )
      }


      <Pressable onPress={() => formik.handleSubmit()} disabled={formik.isSubmitting}>
        <Text
          color='white'
          fontWeight='bold'
          fontSize='subheading'
          style={formStyles.submitBtn}
        >
          {formik.isSubmitting? "Creating..." : "Create review"}
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
