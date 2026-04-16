const { test } = require('@playwright/test');
const weatherService = require('../services/weatherService');
const { testData } = require('../utils/config');
const { validateResponseStatus } = require('../utils/responseValidator');

test('TC-006: Current weather by latitude and longitude returns 200', async () => {
  const { lat, lon } = testData.coordinates.london;
  const response = await weatherService.getWeatherByCoordinates(lat, lon);
  validateResponseStatus(response, 200);
});
