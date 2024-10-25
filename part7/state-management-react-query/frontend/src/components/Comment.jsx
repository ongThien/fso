import PropTypes from "prop-types";
import { useField, useNotify } from "../hooks";
import blogService from "../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Comment = ({ blog }) => {
  const { reset, ...commentInputProps } = useField("text", "comment");
  const notifyWith = useNotify();
  const queryClient = useQueryClient();

  const newCommentMutation = useMutation({
    mutationFn: (content) => blogService.addComment(blog.id, { content }),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blogs"], (oldBlogs) =>
        oldBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      );

      notifyWith({ type: "NEW_COMMENT" });
    },
    onError: () => notifyWith({ type: "ERROR" }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    newCommentMutation.mutate(commentInputProps.value);
    reset();
  };

  return (
    <>
      <h2>comments</h2>
      <>
        <form onSubmit={handleSubmit}>
          <input {...commentInputProps} placeholder="your comment..." />
          <button style={{ marginLeft: 4 }} type="submit">
            add comment
          </button>
        </form>
      </>
      <ul>
        {blog.comments.map(({ content, id }) => {
          return <li key={id}>{content}</li>;
        })}
      </ul>
    </>
  );
};

Comment.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired,
  }).isRequired,
};

export default Comment;
