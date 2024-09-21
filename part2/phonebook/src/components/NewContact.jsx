const NewContact = (props) => {
  const {addContact, name, handleNameChange, phoneNum, handleNumChange} = props;

  return (
    <>
      <h2>add a new contact</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={phoneNum} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default NewContact;
