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
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setMessage(messages);
    },
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
