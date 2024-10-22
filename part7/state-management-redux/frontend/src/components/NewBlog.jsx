import { useRef } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useField, useNotify } from "../hooks/index";
import { createBlog } from "../slides/blogSlide";
import Togglable from "./Togglable";

const BlogFormInputField = ({ attributes }) => {
  const { reset, name, ...inputProps } = attributes;
  const label = name.replace(name.charAt(0), name.charAt(0).toUpperCase());
  return (
    <div>
      <label>{label}:</label>
      <input {...inputProps} name={name} />
    </div>
  );
};

BlogFormInputField.propTypes = {
  attributes: PropTypes.shape({
    reset: PropTypes.func.isRequired,
    name: PropTypes.string,
    inputProps: PropTypes.shape({
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      "data-testid": PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
    }),
  }),
};

const NewBlog = () => {
  const title = useField("text", "title");
  const url = useField("text", "url");
  const author = useField("text", "author");
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const notify = useNotify();

  const handleCreate = async (blog) => {
    try {
      dispatch(createBlog(blog));
      notify(`Blog created: ${blog.title}, ${blog.author}`);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      notify(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!(title.value && url.value)) {
      notify("Missing title or url", "error");
      return;
    }

    handleCreate({ title: title.value, url: url.value, author: author.value });
  };

  const handleReset = () => {
    title.reset();
    url.reset();
    author.reset();
  };

  return (
    <div>
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
    </div>
  );
};

export default NewBlog;
