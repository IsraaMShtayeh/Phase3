import { defineConfig } from "cypress";
module.exports = defineConfig({
  downloadsFolder: "cypress/downloads",
e2e: {
  baseUrl: 'https://opensource-demo.orangehrmlive.com',
  downloadsFolder: "cypress/downloads",
async setupNodeEvents(on, config)
{
// implement node event listeners here
return require("./cypress/plugins")(on, config);
},
specPattern: "cypress/e2e/*.feature",
},
});
