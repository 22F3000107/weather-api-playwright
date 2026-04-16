const { test } = require('@playwright/test');
const weatherService = require('../services/weatherService');
const { testData } = require('../utils/config');
const { validateUnauthorizedResponse } = require('../utils/responseValidator');

test('TC-004: Unauthorized - invalid API key', async () => {
  const response = await weatherService.getWeather(testData.cities.valid, {
    appid: testData.api.invalidAppId,
  });
  validateUnauthorizedResponse(response);
});
