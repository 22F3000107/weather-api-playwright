const { test } = require('@playwright/test');
const weatherService = require('../services/weatherService');
const { testData } = require('../utils/config');
const { validateResponseStatus } = require('../utils/responseValidator');

test('TC-011: Five-day forecast by city returns 200', async () => {
  const response = await weatherService.getForecastByCity(testData.cities.valid);
  validateResponseStatus(response, 200);
});
