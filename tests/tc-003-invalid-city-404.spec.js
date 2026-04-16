const { test } = require('@playwright/test');
const weatherService = require('../services/weatherService');
const { testData } = require('../utils/config');
const { validateResponseStatus } = require('../utils/responseValidator');

test('TC-003: Invalid city should return 404', async () => {
  const response = await weatherService.getWeather(testData.cities.invalid);
  validateResponseStatus(response, 404);
});
