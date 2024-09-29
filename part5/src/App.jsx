import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LogInForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const localStorageUserKey = "loggedBlogAppUser";

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(localStorageUserKey);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(localStorageUserKey, JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(localStorageUserKey);
    blogService.setToken("");
    setUser(null);
    setMessage("user logged out");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const addBlog = async (event) => {
    event.preventDefault();

    if (!(title && url)) {
      setMessage("title & url required!");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }

    const blog = { title, author, url };
    await blogService.create(blog);
    setTitle("");
    setAuthor("");
    setUrl("");
    setBlogs(blogs.concat(blog));
  };

  return (
    <div>
      <h2>{user ? "blogs" : "log in to application"}</h2>

      <Notification message={message} />

      {user ? (
        <div>
          <p>
            {user.name} logged-in <button onClick={handleLogout}>logout</button>
          </p>
          <BlogForm
            addBlog={addBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />

          {blogs.map((blog, id) => (
            <Blog key={id} blog={blog} />
          ))}
        </div>
      ) : (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
