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
    personService.getAll().then((initPersons) => setPersons(initPersons));
  }, []);

  const handleAddName = (event) => {
    event.preventDefault();
    if (persons.find((p) => p.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }

    personService
      .create({
        name: newName,
        number: phoneNum,
      })
      .then((person) => {
        setPersons(persons.concat(person));
        setNewName("");
        setPhoneNum("");
      });
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

  const handleDeletePerson = person => {
    if (window.confirm(`Remove ${person.name}?`)) {
      personService.deleteById(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        personService.getAll().then((initPersons) => setPersons(initPersons));
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={handleFilter} />

      <NewContact
        addName={handleAddName}
        newName={newName}
        handleNameChange={handleNameChange}
        phoneNum={phoneNum}
        handleNumChange={handleNumChange}
      />

      <Contacts
        contacts={showAll ? persons : filteredPersons}
        handleDelete={handleDeletePerson}
      />
    </div>
  );
};

export default App;
