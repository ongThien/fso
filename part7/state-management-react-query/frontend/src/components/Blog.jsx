import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import storageService from "../services/storage";
import blogService from "../services/blogs";
import { useNotify } from "../hooks";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const queryClient = useQueryClient();
  const notifyWith = useNotify();

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      );
      notifyWith({ type: "UPVOTE_BLOG", payload: updatedBlog });
    },
    onError: () => {
      notifyWith({ type: "ERROR" });
    },
  });

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (removedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((b) => b.id !== removedBlog.id)
      );
      notifyWith({ type: "REMOVE_BLOG", payload: removedBlog });
    },
    onError: () => {
      notifyWith({ type: "ERROR" });
    },
  });

  const handleVote = (b) => {
    updateBlogMutation.mutate({ ...b, likes: b.likes + 1 });
  };

  const handleDelete = (b) => {
    if (window.confirm(`Are you sure you want to delete ${b.title}?`)) {
      removeBlogMutation.mutate(b);
    }
  };

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const nameOfUser = blog.user ? blog.user.name : "anonymous";
  const canRemove = blog.user
    ? blog.user.username === storageService.me()
    : true;

  return (
    <div style={style} className="blog">
      {blog.title} by {blog.author}
      <button style={{ marginLeft: 3 }} onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      {visible && (
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            likes {blog.likes}
            <button style={{ marginLeft: 3 }} onClick={() => handleVote(blog)}>
              like
            </button>
          </div>
          <div>{nameOfUser}</div>
          {canRemove && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    author: PropTypes.string,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object,
  }).isRequired,
};

export default Blog;
