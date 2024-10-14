import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, upvoteAnecdote } from "../requests";
import { useNotificationDispatch } from "../hooks/useNotification";
import PropTypes from "prop-types";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
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
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation({
    mutationFn: upvoteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anec) =>
          anec.id === updatedAnecdote.id ? updatedAnecdote : anec
        )
      );
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: "VOTE", payload: anecdote.content });
    setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  if (result.isPending) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={handleVote}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
