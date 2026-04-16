const { test } = require('@playwright/test');
const weatherService = require('../services/weatherService');
const { testData } = require('../utils/config');
const { validateWeatherResponseCoordinates } = require('../utils/responseValidator');

test('TC-007: Validate current weather body for coordinate request', async () => {
  const { lat, lon } = testData.coordinates.london;
  const response = await weatherService.getWeatherByCoordinates(lat, lon);
  const body = await response.json();
  validateWeatherResponseCoordinates(body, lat, lon);
});
