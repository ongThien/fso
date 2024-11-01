import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [notification, setNotification] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const notify = (message) => {
    setNotification(message);

    const timer = 5000;
    setTimeout(() => {
      setNotification(null);
    }, timer);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Notification message={notification} />

      <Authors show={page === "authors"} setMessage={notify} />

      <Books show={page === "books"} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setMessage={notify}
        setPage={setPage}
      />

      <NewBook show={page === "add"} setMessage={notify} />
    </div>
  );
};

export default App;
