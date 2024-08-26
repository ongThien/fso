import { useState, useEffect } from "react";
import NewContact from "./components/NewContact";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    personService
      .getAll()
      .then((initPersons) => setPersons(initPersons))
      .catch((err) => console.log(err));
  }, []);

  const handleAddContact = (event) => {
    event.preventDefault();
    // if a number is added to an already existing user
    // the new number will replace the old number
    const personExist = persons.find((p) => p.name === newName);
    const msg =
      "is already added to phonebook, replace old number with a new one?";

    if (personExist) {
      const { id, name } = personExist;
      const modifiedPerson = { id, name, number: phoneNum };
      if (window.confirm(`${name} ${msg}`)) {
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
          })
          .catch((err) => console.log(err));
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
        })
        .catch((err) => console.log(err));
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setPhoneNum(event.target.value);
  };

  const handleFilter = (event) => {
    const search = event.target.value;
    if (search) {
      setFilteredPersons(
        persons.filter((person) => person.name.toLowerCase().includes(search))
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
          setPersons(persons.filter((p) => p.id !== id));
          personService.getAll().then((initPersons) => setPersons(initPersons));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
