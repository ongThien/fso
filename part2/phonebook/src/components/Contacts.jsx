const Contact = ({ name, phoneNum, handleDelete }) => (
  <p>
    {name} {phoneNum} <button onClick={handleDelete}>delete</button>
  </p>
);

const Contacts = ({ contacts, handleDelete }) => {
  return (
    <>
      <h2>Contacts</h2>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          name={contact.name}
          phoneNum={contact.number}
          handleDelete={() => handleDelete(contact)}
        />
      ))}
    </>
  );
};

export default Contacts;
