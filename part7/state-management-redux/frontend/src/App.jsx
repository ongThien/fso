import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import Login from "./components/Login";
import User from "./components/User";
import NewBlog from "./components/NewBlog";
import BlogList from "./components/BlogList";
import { initializeUser } from "./slides/userSlide";

const App = () => {
  const user = useSelector(({user}) => user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <User user={user}/>
      <NewBlog />
      <BlogList />
    </div>
  );
};

export default App;
