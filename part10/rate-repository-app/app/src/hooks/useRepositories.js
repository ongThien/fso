import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection }, first, searchKeyword = "", after = "") => {

  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy: orderBy, orderDirection: orderDirection, first, searchKeyword },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        orderBy: orderBy,
        orderDirection: orderDirection,
        first,
        searchKeyword,
        after: data.repositories.pageInfo.endCursor
      }
    });
  };

  return { data, loading, error, fetchMore: handleFetchMore };
};

export default useRepositories;
