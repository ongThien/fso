import { useMutation, useApolloClient } from "@apollo/client";
import { GET_ACCESS_TOKEN } from "../graphql/queries";
import useAuthStorage from "./useAuthStorage";
import { useNavigate } from "react-router-native";

const useSignIn = () => {
  const [mutate, result] = useMutation(GET_ACCESS_TOKEN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  // console.log(authStorage);


  const signIn = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: { credentials: { username, password } }
      });

      // Log or store the accessToken in local storage, etc.
      // console.log(response);

      const { accessToken } = response.data.authenticate;
      await authStorage.setAccessToken(accessToken);
      apolloClient.resetStore();
      navigate("/");

    } catch (err) {
      console.error('Error during authentication:', err.message);
    }
  };

  return [signIn, result];
};

export default useSignIn;
