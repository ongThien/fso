import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_INFO } from "../graphql/queries";

const useUserInfo = () => {
  const { data, loading, error } = useQuery(GET_USER_INFO, {
    fetchPolicy: "cache-and-network",
  });


  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   if (data && data.me) {
  //     setUser(data.me);
  //   } else {
  //     setUser(null)
  //   }
  // }, [data]);

  // return user;
  return { data, loading, error };
};

export default useUserInfo;
