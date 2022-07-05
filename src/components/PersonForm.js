const PersonForm = ({
  newName,
  handleName,
  newNumber,
  handleNumber,
  addUser,
}) => {
  return (
    <>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          number: <input type='tel' value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type='submit' onClick={addUser}>
            add
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
