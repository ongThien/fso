import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/queries";

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const createUser = async ({ username, password }) => {
    try {
      await mutate({
        variables: { user: { username, password } }
      })
    } catch (error) {
      console.log(error);
    }
  };

  return createUser;
};

export default useCreateUser;
