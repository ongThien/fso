import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import { useField, useNotify } from "../hooks";

const BlogFormInputField = ({ attributes }) => {
  const { reset, name, ...inputProps } = attributes;
  const label = name.replace(name.charAt(0), name.charAt(0).toUpperCase());

  return (
    <div>
      <label htmlFor={name}>{label}:</label>
      <input {...inputProps} name={name} />
    </div>
  );
};

BlogFormInputField.propTypes = {
  attributes: PropTypes.shape({
    reset: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    "data-testid": PropTypes.string.isRequired,
  }).isRequired,
};

const NewBlog = () => {
  const title = useField("text", "title");
  const url = useField("text", "url");
  const author = useField("text", "author");
  const blogFormRef = useRef();
  const queryClient = useQueryClient();
  const notifyWith = useNotify();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
      notifyWith({ type: "NEW_BLOG", payload: newBlog });
    },
    onError: () => {
      notifyWith({ type: "ERROR" });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    newBlogMutation.mutate({
      title: title.value,
      url: url.value,
      author: author.value,
    });
    blogFormRef.current.toggleVisibility();
  };

  const handleReset = () => {
    title.reset();
    url.reset();
    author.reset();
  };

  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <>
        <h2>Create a New Blog</h2>
        <form onSubmit={handleSubmit}>
          <BlogFormInputField attributes={title} />
          <BlogFormInputField attributes={url} />
          <BlogFormInputField attributes={author} />
          <button type="submit">Create</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </form>
      </>
    </Togglable>
  );
};

export default NewBlog;
