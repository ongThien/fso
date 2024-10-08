const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173",
    env: {
      BACKEND: "http://localhost:4000/api",
    },
  },
  hosts: {
    "localhost": "127.0.0.1",
  },
});
