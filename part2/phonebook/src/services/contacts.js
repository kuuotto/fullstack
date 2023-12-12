import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getAllContacts = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const createContact = newContact => {
    return axios
        .post(baseUrl, newContact)
        .then(response => response.data)
}

const deleteContact = id => {
    const contactUrl = `${baseUrl}/${id}`
    return axios
        .delete(contactUrl)
}

const updateContact = (id, newContact) => {
    const contactUrl = `${baseUrl}/${id}`
    return axios
        .put(contactUrl, newContact)
        .then(response => response.data)
}

export default { getAllContacts, createContact, deleteContact, updateContact }
