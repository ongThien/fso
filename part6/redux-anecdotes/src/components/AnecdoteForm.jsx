import { useDispatch } from "react-redux";
import { createAnecdote } from "../slides/anecdoteSlide";
import { setNoti, removeNoti } from "../slides/notificationSlide";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNewAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(anecdote));
    dispatch(setNoti(`You created ${anecdote}`));
    setTimeout(() => dispatch(removeNoti()), 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
