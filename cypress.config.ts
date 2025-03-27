import { defineConfig } from "cypress";

/* 
is used to import the defineConfig function from the cypress package. The purpose of defineConfig is to provide a type-safe way to define Cypress configuration in TypeScript, making it easier to work with Cypress configuration files and providing TypeScript’s type checking and autocompletion features.
1.	Type Safety:
It ensures that the configuration you define follows the correct types expected by Cypress. This helps avoid mistakes, like incorrect property names or values, and provides better editor support, such as autocompletion and type hints.
  2.	Configuration Structuring:
It helps structure the Cypress configuration in a more organized and explicit way, especially when you need to work with complex configurations like setting environment variables, command timeouts, base URLs, etc.
  3.	TypeScript Support:
Cypress automatically infers types when using defineConfig, so you get full TypeScript support for your configuration file. It also works well with Cypress’ global object like cy, Cypress, etc.
  4.	Cleaner Syntax:
Without defineConfig, you would have to export the configuration as a plain object, but using defineConfig gives you a more readable and structured approach to defining configuration values.

*/

// npm install --save-dev cypress-mochawesome-reporter
import cypressMochawesomeReporter from 'cypress-mochawesome-reporter/plugin'




import { exec } from "child_process";
// import { afterRunHook, beforeRunHook } from "cypress-mochawsome-reporter/lib";

export default defineConfig({
  projectId: 'xigz7q',
  env: {
    // API_URL: '',
    // _base_Url: '',
    weatherApiKey: process.env.WEATHER_API_KEY, // Fetch from env variable for security
    UserName: process.env.UserName,
    Password: process.env.Password
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
  // videoUploadOnPasses: false,  // not available in 13th version
  chromeWebSecurity: false,


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

  retries: {
    runMode: 1
  },

  e2e: {
    async setupNodeEvents(on, config) {
      cypressMochawesomeReporter(on); // Correct function usage

      // Console logs capture చేయడానికి
      on('task', {
        logConsoleMessages(message) {
          console.log('Browser Console:', message);
          return null;
        }
      });

      return config;
    },
    // WebDriver BiDi Enable చేయడం
    experimentalWebKitSupport: true,

    baseUrl: 'https://demoqa.com/login',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}'
  },
});


