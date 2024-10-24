import { useQuery } from "@tanstack/react-query";
import { Link, useMatch } from "react-router-dom";
import userService from "../services/users";

const User = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const match = useMatch("/users/:id");
  
  if (isPending) {
    return <span>Loading data...</span>;
  }
  
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  
  const user = match ? data.find((user) => user.id === match.params.id) : null;
  if (!user) return null;

  const { name, blogs } = user;

  return (
    <>
      <h2>{name}</h2>
      <p>
        <b>added blogs:</b>
      </p>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default User;
