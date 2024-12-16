import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return signOut;
};

export default useSignOut;
