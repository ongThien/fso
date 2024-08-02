import { useState } from "react";
import AddNewContact from "./components/AddNewContact";
import Contact from "./components/Contact";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNum: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const handleAddName = (event) => {
    event.preventDefault();
    if (persons.find((p) => p.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    setPersons(persons.concat({ name: newName, phoneNum: phoneNum }));
    setNewName("");
    setPhoneNum("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setPhoneNum(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <AddNewContact
        addName={handleAddName}
        newName={newName}
        handleNameChange={handleNameChange}
        phoneNum={phoneNum}
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Contact
          key={person.name}
          name={person.name}
          phoneNum={person.phoneNum}
        />
      ))}
    </div>
  );
};

export default App;
