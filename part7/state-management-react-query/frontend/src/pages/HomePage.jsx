import Notification from "../components/Notification";
import NewBlog from "../components/NewBlog";
import BlogList from "../components/BlogList";
import { useNotify, useUser, useUserDispatch } from "../hooks";

const HomePage = () => {
  const user = useUser();
  const userDispatch = useUserDispatch();
  const notifyWith = useNotify();

  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
    notifyWith({ type: "USER_LOGOUT", payload: user });
  };

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

export default HomePage;
