import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../hooks/useNotification";

const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState("");
  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      dispatch({ type: "CREATE", payload: anecdote });
    },
    onError: () => {
      dispatch({ type: "ERROR" });
    },
  });

  const createNewAnecdote = (event) => {
    event.preventDefault();
    newAnecdoteMutation.mutate({ content: anecdote, votes: 0 });
    setAnecdote("");
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={createNewAnecdote}>
        <input
          name="anecdote"
          value={anecdote}
          onChange={(e) => setAnecdote(e.target.value)}
        />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
