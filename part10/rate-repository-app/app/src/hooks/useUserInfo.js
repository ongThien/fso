import { useQuery } from '@apollo/client';
import { GET_USER_INFO } from "../graphql/queries";

const useUserInfo = (includeReviews = false) => {
  const { data, loading, error, refetch } = useQuery(GET_USER_INFO, {
    variables: { includeReviews },
    fetchPolicy: "cache-and-network",
  });

  return { data, loading, error, refetch };
};

export default useUserInfo;
