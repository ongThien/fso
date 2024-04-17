## Question
Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

## Answer
```mermaid
sequenceDiagram
  participant browser
  participant server

  Note right of browser: the browser execute the js code in the spa.js file that re-renders the notes
  Note right of browser: then it sends the newly created note to the server as a JSON string
  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

  activate server
  server->>browser: status code 201 created
  deactivate server
  Note left of server: the server responses with a 201 status code, imply that it successfully created a new note



```