import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = ({ show, setMessage }) => {
  const [genre, setGenre] = useState(null);
  const [genres, setGenres] = useState([]);

  const {
    data: books,
    loading,
    error,
    refetch,
  } = useQuery(ALL_BOOKS, {
    variables: {
      genre,
    },
  });

  // fetch all genres
  useEffect(() => {
    if (books?.allBooks) {
      const genresSet = new Set();
      books.allBooks.forEach((book) => {
        book.genres.forEach((genre) => genresSet.add(genre));
      });
      // convert it back to an array then use it in the state
      // for me it's more intuitive, especially when we need mapping over multiple buttons
      // and other operations
      setGenres(Array.from(genresSet));
    }
  }, [books?.allBooks]);

  // when a new book is added, the books view is updated
  // at least when a genre selection button is pressed.
  useEffect(() => {
    if (genre) {
      refetch({ genre });
    }
  }, [genre, refetch]);

  if (loading) {
    return <>loading...</>;
  }

  if (error) {
    setMessage(error.message);
    return null;
  }

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      {/* genres sections */}
      <div>
        <button onClick={() => setGenre(null)}>all genres</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>

      <div>
        <p>
          in <b>{genre ? genre : "all genres"}</b>
        </p>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
