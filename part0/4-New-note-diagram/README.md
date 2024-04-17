## Question:
Create a diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the Save button.

If necessary, show operations on the browser or on the server as comments on the diagram.

The diagram does not have to be a sequence diagram. Any sensible way of presenting the events is fine.

## Answer:
```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
  Note right of browser: Data is sent as the body of the POST request.
  activate server
  Note left of server: The server can access the data by accessing the req.body field of the request object req. Then it creates a new note object, and adds it to an array called notes.
  Note left of server: After that, the server responds with HTTP status code 302
  server->>browser: HTML document
  deactivate server
  

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  Note right of browser: The browser perform a new HTTP GET request to the address defined in the previous response header's Location - the address notes
  activate server
  server-->>browser: HTML document
  deactivate server
    Note right of browser: The browser reloads the Notes page. The reload causes three more HTTP requests: fetching the CSS file (main.css), the JS code (main.js), and the raw data of the notes (data.json).

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server-->>browser: CSS file
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
  activate server
  server-->>browser: JS file
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server-->>browser: JSON file
  deactivate server

  
  Note right of browser: The browser executes the callback function that renders the notes
```