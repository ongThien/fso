import { useDispatch } from "react-redux";
import { create } from "../slides/anecdoteSlide";
import { setNoti, removeNoti } from "../slides/notificationSlide";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    
    const newAnecdote = await anecdoteService.create({
      content: anecdote,
      votes: 0,
    });
    dispatch(create(newAnecdote));
    dispatch(setNoti(`You created ${anecdote}`));
    setTimeout(() => dispatch(removeNoti()), 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
