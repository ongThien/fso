import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";
import Blog from "./Blog";
import NewBlog from "./NewBlog";

const BlogList = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return <span>Loading data...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <>
      <h2>Blog app</h2>
      <NewBlog />
      {data.sort(byLikes).map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;
