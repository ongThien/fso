import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/queries";


const useDeleteReview = () => {

  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    try {
      await mutate({
        variables: { id },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return deleteReview;
};

export default useDeleteReview;
