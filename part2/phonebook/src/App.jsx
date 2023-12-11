import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    // define states containing the list of person objects
    const [persons, setPersons] = useState([])

    // function for adding a person to persons. This is a bit better than
    // passing the setPersons directly, so that we have a bit more control over
    // what the child component can do to the persons state.
    const addPerson = (newPerson) => {
        setPersons(persons.concat(newPerson))
    }

    // load existing contact data with the use of effects
    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    return (
        <div>
            <h1>Phonebook</h1>
            Welcome to the phonebook!
            <h2>Add a new contact</h2>
            <AddContactForm persons={persons} addPerson={addPerson} />
            <h2>Contacts</h2>
            <PersonList persons={persons} />
        </div>
    )
}

const PersonDetails = ({ person }) => {
    return (
        <>
            <li>{person.name} {person.number}</li>
        </>
    )
}

const AddContactForm = ({ persons, addPerson }) => {
    // define states for the input elements
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")

    const handleAddPerson = (event) => {
        event.preventDefault()

        // check if person already exists
        if (persons.some(person => person.name === newName)) {
            alert(`${newName} has already been added to the phonebook!`)
            return
        }

        // create new person object
        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        }

        // add to list of persons
        addPerson(newPerson)

        // clear input fields
        setNewName("")
        setNewNumber("")
    }

    return (
        <form >
            <label>
                name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
            </label>
            <br />
            <label>
                number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
            </label>
            <div>
                <button type="submit" onClick={handleAddPerson}>add</button>
            </div>
        </form>
    )
}

const PersonList = ({ persons }) => {
    // I know that the exercise said to keep all states in the App component.
    // But the way I conceptualised this, the filter control is a part of the 
    // list displaying the persons and therefore I think the most suitable place
    // for that state is here.
    const [filterTerm, setFilterTerm] = useState("")

    // filter the persons depending on the filter term
    const personsToShow = persons.filter(person =>
        person.name.toLowerCase().includes(filterTerm.toLowerCase()))

    return (
        <div>
            <label>
                Search with name: <input value={filterTerm} onChange={event => setFilterTerm(event.target.value)} />
            </label>
            <div>
                {personsToShow.map(person => <PersonDetails key={person.id} person={person} />)}
            </div>
        </div>
    )
}

export default App
