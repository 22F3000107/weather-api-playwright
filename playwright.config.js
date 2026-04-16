const { defineConfig } = require('@playwright/test');
const os = require('node:os');

module.exports = defineConfig({
  fullyParallel: true,
  workers: 4,
  reporter: [
    ['list'],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          node_version: process.version,
        },
      },
    ],
  ],
});