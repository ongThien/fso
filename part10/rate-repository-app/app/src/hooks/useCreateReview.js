import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { CREATE_REVIEW } from "../graphql/queries";

const useCreateReview = () => {

  const [mutate, result] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const response = await mutate({
        variables: { review: { ownerName, repositoryName, rating, text } }
      });

      const { repositoryId } = response;

      navigate(`/repo/${repositoryId}`);
    } catch (error) {
      console.log("Error creating review", error);
    }
  };

  return createReview;

};

export default useCreateReview;
