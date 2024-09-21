import { useState, useEffect } from "react";
import NewContact from "./components/NewContact";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const defaultMsg = { content: "", isErr: false };
  const [message, setMessage] = useState(defaultMsg);

  useEffect(() => {
    personService
      .getAll()
      .then((initPersons) => setPersons(initPersons))
      .catch((err) => {
        console.log(err.response.data.error);
        setMessage({ content: err.response.data.error, isErr: true });
      });
  }, []);

  const handleAddContact = (event) => {
    event.preventDefault();
    // if a number is added to an already existing user
    // the new number will replace the old number
    const personExist = persons.find((p) => p.name === newName);

    if (personExist) {
      const { id, name } = personExist;
      const modifiedPerson = { name: name, number: phoneNum };

      const confirmMsg =
        "is already added to phonebook, replace old number with a new one?";
      if (window.confirm(`${name} ${confirmMsg}`)) {
        personService
          .updateById(id, modifiedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
            setNewName("");
            setPhoneNum("");
            setMessage({
              content: `${name}'s phone number updated!`,
              isErr: false,
            });
          })
          .catch((err) => {
            console.log(err.response.data.error);
            setMessage({
              content: err.response.data.error,
              isErr: true,
            });
            // personService
            //   .getAll()
            //   .then((initPersons) => setPersons(initPersons));
          });
      }
    } else {
      personService
        .create({
          name: newName,
          number: phoneNum,
        })
        .then((person) => {
          setPersons(persons.concat(person));
          setNewName("");
          setPhoneNum("");
          setMessage({
            content: `Added ${person.name}!`,
            isErr: false,
          });
        })
        .catch((err) => {
          setMessage({
            content: err.response.data.error,
            isErr: true,
          });
        });
    }

    setTimeout(() => {
      setMessage(defaultMsg);
    }, 5000);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setPhoneNum(event.target.value);
  };

  const handleFilter = (event) => {
    const searchName = event.target.value;
    if (searchName) {
      setFilteredPersons(
        persons.filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase())
        )
      );
      setShowAll(false);
    } else {
      setFilteredPersons([]);
      setShowAll(true);
    }
  };

  const handleDelete = ({ id, name }) => {
    if (window.confirm(`Remove ${name}?`)) {
      personService
        .deleteById(id)
        .then(() => {
          if (filteredPersons.length > 0) {
            setFilteredPersons(filteredPersons.filter((p) => p.id !== id));
          }
          personService
            .getAll()
            .then((initPersons) => setPersons(initPersons))
            .catch((err) => {
              setMessage({ content: err.response.data.error, isErr: true });
            });
          setMessage({
            content: `${name} was deleted from contact list!`,
            isErr: false,
          });
        })
        .catch((err) => {
          setMessage({ content: err.response.data.error, isErr: true });
        });
    }
    setTimeout(() => {
      setMessage(defaultMsg);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter filter={handleFilter} />

      <NewContact
        addContact={handleAddContact}
        newName={newName}
        handleNameChange={handleNameChange}
        phoneNum={phoneNum}
        handleNumChange={handleNumChange}
      />

      <Contacts
        contacts={showAll ? persons : filteredPersons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
