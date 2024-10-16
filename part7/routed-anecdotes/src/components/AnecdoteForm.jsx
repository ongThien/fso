import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnecdotesDispatch } from "../context/anecdotesContext";
import { useNotificationDispatch } from "../context/notificationsContext";

const AnecdoteForm = () => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");
  const anecdoteDispatch = useAnecdotesDispatch();
  const notiDispatch = useNotificationDispatch();
  const navigate = useNavigate();

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    anecdoteDispatch({ type: "ADD", payload: anecdote });
    notiDispatch({ type: "NEW_ANECDOTE_CREATED", payload: anecdote.content });
    setTimeout(() => notiDispatch({ type: "CLEAR" }), 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content,
      author,
      info,
      votes: 0,
    });
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
