import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  const [repos, setRepos] = useState();

  useEffect(() => {
    if (data && data.repositories) {
      setRepos(data.repositories)
    }
  }, [data]);

  return repos;
};

export default useRepositories;
