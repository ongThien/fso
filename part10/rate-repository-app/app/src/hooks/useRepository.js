import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";


const useRepository = (id, first, after = "") => {
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first, after },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        id,
        first,
        after: data.reviews.pageInfo.endCursor,
      }
    });
  };

  return { data, loading, error, fetchMore: handleFetchMore };
}

export default useRepository;
