import { useState, useEffect } from "react";
import axios from "axios";
import NewContact from "./components/NewContact";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const dbUrl = "http://localhost:3001/persons";
  useEffect(() => {
    axios.get(dbUrl).then((res) => {
      // console.log(res);
      setPersons(res.data);
    });
  }, []);

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
