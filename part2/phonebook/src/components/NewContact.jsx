const NewContact = (props) => {
  const {addName, newName, handleNameChange, phoneNum, handleNumChange} = props;

  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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
