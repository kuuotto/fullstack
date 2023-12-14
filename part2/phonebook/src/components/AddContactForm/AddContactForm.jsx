import { useState } from 'react'
import './AddContactForm.css'

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
            <div className="formInput">
                <label htmlFor="name">name</label>
                <input id="name" value={newName} onChange={(event) => setNewName(event.target.value)} />
            </div>
            <div className="formInput">
                <label htmlFor="number">number</label>
                <input id="number" value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
            </div>
            <div className="formInput justifyRight">
                <button type="submit" onClick={handleAddPerson}>add</button>
            </div>
        </form>
    )
}

export default AddContactForm
