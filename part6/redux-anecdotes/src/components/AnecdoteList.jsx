import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { voteAnecdote } from "../slides/anecdoteSlide";
import { removeNoti, setNoti } from "../slides/notificationSlide";

const Anecdote = ({ anecdote, handleVote }) => {
  const { id, content, votes } = anecdote;

  return (
    <>
      <div key={id}>
        <div>{content}</div>
        <div>
          has {votes}
          <button onClick={handleVote}>vote</button>
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

  handleVote: PropTypes.func.isRequired,
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

  const updateVoteAnecdote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNoti(`You voted ${anecdote.content}`));
    setTimeout(() => dispatch(removeNoti()), 5000);
  };

  const byVotes = (a, b) => b.votes - a.votes;

  return (
    <>
      {[...anecdotes].sort(byVotes).map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => {
            updateVoteAnecdote(anecdote);
          }}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
