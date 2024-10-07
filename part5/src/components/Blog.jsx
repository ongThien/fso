import { useState } from "react";
import { ViewBtn, LikeBtn, RemoveBtn } from "./BlogBtn";

const Simple = ({ detail, toggleVisibility, title, author }) => {
  return (
    <div className="simpleBlog">
      {title} {author ? `- ${author} ` : " "}
      <ViewBtn detail={detail} handleOnClick={toggleVisibility} />
    </div>
  );
};

const Detail = ({
  detail,
  toggleVisibility,
  currentUser,
  blog,
  addedBy,
  updateBlog,
  removeBlog,
}) => {
  const { title, author, url, likes, user } = blog;
  const [currentLike, setCurrentLike] = useState(likes);

  return (
    <div className="detailBlog">
      <Simple
        detail={detail}
        toggleVisibility={toggleVisibility}
        title={title}
        author={author}
      />
      <div className="blogUrl">{url}</div>
      <div>
        <form
          name="updateBlog"
          onSubmit={updateBlog}
          className="updateBlogForm"
        >
          {currentLike > 1 ? "likes" : "like"} {currentLike}{" "}
          <LikeBtn
            handleOnClick={
              currentUser ? () => setCurrentLike((prev) => prev + 1) : () => {}
            }
          />
        </form>
      </div>
      <div>{addedBy}</div>
      {currentUser?.username === user?.username ? (
        <form
          name="removeBlog"
          onSubmit={removeBlog}
          className="removeBlogForm"
        >
          <RemoveBtn />
        </form>
      ) : null}
    </div>
  );
};

const Blog = (props) => {
  // console.log("Blog", props.blog);

  const { id, title, author, url, user } = props.blog;
  // console.log("PROPS.BLOG", props.blog);
  let likes = props.blog.likes;
  const updateBlog = props.updateBlog;
  const removeBlog = props.removeBlog;
  const [detail, setDetail] = useState(false);

  const toggleVisibility = () => {
    setDetail(!detail);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    likes += 1;
    await updateBlog({ id, title, author, url, likes, user });
  };

  const handleRemove = async (event) => {
    event.preventDefault();
    await removeBlog({ id, title, author, url, likes, user });
  };

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
          blog={props.blog}
          currentUser={props.currentUser}
          addedBy={user?.name}
          updateBlog={handleUpdate}
          removeBlog={handleRemove}
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
