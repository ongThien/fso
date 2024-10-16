import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Anecdote from "./Anecdote";
import AnecdoteList from "./AnecdoteList";
import AnecdoteForm from "./AnecdoteForm";
import About from "./About";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <>
      <Router>
        <div>
          <Link style={padding} to={"/"}>
            home
          </Link>
          <Link style={padding} to={"/anecdotes"}>
            anecdotes
          </Link>
          <Link style={padding} to={"/create"}>
            create new
          </Link>
          <Link style={padding} to={"/about"}>
            about
          </Link>
        </div>

        <Routes>
          <Route path="/anecdotes/:id" element={<Anecdote />} />
          <Route path="/anecdotes" element={<AnecdoteList />} />
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<AnecdoteForm />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
};

export default Menu;
