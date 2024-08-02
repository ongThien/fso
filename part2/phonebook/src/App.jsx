import { useState } from "react";
import NewContact from "./components/NewContact";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const handleAddName = (event) => {
    event.preventDefault();
    if (persons.find((p) => p.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    setPersons(
      persons.concat({
        name: newName,
        number: phoneNum,
        id: persons.length + 1,
      })
    );
    setNewName("");
    setPhoneNum("");
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

      <Contacts contacts={showAll ? persons : filteredPersons} />
    </div>
  );
};

export default App;
