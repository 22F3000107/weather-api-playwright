const { expect } = require('@playwright/test');

/**
 * @param {import('@playwright/test').APIResponse} response
 * @param {number} expectedStatus
 */
function validateResponseStatus(response, expectedStatus) {
  expect(response.status(), `Expected HTTP ${expectedStatus}`).toBe(
    expectedStatus
  );
}

/**
 * @param {import('@playwright/test').APIResponse} response
 */
function validateUnauthorizedResponse(response) {
  validateResponseStatus(response, 401);
}

/**
 * @param {import('@playwright/test').APIResponse} response
 */
function validateNotSuccessResponse(response) {
  expect(response.status(), 'Expected non-200 for invalid request').not.toBe(
    200
  );
}

/**
 * @param {Record<string, unknown>} body
 */
function validateWeatherResponse(body) {
  if (!body.main) throw new Error("Missing 'main' object");
  if (!body.weather) throw new Error("Missing 'weather' object");

  if (body.main.temp == null) throw new Error('Temperature missing');
  if (body.main.humidity == null) throw new Error('Humidity missing');

  if (!body.weather[0]?.description) {
    throw new Error('Weather description missing');
  }
}

/**
 * @param {Record<string, unknown>} body
 * @param {number} lat
 * @param {number} lon
 * @param {number} [toleranceDeg]
 */
function validateWeatherResponseCoordinates(
  body,
  lat,
  lon,
  toleranceDeg = 0.6
) {
  validateWeatherResponse(body);
  if (!body.coord) throw new Error("Missing 'coord' object");
  if (typeof body.coord.lat !== 'number' || typeof body.coord.lon !== 'number') {
    throw new Error('coord.lat / coord.lon must be numbers');
  }
  if (Math.abs(body.coord.lat - lat) > toleranceDeg) {
    throw new Error(
      `coord.lat out of range: requested ${lat}, got ${body.coord.lat}`
    );
  }
  if (Math.abs(body.coord.lon - lon) > toleranceDeg) {
    throw new Error(
      `coord.lon out of range: requested ${lon}, got ${body.coord.lon}`
    );
  }
}

/**
 * @param {Record<string, unknown>} body
 */
function validateForecastResponse(body) {
  if (String(body.cod) !== '200') {
    throw new Error(`Unexpected forecast cod: ${body.cod}`);
  }
  if (!Array.isArray(body.list) || body.list.length === 0) {
    throw new Error('Missing or empty forecast list');
  }
  if (!body.city || typeof body.city !== 'object') {
    throw new Error('Missing forecast city object');
  }

  const first = body.list[0];
  if (!first.main || first.main.temp == null) {
    throw new Error('Forecast entry missing main.temp');
  }
  if (!first.weather?.[0]?.description) {
    throw new Error('Forecast entry missing weather description');
  }
  if (first.dt == null) {
    throw new Error('Forecast entry missing dt');
  }
}

/**
 * Ensures the forecast list spans ~5 days (3-hour steps) as returned by OpenWeatherMap.
 * @param {Record<string, unknown>} body
 */
function validateFiveDayForecastWindow(body) {
  validateForecastResponse(body);
  const list = body.list;
  const firstDt = /** @type {{ dt: number }} */ (list[0]).dt;
  const lastDt = /** @type {{ dt: number }} */ (list[list.length - 1]).dt;
  const spanSeconds = lastDt - firstDt;
  const minSpanSeconds = 4 * 24 * 60 * 60;
  if (spanSeconds < minSpanSeconds) {
    throw new Error(
      `Forecast time span too short: ${spanSeconds}s (need >= ${minSpanSeconds}s)`
    );
  }
  if (list.length < 32) {
    throw new Error(
      `Expected at least 32 forecast intervals (~5 days at 3h), got ${list.length}`
    );
  }
}

module.exports = {
  validateResponseStatus,
  validateUnauthorizedResponse,
  validateNotSuccessResponse,
  validateWeatherResponse,
  validateWeatherResponseCoordinates,
  validateForecastResponse,
  validateFiveDayForecastWindow,
};
