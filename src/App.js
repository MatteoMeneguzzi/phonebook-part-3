import axios from "axios";
import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleName = (e) => {
    const { value } = e.target;

    setNewName(value);
  };

  const handleNumber = (e) => {
    const { value } = e.target;

    setNewNumber(value);
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    setSearch(value);
  };

  const filteredData = persons.filter((person) => {
    if (search === "") {
      return person;
    } else {
      return person.name.toLowerCase().includes(search.toLowerCase());
    }
  });

  const addUser = (e) => {
    e.preventDefault();

    const newPersons = [...persons];

    const currentPerson = {
      name: newName,
      number: newNumber,
      id: new Date(),
    };

    if (currentPerson.name === "") {
      return;
    } else if (
      newPersons.filter((e) => e.name === currentPerson.name).length > 0
    ) {
      if (
        window.confirm(
          `${newName} is already added to Phonebook, replace the old number with a new one?`
        )
      ) {
        let person = newPersons.find(
          (person) => person.name === currentPerson.name
        );
        personService
          .update(person.id, currentPerson)
          .then((updatedPerson) => {
            setPersons(
              newPersons.map((item) =>
                item.id === person.id ? updatedPerson : item
              )
            );
            setSuccessMessage(`${person.name}'s number is updated`);
            setTimeout(() => setSuccessMessage(``), 3000);
          })
          .catch((err) => {
            if (err.response.status === 400) {
              setErrorMessage(`${err.response.data.error}`);
              setTimeout(() => setErrorMessage(``), 3000);
            } else {
              console.log(err);
              setErrorMessage(
                `Information of ${person.name} has already been removed from server`
              );
              setPersons(newPersons.filter((item) => item.id !== person.id));
              setTimeout(() => setErrorMessage(``), 3000);
            }
          });
      }
      // }
    } else {
      personService
        .create(currentPerson)
        .then((person) => {
          setPersons([...newPersons, person]);
          setSuccessMessage(`${person.name}'s submission successful`);
          setTimeout(() => setSuccessMessage(``), 3000);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => setErrorMessage(``), 3000);
        });
    }
  };

  const deleteUser = (id) => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.drop(id).then(() => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
        setSuccessMessage(`${person.name} successfully deleted`);
        setTimeout(() => setSuccessMessage(``), 3000);
      });
    }
  };

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  return (
    <>
      <h2>Phonebook</h2>
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <Filter search={search} handleSearch={handleSearch} />
      <PersonForm
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
        addUser={addUser}
      />
      <h2>Numbers</h2>
      <Persons filteredData={filteredData} deleteUser={deleteUser} />
    </>
  );
};

export default App;
