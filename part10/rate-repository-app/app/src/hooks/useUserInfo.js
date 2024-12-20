import { useQuery } from '@apollo/client';
import { GET_USER_INFO } from "../graphql/queries";

const useUserInfo = () => {
  const { data, loading, error } = useQuery(GET_USER_INFO, {
    fetchPolicy: "cache-and-network",
  });

  return { data, loading, error };
};

export default useUserInfo;
