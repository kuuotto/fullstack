# Exercise 0.6: New note in single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note left of browser: spa.js form submit callback renders the new note and sends it to server

    browser --> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa with payload {content: "...", date: "..."}
    activate server
    server ->> browser: {message: "note created"}
    deactivate server
```
