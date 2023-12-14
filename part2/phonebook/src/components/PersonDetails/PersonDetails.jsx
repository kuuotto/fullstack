import './PersonDetails.css'

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

export default PersonDetails
