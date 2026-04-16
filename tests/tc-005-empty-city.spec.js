const { test } = require('@playwright/test');
const weatherService = require('../services/weatherService');
const { testData } = require('../utils/config');
const { validateNotSuccessResponse } = require('../utils/responseValidator');

test('TC-005: Empty city', async () => {
  const response = await weatherService.getWeather(testData.cities.empty);
  validateNotSuccessResponse(response);
});
