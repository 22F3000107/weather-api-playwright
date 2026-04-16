const { test } = require('@playwright/test');
const weatherService = require('../services/weatherService');
const { testData } = require('../utils/config');
const { validateFiveDayForecastWindow } = require('../utils/responseValidator');

test('TC-009: Validate five-day forecast structure and time window', async () => {
  const { lat, lon } = testData.coordinates.london;
  const response = await weatherService.getForecastByCoordinates(lat, lon);
  const body = await response.json();
  validateFiveDayForecastWindow(body);
});
