import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import loginService from "../services/login";
import { useField, useNotify, useUserDispatch } from "../hooks";

const LoginInputField = ({ attributes }) => {
  const { reset, name, ...inputProps } = attributes;
  const label = name.replace(name.charAt(0), name.charAt(0).toUpperCase());

  return (
    <label htmlFor={name}>
      {label}:
      <input {...inputProps} name={name} required />
    </label>
  );
};

LoginInputField.propTypes = {
  attributes: PropTypes.shape({
    reset: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    "data-testid": PropTypes.string.isRequired,
  }).isRequired,
};

const Login = () => {
  const username = useField("text", "username");
  const password = useField("password", "password");
  const userDispatch = useUserDispatch();
  const notifyWith = useNotify();

  const userMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (userInfo) => {
      userDispatch({ type: "LOGIN", payload: userInfo });
      notifyWith({ type: "USER_LOGIN", payload: userInfo });
    },
    onError: () => {
      notifyWith({ type: "USER_LOGIN_ERROR" });
    },
  });

  const handleLogin = (event) => {
    event.preventDefault();
    userMutation.mutate({
      username: username.value,
      password: password.value,
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <LoginInputField attributes={username} />
      <LoginInputField attributes={password} />
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
