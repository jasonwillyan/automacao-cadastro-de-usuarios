const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://jasonwillyan.github.io/cadastro-de-usuario/',
    viewportWidth: 1920,
    viewportHeight: 1080,
    specPattern: 'cypress/e2e/**/*.spec.{js,ts}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
