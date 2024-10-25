import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMatch, useNavigate } from "react-router-dom";
import blogService from "../services/blogs";
import storageService from "../services/storage";
import { useNotify } from "../hooks";

const Blog = () => {
  const queryClient = useQueryClient();
  const notifyWith = useNotify();
  const navigate = useNavigate();
  const match = useMatch("/blogs/:id");

  const useHandleMutation = (mutationFn, successMessage, onSuccess) =>
    useMutation({
      mutationFn,
      onSuccess: (data) => {
        const blogs = queryClient.getQueryData(["blogs"]);
        queryClient.setQueryData(["blogs"], onSuccess(blogs, data));
        notifyWith({ type: successMessage, payload: data });
      },
      onError: () => notifyWith({ type: "ERROR" }),
    });

  const updateBlog = useHandleMutation(
    blogService.update,
    "UPVOTE_BLOG",
    (blogs, updatedBlog) =>
      blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
  );

  const removeBlog = useHandleMutation(
    blogService.remove,
    "REMOVE_BLOG",
    (blogs, removedBlog) => blogs.filter((b) => b.id !== removedBlog.id)
  );

  const {
    data: blogs = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isPending) return <span>Loading data...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;
  if (!blog) return null;

  const { user, title, author, likes, url } = blog;
  const canRemove = user ? user.username === storageService.me() : true;

  const handleLike = () =>
    updateBlog.mutate({ ...blog, likes: blog.likes + 1 });

  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      removeBlog.mutate(blog);
      navigate("/blogs");
    }
  };

  return (
    <>
      <h2>
        {title} by {author}
      </h2>
      <div>
        <p>{url}</p>
        <p>
          {likes} {likes > 1 ? "likes" : "like"}
          <button style={{ marginLeft: 4 }} onClick={handleLike}>
            like
          </button>
        </p>
        <p>added by {user ? user.name : "anonymous"}</p>
        {canRemove && <button onClick={handleRemove}>remove</button>}
      </div>
    </>
  );
};

export default Blog;
