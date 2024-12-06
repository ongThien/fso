import { useMutation } from "@apollo/client";
import { GET_ACCESS_TOKEN } from "../graphql/queries";

const useSignIn = () => {
  const [mutate, result] = useMutation(GET_ACCESS_TOKEN);

  const signIn = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: { credentials: { username, password } }
      });

      // Log or store the accessToken in local storage, etc.
      // console.log(response);

      const { accessToken } = response.data.authenticate;
      return accessToken;

    } catch (err) {
      console.error('Error during authentication:', err.message);
    }
  };

  return [signIn, result];
};

export default useSignIn;
