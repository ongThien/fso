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
  // const blogLikesRef = useRef();

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

  const handleCreateBlog = async (blog) => {
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

  const handleUpdateBlog = async (blog) => {
    try {
      // blogLikesRef.current.update();
      await blogService.update(blog.id, blog);
      setBlogs(blogs.map((b) => (b.id === blog.id ? blog : b)));
      showMessage(`UPDATED ${blog.title} by ${blog.author}`, false);
    } catch (exception) {
      showMessage(exception.response.data.error, true);
    }
  };

  const handleRemoveBlog = async (blog) => {
    const { id, title, author } = blog;
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      try {
        await blogService.remove(id);
        setBlogs(blogs.filter((b) => b.id !== id));
        showMessage(`removed ${title} by ${author}`, false);
      } catch (exception) {
        showMessage(exception.response.data.error, true);
      }
    }
  };

  const sortBlog = () => {
    // sorting blogs by likes by descending order
    const compareFnDes = (a, b) => {
      if (a.likes === b.likes) {
        return 0;
      }

      return a.likes > b.likes ? -1 : 1;
    };

    // sorting blogs by likes by ascending order
    const compareFnAsc = (a, b) => {
      if (a.likes === b.likes) {
        return 0;
      }

      return a.likes > b.likes ? 1 : -1;
    };

    const sortAsc = () => setBlogs(blogs.map((b) => b).sort(compareFnAsc));
    const sortDes = () => setBlogs(blogs.map((b) => b).sort(compareFnDes));

    return (
      <>
        <button onClick={sortAsc}>Sort by likes - ascending</button>
        {"  "}
        <button onClick={sortDes}>Sort by likes - decending</button>
      </>
    );
  };

  const blogForm = () => (
    <Togglable btnLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={handleCreateBlog} />
    </Togglable>
  );

  const loginForm = () => (
    <Togglable btnLabel="login">
      <LoginForm login={login} />
    </Togglable>
  );

  const header = () => (user ? "blogs" : "log in to application");

  return (
    <div>
      <h2>{header()}</h2>

      <Notification message={message} isError={isError} />

      {user ? (
        <div>
          <p>
            {user.name} logged-in <button onClick={handleLogout} className="logoutBtn">logout</button>
          </p>
          {blogForm()}
          {sortBlog()}
        </div>
      ) : (
        loginForm()
      )}
      <br />
      {blogs.map((blog, id) => (
        <Blog
          key={id}
          currentUser={user}
          blog={blog}
          updateBlog={handleUpdateBlog}
          removeBlog={handleRemoveBlog}
        />
      ))}
    </div>
  );
};

export default App;
