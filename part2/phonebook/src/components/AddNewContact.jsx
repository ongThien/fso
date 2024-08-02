const AddNewContact = (props) => {
  const {addName, newName, handleNameChange, phoneNum, handleNumChange} = props;

  return (
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
  );
};

export default AddNewContact;
