import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import userService from "../services/users";

const UserList = () => {

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return <span>Loading data...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <b>blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
