import { useReducer, createContext, useContext } from "react";

const AnecdotesContext = createContext(null);
const AnecdotesDispatchContext = createContext(null);

export const AnecdotesProvider = ({ children }) => {
  const [anecdotes, dispatch] = useReducer(anecdotesReducer, initialAnecdotes);

  return (
    <AnecdotesContext.Provider value={anecdotes}>
      <AnecdotesDispatchContext.Provider value={dispatch}>
        {children}
      </AnecdotesDispatchContext.Provider>
    </AnecdotesContext.Provider>
  );
};

export const useAnecdotes = () => useContext(AnecdotesContext);
export const useAnecdotesDispatch = () => useContext(AnecdotesDispatchContext);

const anecdotesReducer = (anecdotes, action) => {
  switch (action.type) {
    case "ADD":
      return [...anecdotes, action.payload];
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
};

const initialAnecdotes = [
  {
    content: "If it hurts, do it more often",
    author: "Jez Humble",
    info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
    votes: 0,
    id: 1,
  },
  {
    content: "Premature optimization is the root of all evil",
    author: "Donald Knuth",
    info: "http://wiki.c2.com/?PrematureOptimization",
    votes: 0,
    id: 2,
  },
];
