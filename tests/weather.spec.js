const { test, expect } = require('@playwright/test');
const weatherService = require('../services/weatherService');
const { validateWeatherResponse } = require('../utils/responseValidator'); 

test('Invalid city should return 404', async () => {
  const response = await weatherService.getWeather('InvalidCity123');
  expect(response.status()).toBe(404);
});

test('Unauthorized - invalid API key', async ({ request }) => {
  const response = await request.get(
    `https://api.openweathermap.org/data/2.5/weather?q=London&appid=INVALID_KEY`
  );
  expect(response.status()).toBe(401);
});

test('Validate response fields', async () => {
  const response = await weatherService.getWeather('London');
  const body = await response.json();

  validateWeatherResponse(body); 
});

test('Empty city', async () => {
  const response = await weatherService.getWeather('');
  expect(response.status()).not.toBe(200);
});