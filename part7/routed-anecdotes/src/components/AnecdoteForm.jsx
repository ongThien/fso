import { useNavigate } from "react-router-dom";
import {
  useField,
  useAnecdotesDispatch,
  useNotificationDispatch,
} from "../hooks";
import Notification from "./Notification";

const AnecdoteFormInput = ({ attributes }) => {
  const { type, name, value, onChange } = attributes;
  const inputProps = { type, value, onChange };
  return (
    <div>
      <label>{name}</label>
      <input {...inputProps} />
    </div>
  );
};

const AnecdoteForm = () => {
  const content = useField("text", "content");
  const author = useField("text", "author");
  const info = useField("text", "info");
  const anecdoteDispatch = useAnecdotesDispatch();
  const notifyWith = useNotificationDispatch();
  const navigate = useNavigate();

  const handleNotify = (typeValue, payloadValue) => {
    const timer = 5000;
    notifyWith({ type: typeValue, payload: payloadValue });
    setTimeout(() => notifyWith({ type: "CLEAR" }), timer);
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    anecdoteDispatch({ type: "ADD", payload: anecdote });
    handleNotify("NEW_ANECDOTE_CREATED", anecdote.content);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!(content.value && author.value && info.value)) {
      handleNotify("ERROR", "All fields are required.");
      return;
    }

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleClearInput = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Notification />
      <form onSubmit={handleSubmit}>
        <AnecdoteFormInput attributes={content} />
        <AnecdoteFormInput attributes={author} />
        <AnecdoteFormInput attributes={info} />
        <button type="submit">create</button>
        <button type="button" onClick={handleClearInput}>
          reset
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
