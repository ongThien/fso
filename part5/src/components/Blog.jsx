import { useState } from "react";

const Simple = ({ detail, toggleVisibility, title, author}) => {
  return (
    <div>
      {title} {author ? `- ${author} ` : ` `}
      <button onClick={toggleVisibility}>{detail ? "hide" : "view"}</button>
    </div>
  );
};

const Detail = ({detail, toggleVisibility, title, author, url, likes, addedBy, updateBlog}) => {
  return (
    <>
      <Simple
        detail={detail}
        toggleVisibility={toggleVisibility}
        title={title}
        author={author}
      />
      <div>{url}</div>
      <div>
        <form onSubmit={updateBlog}>
          likes {likes} <button>like</button>
        </form>
      </div>
      <div>{addedBy}</div>
    </>
  );
}

const Blog = (props) => {
  // console.log("Blog", props.blog);
  
  const { id, title, author, url, user } = props.blog;
  let likes = props.blog.likes;
  const updateBlog = props.updateBlog;
  const [detail, setDetail] = useState(false);

  const toggleVisibility = () => {
    setDetail(!detail);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    likes += 1;
    await updateBlog({ id, title, author, url, likes, user });
  }

  const blogStyle = {
    padding: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {detail ? (
        <Detail
          detail={detail}
          toggleVisibility={toggleVisibility}
          title={title}
          author={author}
          url={url}
          likes={likes}
          addedBy={user.name}
          updateBlog={handleUpdate}
        />
      ) : (
        <Simple
          detail={detail}
          toggleVisibility={toggleVisibility}
          title={title}
          author={author}
        />
      )}
    </div>
  );
};

export default Blog;
