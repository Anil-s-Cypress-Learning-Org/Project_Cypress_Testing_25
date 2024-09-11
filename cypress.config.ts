import cypress, { defineConfig } from "cypress";
import { exec } from "child_process";
// import { afterRunHook, beforeRunHook } from "cypress-mochawsome-reporter/lib";

export default defineConfig({
  env: {
    // API_URL: '',
    // _base_Url: '',
    UserName: "umaanji.g@gmail.com",
    Password: "Gak@996387",
  },


  defaultCommandTimeout: 30000,
  requestTimeout: 100000,
  responseTimeout: 100000,
  pageLoadTimeout: 10000,
  // viewportWidth: 1440,
  // viewportHeight: 900,
  viewportHeight: 1080,
  viewportWidth: 1920,
  trashAssetsBeforeRuns: true,
  screenshotOnRunFailure: false,
  video: false,
  videoUploadOnPasses: false,
  reporter: 'junit',

  reporterOptions: {
    mochaFile: 'results/my-test-output.xml',
    toConsole: true,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    // baseUrl: 'https://rahulshettyacademy.com/seleniumPractise/#/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}'
  },

});


