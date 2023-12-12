import { useState, useEffect } from 'react'
import contactsService from './services/contacts'

const App = () => {
    // define states containing the list of person objects
    const [persons, setPersons] = useState([])

    // function for adding a person to persons. This is a bit better than
    // passing the setPersons directly, so that we have a bit more control over
    // what the child component can do to the persons state.
    const addPerson = (newPerson) => {
        contactsService
            .createContact(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
            })
    }

    const deletePerson = id => {
        // find person corresponding to the id
        const person = persons.find(p => p.id === id)

        // confirm with the user
        if (!confirm(`Delete ${person.name} from your phonebook?`)) {
            return
        }

        // delete from server
        contactsService
            .deleteContact(id)
            .then(() => {
                setPersons(persons.filter(p => p.id !== id))
            })
            .catch(error => console.log(error))
    }

    const updatePerson = (id, updatedPerson) => {
        // send to server
        contactsService
            .updateContact(id, updatedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(p => p.id === id ? returnedPerson : p))
            })
    }

    // load existing contact data with the use of effects
    useEffect(() => {
        contactsService
            .getAllContacts()
            .then(initialContacts => {
                setPersons(initialContacts)
            })
    }, [])

    return (
        <div>
            <h1>Phonebook</h1>
            Welcome to the phonebook!
            <h2>Add a new contact</h2>
            <AddContactForm persons={persons} addPerson={addPerson} updatePerson={updatePerson}/>
            <h2>Contacts</h2>
            <PersonList persons={persons} deletePerson={deletePerson}/>
        </div>
    )
}

const PersonDetails = ({ person, deletePerson }) => {
    return (
        <>
            <li>
                {person.name} {person.number}
                <button onClick={deletePerson}>delete</button>
            </li>
        </>
    )
}

const AddContactForm = ({ persons, addPerson, updatePerson }) => {
    // define states for the input elements
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")

    const handleAddPerson = (event) => {
        event.preventDefault()

        // check if person already exists
        if (persons.some(person => person.name === newName)) {
            // number is updated if the user so desires
            if (!confirm(`${newName} is already in the phonebook -- replace number with new one?`)) {
                return
            }

            // find the existing person
            const person = persons.find(p => p.name === newName)

            // create a new person with an altered number
            const updatedPerson = {...person, number: newNumber}

            // update persons list
            updatePerson(person.id, updatedPerson)

        } else {
            // create new person object
            const newPerson = {
                name: newName,
                number: newNumber,
            }
    
            // add to list of persons
            addPerson(newPerson)
        }

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

const PersonList = ({ persons, deletePerson }) => {
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
                {personsToShow.map(person => <PersonDetails key={person.id} person={person} deletePerson={() => deletePerson(person.id)}/>)}
            </div>
        </div>
    )
}

export default App
