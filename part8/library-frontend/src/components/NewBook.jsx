import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "../queries";
import { useInputField } from "../hooks";

const NewBook = ({ show, setMessage }) => {
  const { reset: titleFieldReset, ...titleInputProps } = useInputField(
    "text",
    "title",
    true
  );
  const { reset: authorFieldReset, ...authorInputProps } = useInputField(
    "text",
    "author",
    true
  );
  const { reset: publishedFieldReset, ...publishedInputProps } = useInputField(
    "number",
    "published",
    true
  );
  const { reset: genreFieldReset, ...genreInputProps } = useInputField(
    "text",
    "genre"
  );
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    // I did a bad job naming the mutation as addBook
    // (well it matches the GraphQL schema in the backend and I'm too lazy to fix it)
    // so I customized addBook as newBook here
    update: (cache, { data: { addBook: newBook } }) => {
      // manually keeping the cache up-to-date
      // this cache.updateQuery part together with
      // useEffect on genre in Books.jsx
      // will keep the Books view updated when a new book is added
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(newBook),
        };
      });

      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        const authorExists = allAuthors.some(
          (author) => author.name === newBook.author.name
        );

        if (!authorExists) {
          return {
            allAuthors: allAuthors.concat(newBook.author),
          };
        }

        return allAuthors;
      });
    },
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setMessage(messages);
    },
    // onCompleted: () => {
    //   fieldResetFns.forEach((fn) => fn());
    // },
  });

  if (!show) {
    return null;
  }

  const fieldResetFns = [
    titleFieldReset,
    authorFieldReset,
    publishedFieldReset,
    genreFieldReset,
    () => setGenres([]),
  ];

  const submit = async (event) => {
    event.preventDefault();
    createBook({
      variables: {
        title: titleInputProps.value,
        author: authorInputProps.value,
        published: Number(publishedInputProps.value),
        genres,
      },
    });

    fieldResetFns.forEach((fn) => fn());
  };

  const addGenre = () => {
    setGenres(genres.concat(genreInputProps.value));
    genreFieldReset();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <NewBookFormInputField fields={titleInputProps} />
        <NewBookFormInputField fields={authorInputProps} />
        <NewBookFormInputField fields={publishedInputProps} />
        <NewBookFormInputField
          fields={genreInputProps}
          btn={{ onClick: addGenre, text: "add genre" }}
        />
        <div>Genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

const NewBookFormInputField = ({ fields, btn }) => {
  const { label, ...inputProps } = fields;

  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} />
      {btn ? (
        <button onClick={btn.onClick} type="button">
          {btn.text}
        </button>
      ) : null}
    </div>
  );
};

export default NewBook;
