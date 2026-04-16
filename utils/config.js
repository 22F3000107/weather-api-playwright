require('dotenv').config();

/** Shared fixtures for API tests (not secrets). */
const testData = {
  cities: {
    /** Primary city used for happy-path weather and forecast tests */
    valid: 'London',
    /** Unknown city name — expect 404 from current weather */
    invalid: 'InvalidCity123',
    /** Used for negative tests on `q=` */
    empty: '',
  },
  coordinates: {
    london: { lat: 51.5074, lon: -0.1278 },
    /** Out-of-range — expect 400 from OpenWeatherMap */
    invalid: { lat: 999, lon: 999 },
  },
  api: {
    invalidAppId: 'INVALID_KEY',
  },
};

module.exports = {
  baseURL: process.env.BASE_URL,
  apiKey: process.env.API_KEY,
  testData,
};
