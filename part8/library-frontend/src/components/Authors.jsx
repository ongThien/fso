import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useInputField } from "../hooks";
import { useState } from "react";

const Authors = ({ show, setMessage }) => {
  const authors = useQuery(ALL_AUTHORS);
  // console.log("AUTHORS", authors);
  
  const [authorName, setAuthorName] = useState("");
  const { reset: bornFieldReset, ...bornInputProps } = useInputField(
    "number",
    "born",
    true
  );

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setMessage(messages);
    },
  });

  if (authors.loading) {
    return <div>loading...</div>;
  }

  if (!show) {
    return null;
  }

  const submit = (event) => {
    event.preventDefault();
    editAuthor({
      variables: {
        name: authorName,
        born: Number(bornInputProps.value),
      },
    });
    setAuthorName("");
    bornFieldReset();
  };

  const editForm = () => {
    return (
      <form onSubmit={submit}>
        <SetBirthYearFormSelectAuthor
          authors={authors.data.allAuthors}
          authorName={authorName}
          setAuthorName={setAuthorName}
        />
        <SetBirthYearFormInputField fields={bornInputProps} />
        <button type="submit">update author</button>
      </form>
    );
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born ? a.born : "N/A"}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      {authors.data.allAuthors ? editForm() : null}
    </div>
  );
};

const SetBirthYearFormSelectAuthor = ({
  authors,
  authorName,
  setAuthorName,
}) => {
  if (!authors) return null;

  return (
    <>
      <label>
        Author name:
        <select
          name="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        >
          <option value="" disabled hidden>
            Select an author
          </option>
          {authors.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

const SetBirthYearFormInputField = ({ fields }) => {
  const { label, ...inputProps } = fields;

  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} />
    </div>
  );
};

export default Authors;
