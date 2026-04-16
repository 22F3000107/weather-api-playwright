const { test } = require('@playwright/test');
const weatherService = require('../services/weatherService');
const { testData } = require('../utils/config');
const { validateFiveDayForecastWindow } = require('../utils/responseValidator');

test('TC-012: Validate five-day forecast by city structure and time window', async () => {
  const response = await weatherService.getForecastByCity(testData.cities.valid);
  const body = await response.json();
  validateFiveDayForecastWindow(body);
});
