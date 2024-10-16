import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import AnecdoteForm from "./components/AnecdoteForm";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <AnecdoteList />
      <About />
      <AnecdoteForm />
      <Footer />
    </div>
  );
};

export default App;
