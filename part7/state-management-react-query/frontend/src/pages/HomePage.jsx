import { useUser, useUserDispatch, useNotify } from "../hooks";
import { Routes, Route, Link } from "react-router-dom";
import BlogList from "../components/BlogList";
import Blog from "../components/Blog";
import UserList from "../components/UserList";
import User from "../components/User";
import Home from "../components/Home";
import Notification from "../components/Notification";

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
  const headerStyle = {
    backgroundColor: "#ddd",
    padding: 8,
  };

  const linkStyle = {
    padding: 5,
  };

  return (
    <>
      <header style={headerStyle}>
        <nav>
          <Link style={linkStyle} to={"/"}>
            Home
          </Link>
          <Link style={linkStyle} to={"/blogs"}>
            Blogs
          </Link>
          <Link style={linkStyle} to={"/users"}>
            Users
          </Link>
          <CurrentUser />
        </nav>
      </header>
      <Notification />

      <Routes>
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<UserList />} />
        <Route index element={<Home />} />
      </Routes>
    </>
  );
};

export default HomePage;
