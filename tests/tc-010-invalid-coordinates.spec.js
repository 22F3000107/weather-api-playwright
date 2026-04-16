const { test } = require('@playwright/test');
const weatherService = require('../services/weatherService');
const { testData } = require('../utils/config');
const { validateResponseStatus } = require('../utils/responseValidator');

test('TC-010: Invalid latitude and longitude return 400', async () => {
  const { lat, lon } = testData.coordinates.invalid;
  const response = await weatherService.getWeatherByCoordinates(lat, lon);
  validateResponseStatus(response, 400);
});
