import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { set } from "./slides/anecdoteSlide";
import anecdoteService from "./services/anecdotes";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(set(anecdotes)))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
