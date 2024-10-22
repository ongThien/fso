import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeBlogs } from "../slides/blogSlide";
import Blog from "./Blog";

const BlogList = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

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
