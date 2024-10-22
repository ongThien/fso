import PropTypes from "prop-types";
import { useField, useNotify } from "../hooks";
import { useDispatch } from "react-redux";
import { login } from "../slides/userSlide";

const LoginFormInputField = ({ attributes }) => {
  const { reset, name, ...inputProps } = attributes;
  const label = name.replace(name.charAt(0), name.charAt(0).toUpperCase());
  return (
    <label>
      {label}:
      <input {...inputProps} name={name} />
    </label>
  );
};

LoginFormInputField.propTypes = {
  attributes: PropTypes.shape({
    reset: PropTypes.func,
    name: PropTypes.string,
    inputProps: PropTypes.shape({
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      "data-testid": PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
    }),
  }),
};

const Login = () => {
  const username = useField("text", "username");
  const password = useField("password", "password");
  const notify = useNotify();
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    const user = { username: username.value, password: password.value };
    try {
      dispatch(login(user));
      notify(`Welcome back, ${user.username}`);
    } catch (error) {
      notify("Wrong credentials", "error");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <LoginFormInputField attributes={username} />
      <LoginFormInputField attributes={password} />
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
