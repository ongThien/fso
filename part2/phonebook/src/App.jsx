import { useState, useEffect } from "react";
import NewContact from "./components/NewContact";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import contactService from "./services/contactService";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const defaultMsg = { content: "", isErr: false };
  const [message, setMessage] = useState(defaultMsg);

  useEffect(() => {
    contactService
      .getAll()
      .then((initContacts) => setContacts(initContacts))
      .catch((err) => {
        console.log(err.response.data.error);
        setMessage({ content: err.response.data.error, isErr: true });
      });
  }, []);

  const handleAddContact = (event) => {
    event.preventDefault();
    // if a number is added to an already existing user
    // the new number will replace the old number
    const contact = contacts.find((p) => p.name === name);

    if (contact) {
      const { id, name } = contact;
      const modifiedContact = { name: name, number: phoneNum };

      const confirmMsg =
        "is already added to phonebook, replace old number with a new one?";
      if (window.confirm(`${name} ${confirmMsg}`)) {
        contactService
          .updateById(id, modifiedContact)
          .then((updatedContact) => {
            setContacts(
              contacts.map((contact) =>
                contact.id !== id ? contact : updatedContact
              )
            );
            setName("");
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
          });
      }
    } else {
      contactService
        .create({
          name: name,
          number: phoneNum,
        })
        .then((contact) => {
          setContacts(contacts.concat(contact));
          setName("");
          setPhoneNum("");
          setMessage({
            content: `Added ${contact.name}!`,
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
    setName(event.target.value);
  };

  const handleNumChange = (event) => {
    setPhoneNum(event.target.value);
  };

  const handleFilterContact = (event) => {
    const searchName = event.target.value;
    if (searchName) {
      setFilteredContacts(
        contacts.filter((contact) =>
          contact.name.toLowerCase().includes(searchName.toLowerCase())
        )
      );
      setShowAll(false);
    } else {
      setFilteredContacts([]);
      setShowAll(true);
    }
  };

  const handleDeleteContact = ({ id, name }) => {
    if (window.confirm(`Remove ${name}?`)) {
      contactService
        .deleteById(id)
        .then(() => {
          if (filteredContacts.length > 0) {
            setFilteredContacts(filteredContacts.filter((c) => c.id !== id));
          }
          // contactService
          //   .getAll()
          //   .then((initContacts) => setContacts(initContacts))
          //   .catch((err) => {
          //     setMessage({ content: err.response.data.error, isErr: true });
          //   });
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

      <Filter filter={handleFilterContact} />

      <NewContact
        addContact={handleAddContact}
        name={name}
        handleNameChange={handleNameChange}
        phoneNum={phoneNum}
        handleNumChange={handleNumChange}
      />

      <Contacts
        contacts={showAll ? contacts : filteredContacts}
        handleDelete={handleDeleteContact}
      />
    </div>
  );
};

export default App;
