import { useState, useEffect } from 'react'
import contactsService from './services/contacts'
import NotificationTray from './components/NotificationTray/NotificationTray'
import AddContactForm from './components/AddContactForm/AddContactForm'
import PersonList from './components/PersonList/PersonList'

const App = () => {
    // define states containing the person objects and notifications
    const [persons, setPersons] = useState([])
    const [notifications, setNotifications] = useState([])

    // function for adding a person to persons. This is a bit better than
    // passing the setPersons directly, so that we have a bit more control over
    // what the child component can do to the persons state.
    const addPerson = (newPerson) => {
        contactsService
            .createContact(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                showNotification(`Added ${returnedPerson.name}.`, false)
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
                showNotification(`Deleted ${person.name}.`, false)
            })
            .catch(error => {
                showNotification(`Could not delete ${person.name}: contact is already deleted.`, true)
                setPersons(persons.filter(p => p.id !== id))
            })
    }

    const updatePerson = (id, updatedPerson) => {
        // send to server
        contactsService
            .updateContact(id, updatedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(p => p.id === id ? returnedPerson : p))
                showNotification(`Updated ${returnedPerson.name}.`, false)
            })
            .catch(error => {
                showNotification(`Could not update ${updatedPerson.name}: contact does not exist`, true)
                setPersons(persons.filter(p => p.id !== id))
            })
    }

    const showNotification = (message, isError) => {
        // important to remember here: we don't have access to the latest
        // version of the notifications state. In particular, older 
        // notifications might have been removed between the creation of this
        // closure and calling it. In some edge cases, there might also be 
        // new notifications.

        // let's use the current time as the id of the notification
        const notificationId = new Date().toJSON()

        // create notification object
        const newNotification = {message, isError, id: notificationId}

        // add to list of notifications using an updater function
        setNotifications(notifications => notifications.concat(newNotification))

        // remove notification after a delay
        setTimeout(() => {
            // hide notification using an updater function
            setNotifications(notifications => notifications.filter(n => n.id !== notificationId))
        }, 5000)
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
            <NotificationTray notifications={notifications} />
            Welcome to the phonebook!
            <h2>Add a new contact</h2>
            <AddContactForm persons={persons} addPerson={addPerson} updatePerson={updatePerson} />
            <h2>Contacts</h2>
            <PersonList persons={persons} deletePerson={deletePerson}/>
        </div>
    )
}

export default App
