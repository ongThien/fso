import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";
import NewBlog from "./NewBlog";
import { Link } from "react-router-dom";

const BlogItem = ({ blog }) => {
  
  const style = {
    border: "solid",
    borderColor: "black",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={style}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
};

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
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;
