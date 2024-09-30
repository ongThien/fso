import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LogInForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const blogFormRef = useRef();

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

  const login = async ({ username, password }) => {
    if (!(username && password)) {
      showMessage("username or password is missing", true);
      return;
    }

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(localStorageUserKey, JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
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

  const createBlog = async (blog) => {
    if (!(blog.title && blog.url)) {
      showMessage("title & url required!", true);
      return;
    }

    try {
      blogFormRef.current.toggleVisibility();
      await blogService.create(blog);
      setBlogs(blogs.concat(blog));
      showMessage(`a new blog ${blog.title} by ${blog.author} added`, false);
    } catch (exception) {
      showMessage(`Could not add: ${blog.title} by ${blog.author}`, true);
    }
  };

  const blogForm = () => (
    <Togglable btnLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  );

  const loginForm = () => (
    <Togglable btnLabel="login">
      <LoginForm login={login} />
    </Togglable>
  );

  return (
    <div>
      <h2>{user ? "blogs" : "log in to application"}</h2>

      <Notification message={message} isError={isError} />

      {user ? (
        <div>
          <p>
            {user.name} logged-in <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
        </div>
      ) : (
        loginForm()
      )}
      <br/>
      {blogs.map((blog, id) => (
        <Blog key={id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
