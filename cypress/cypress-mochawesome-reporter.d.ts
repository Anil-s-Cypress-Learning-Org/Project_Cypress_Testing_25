declare module 'cypress-mochawesome-reporter/plugin' {
    const plugin: (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => void;
    export default plugin;
}

//	•	This tells TypeScript to treat cypress-mochawesome-reporter/plugin as a module with an any type. //