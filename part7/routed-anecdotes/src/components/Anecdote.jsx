import { useParams } from "react-router-dom";
import { useAnecdotes } from "../context/anecdotesContext";

const Anecdote = () => {
  const id = useParams().id;
  const anecdote = useAnecdotes().find(anec => anec.id === Number(id));

  if (!anecdote) {
    return <p>Anecdote not found...</p>
  }

  return (
    <>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>
        has {anecdote.votes} {anecdote.votes > 1 ? "votes" : "vote"}
      </p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </>
  );
};

export default Anecdote;
