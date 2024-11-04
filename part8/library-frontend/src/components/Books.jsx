import { useEffect, useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "../queries";
import { updateBookCache } from "../utils/utils";

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
    onCompleted: ({ allBooks }) => {
      const genresSet = new Set();
      // console.log("ALL BOOKS", allBooks);

      allBooks.forEach((book) => {
        book.genres.forEach((genre) => genresSet.add(genre));
      });
      // convert it back to an array then use it in the state
      // for me it's more intuitive, especially when we need mapping over multiple buttons
      // and other operations
      setGenres(Array.from(genresSet));
    },
  });

  // when a new book is added, the books view is updated
  // at least when a genre selection button is pressed.
  // According to https://www.apollographql.com/docs/react/api/react/hooks#usesubscription
  // If you want to react to incoming data, please use the onData option instead of useEffect.
  // useEffect(() => {
  //   if (genre) {
  //     refetch({ genre });
  //   }
  // }, [genre, refetch]);
  useSubscription(BOOK_ADDED, {
    onData: ({ data: { data: newData }, client }) => {
      const addedBook = newData.bookAdded;
      window.alert(`New book added: ${addedBook.title}`);
      updateBookCache(client.cache, { query: ALL_BOOKS }, addedBook);
      if (genre) refetch({ genre });
    },
  });

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
