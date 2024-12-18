import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { CREATE_REVIEW } from "../graphql/queries";

const useCreateReview = () => {

  const [mutate, result] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const createReview = async ({ repoOwner, repoName, rating, review }) => {
    try {
      const response = await mutate({
        variables: { review: { repoOwner, repoName, rating, review } }
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
