import { useUser, useUserDispatch, useNotify } from "../hooks";
import { Routes, Route, Link } from "react-router-dom";
import BlogList from "../components/BlogList";
import UserList from "../components/UserList";
import Home from "../components/Home";
import Notification from "../components/Notification";
import User from "../components/User";

const CurrentUser = () => {
  const user = useUser();
  const userDispatch = useUserDispatch();
  const notifyWith = useNotify();

  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
    notifyWith({ type: "USER_LOGOUT", payload: user });
  };

  return (
    <>
      <span style={{ marginLeft: 16 }}>
        {user.name} logged in
        <button style={{ marginLeft: 8 }} onClick={handleLogout}>
          logout
        </button>
      </span>
    </>
  );
};

const HomePage = () => {
  const style = {
    padding: 5,
  };

  return (
    <>
      <header>
        <nav style={{ marginTop: 20 }}>
          <Link style={style} to={"/"}>
            Home
          </Link>
          <Link style={style} to={"/blogs"}>
            Blogs
          </Link>
          <Link style={style} to={"/users"}>
            Users
          </Link>
          <CurrentUser />
        </nav>
      </header>
      <Notification />

      <Routes>
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<UserList />} />
        <Route index element={<Home />} />
      </Routes>
    </>
  );
};

export default HomePage;
