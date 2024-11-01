import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useInputField } from "../hooks";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setToken, setMessage }) => {
  const { reset: usernameReset, ...usernameInputProps } = useInputField(
    "text",
    "username",
    true
  );
  const { reset: passwordReset, ...passwordInputProps } = useInputField(
    "password",
    "password",
    true
  );

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setMessage(error.graphQLErrors[0].message);
    },
    onCompleted: () => {
      usernameReset();
      passwordReset();
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]);

  if (!show) return null;

  const submit = (event) => {
    event.preventDefault();
    login({
      variables: {
        username: usernameInputProps.value,
        password: passwordInputProps.value,
      },
    });
  };

  return (
    <>
      <form onSubmit={submit}>
        <LoginFormInputField attributes={usernameInputProps} />
        <LoginFormInputField attributes={passwordInputProps} />
        <button type="submit">login</button>
      </form>
    </>
  );
};

const LoginFormInputField = ({ attributes }) => {
  const { label, ...inputProps } = attributes;

  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} />
    </div>
  );
};

export default LoginForm;
