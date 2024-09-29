import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LogInForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  // some utils variable and function
  const localStorageUserKey = "loggedBlogAppUser";
  const showMessage = (message, isError) => {
    setMessage(message);
    setIsError(isError);
    setTimeout(() => {
      setMessage(null);
      setIsError(false);
    }, 5000);
  };

  //fetch all blogs from db
  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };

    fetchData();
  }, []);

  // read user token if there is one
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
      showMessage(`Welcome back, ${user.username}`, false);
    } catch (exception) {
      showMessage("Wrong username or password", true);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(localStorageUserKey);
    blogService.setToken("");
    setUser(null);
    showMessage("User logged out", false);
  };

  const addBlog = async (event) => {
    event.preventDefault();

    if (!(title && url)) {
      showMessage("title & url required!", true);
      return;
    }

    const blog = { title, author, url };
    await blogService.create(blog);
    setTitle("");
    setAuthor("");
    setUrl("");
    setBlogs(blogs.concat(blog));
    showMessage(`a new blog ${blog.title} by ${blog.author} added`, false);
  };

  return (
    <div>
      <h2>{user ? "blogs" : "log in to application"}</h2>

      <Notification message={message} isError={isError} />

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
