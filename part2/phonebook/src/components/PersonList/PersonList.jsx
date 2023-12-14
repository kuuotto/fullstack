import { useState } from 'react'
import PersonDetails from '../PersonDetails/PersonDetails'
import './PersonList.css'

const PersonList = ({ persons, deletePerson }) => {
    const [filterTerm, setFilterTerm] = useState("")

    // filter the persons depending on the filter term
    const personsToShow = persons.filter(person =>
        person.name.toLowerCase().includes(filterTerm.toLowerCase()))

    return (
        <div>
            <div className="searchBox">
                <label htmlFor="filterTerm">Search by name:</label>
                <input id="filterTerm" value={filterTerm} onChange={event => setFilterTerm(event.target.value)} />
            </div>
            <ul>
                {personsToShow.map(person => <PersonDetails key={person.id} person={person} deletePerson={() => deletePerson(person.id)}/>)}
            </ul>
        </div>
    )
}

export default PersonList
