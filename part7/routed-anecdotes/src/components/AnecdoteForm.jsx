import { useNavigate } from "react-router-dom";
import { useField, useAnecdotesDispatch, useNotificationDispatch } from "../hooks";

const AnecdoteForm = () => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const anecdoteDispatch = useAnecdotesDispatch();
  const notifyWith = useNotificationDispatch();
  const navigate = useNavigate();

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    anecdoteDispatch({ type: "ADD", payload: anecdote });
    notifyWith({ type: "NEW_ANECDOTE_CREATED", payload: anecdote.content });
    setTimeout(() => notifyWith({ type: "CLEAR" }), 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
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
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
