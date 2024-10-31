import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";

const App = () => {
  const [page, setPage] = useState("authors");
  const [notification, setNotification] = useState(null);

  const notify = (message) => {
    setNotification(message);
    
    const timer = 5000;
    setTimeout(() => {
      setNotification(null);
    }, timer);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Notification message={notification} />

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setMessage={notify} />
    </div>
  );
};



export default App;
