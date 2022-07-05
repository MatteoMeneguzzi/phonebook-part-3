const Persons = ({ filteredData, deleteUser }) => {
  const personsList = filteredData.map((person, index) => (
    <div key={index}>
      {person.name} {person.number}{" "}
      <button onClick={() => deleteUser(person.id)}>delete</button>
    </div>
  ));
  return <>{personsList}</>;
};

export default Persons;
