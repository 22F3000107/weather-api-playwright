const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  fullyParallel: true,
  workers: 4,
});