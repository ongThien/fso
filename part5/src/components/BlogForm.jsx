import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();

    await createBlog({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>create new blog</h2>
      <form onSubmit={addBlog} className="createBlogForm">
        <div>
          title{" "}
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="blog's title..."
          />
        </div>
        <div>
          author{" "}
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="blog's author..."
          />
        </div>
        <div>
          url{" "}
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="blog's url..."
          />
        </div>
        <button type="submit" className="createBtn">create</button>
      </form>
    </>
  );
};

export default BlogForm;
