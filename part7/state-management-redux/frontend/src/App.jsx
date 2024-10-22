import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import loginService from "./services/login";
import storage from "./services/storage";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import {
  initializeBlogs,
} from "./slides/blogSlide";
import { useNotify } from "./hooks";

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const notify = useNotify();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      setUser(user);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      setUser(user);
      storage.saveUser(user);
      notify(`Welcome back, ${user.name}`);
    } catch (error) {
      notify("Wrong credentials", "error");
    }
  };

  const handleLogout = () => {
    setUser(null);
    storage.removeUser();
    notify(`Bye, ${user.name}!`);
  };


  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <NewBlog />
      <BlogList />
    </div>
  );
};

export default App;
