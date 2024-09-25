import cypress, { defineConfig } from "cypress";

import cypressMochawesomeReporter from 'cypress-mochawesome-reporter/plugin';

import { exec } from "child_process";
// import { afterRunHook, beforeRunHook } from "cypress-mochawsome-reporter/lib";

export default defineConfig({
  env: {
    // API_URL: '',
    // _base_Url: '',
    UserName: "kumarglina@gmail.com",
    Password: "Jaisriram@99631234",
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

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',       // Directory where reports will be saved
    overwrite: true,                   // Whether to overwrite existing reports
    html: true,                         // Generate HTML reports
    json: true,                         // Generate JSON reports
    charts: true,                       // Add charts to the report
    embeddedScreenshots: true,          // Embed screenshots in the report
    inlineAssets: true,                 // Show inline assets (HTML report)
    saveJson: true                      // Save the JSON report
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },

    baseUrl: 'https://rahulshettyacademy.com/client/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}'
  },

});


