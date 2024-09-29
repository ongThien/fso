const BlogForm = ({
  addBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title{" "}
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author{" "}
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url{" "}
          <input
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
