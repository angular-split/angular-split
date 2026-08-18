import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1200,
  viewportHeight: 800,
  blockHosts: ['camo.githubusercontent.com'],
  e2e: {
    experimentalRunAllSpecs: true,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:4242',
  },
})
