import { useDispatch } from "react-redux";
import { createAnecdote } from "../slides/anecdoteSlide";
import { handleNoti } from "../slides/notificationSlide";
import { useState } from "react";

const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState("");
  const dispatch = useDispatch();

  const createNewAnecdote = (event) => {
    event.preventDefault();
    dispatch(createAnecdote(anecdote));
    dispatch(handleNoti(`You created ${anecdote}`, 5000));
    setAnecdote("");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div>
          <input name="anecdote" value={anecdote} onChange={(e) => setAnecdote(e.target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
