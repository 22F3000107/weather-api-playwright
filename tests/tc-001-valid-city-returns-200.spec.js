const { test } = require('@playwright/test');
const weatherService = require('../services/weatherService');
const { testData } = require('../utils/config');
const { validateResponseStatus } = require('../utils/responseValidator');

test('TC-001: Valid city returns 200', async () => {
  const response = await weatherService.getWeather(testData.cities.valid);
  validateResponseStatus(response, 200);
});
