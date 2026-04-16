const { test } = require('@playwright/test');
const weatherService = require('../services/weatherService');
const { testData } = require('../utils/config');
const { validateWeatherResponse } = require('../utils/responseValidator');

test('TC-002: Validate response fields', async () => {
  const response = await weatherService.getWeather(testData.cities.valid);
  const body = await response.json();
  validateWeatherResponse(body);
});
