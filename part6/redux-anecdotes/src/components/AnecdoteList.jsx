import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import PropTypes from "prop-types";

const Anecdote = ({ anecdote, handleClick }) => {
  const { id, content, votes } = anecdote;

  return (
    <>
      <div key={id}>
        <div>{content}</div>
        <div>
          has {votes}
          <button onClick={handleClick}>vote</button>
        </div>
      </div>
    </>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,

  handleClick: PropTypes.func.isRequired,
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const byVotes = (a, b) => b.votes - a.votes;

  return (
    <>
      {anecdotes.sort(byVotes).map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(vote(anecdote.id))}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
