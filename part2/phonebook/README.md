# Phonebook

I deviated from the exercise slightly. The exercise said to keep all states in the App component. However, to me it made much more sense to keep some states in child components. For example, the newName and newNumber states are contained in the AddContactForm component since that is where they logically belong. Likewise, the filter control is a part of the list displaying the persons and therefore I think the most suitable place for that state is in the PersonList component.

The notification system is flexible and allows for any number of notifications.
