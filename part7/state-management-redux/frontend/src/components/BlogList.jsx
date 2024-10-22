import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <>
      {[...blogs].sort(byLikes).map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;
