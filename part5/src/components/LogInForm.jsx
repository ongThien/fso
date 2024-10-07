import { useState } from "react";

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    await login({ username, password });
  };

  return (
    <>
      <form onSubmit={handleLogin} className="loginForm">
        <div>
          username{" "}
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            className="username"
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            className="password"
          />
        </div>
        <button type="submit" className="loginBtn">login</button>
      </form>
    </>
  );
};

export default LoginForm;
