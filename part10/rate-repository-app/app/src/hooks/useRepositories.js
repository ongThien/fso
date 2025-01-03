import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection }, searchKeyword) => {

  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy: orderBy, orderDirection: orderDirection, searchKeyword },
    fetchPolicy: "cache-and-network",
  });

  return { data, loading, error };
};

export default useRepositories;
