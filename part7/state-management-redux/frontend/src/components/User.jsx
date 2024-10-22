import { useDispatch } from "react-redux";
import { useNotify } from "../hooks";
import { logout } from "../slides/userSlide";
import PropTypes from "prop-types";

const User = ({ user }) => {
  const dispatch = useDispatch();
  const notify = useNotify();

  const handleLogout = () => {
    dispatch(logout());
    notify(`Bye, ${user.name}!`);
  };

  return (
    <div>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    token: PropTypes.string,
  }),
};

export default User;
