import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection }) => {

  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy: orderBy, orderDirection: orderDirection },
    fetchPolicy: "cache-and-network",
  });

  return { data, loading, error };
};

export default useRepositories;
