const Contact = ({ name, phoneNum }) => (
  <p>
    {name} {phoneNum}
  </p>
);

const Contacts = ({ contacts }) => {
  return (
    <>
      <h2>Numbers</h2>
      {contacts.map((contact) => (
        <Contact key={contact.id} name={contact.name} phoneNum={contact.number} />
      ))}
    </>
  );
};

export default Contacts;
