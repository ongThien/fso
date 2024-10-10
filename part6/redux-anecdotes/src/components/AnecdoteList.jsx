import { useSelector, useDispatch } from "react-redux";
import { vote } from "../slides/anecdoteSlide";
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
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,

  handleClick: PropTypes.func.isRequired,
};

const AnecdoteList = () => {
  const anecdotesSelector = ({ anecdotes, filter }) => {
    if (filter === "") {
      return anecdotes;
    }

    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const anecdotes = useSelector(anecdotesSelector);
  const dispatch = useDispatch();
  const byVotes = (a, b) => b.votes - a.votes;

  return (
    <>
      {[...anecdotes].sort(byVotes).map((anecdote) => (
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
