const { request } = require('@playwright/test');
const config = require('../utils/config');

class WeatherService {
  /**
   * @param {string} city
   * @param {{ appid?: string }} [options]
   */
  async getWeather(city, options = {}) {
    const appid = options.appid ?? config.apiKey;
    const apiContext = await request.newContext();
    const q = encodeURIComponent(city);
    return await apiContext.get(
      `${config.baseURL}/weather?q=${q}&appid=${appid}`
    );
  }

  /**
   * Current weather by geographic coordinates.
   * @param {number} lat
   * @param {number} lon
   * @param {{ appid?: string }} [options]
   */
  async getWeatherByCoordinates(lat, lon, options = {}) {
    const appid = options.appid ?? config.apiKey;
    const apiContext = await request.newContext();
    return await apiContext.get(
      `${config.baseURL}/weather?lat=${lat}&lon=${lon}&appid=${appid}`
    );
  }

  /**
   * 5-day / 3-hour forecast by coordinates (OpenWeatherMap `/forecast`).
   * @param {number} lat
   * @param {number} lon
   * @param {{ appid?: string }} [options]
   */
  async getForecastByCoordinates(lat, lon, options = {}) {
    const appid = options.appid ?? config.apiKey;
    const apiContext = await request.newContext();
    return await apiContext.get(
      `${config.baseURL}/forecast?lat=${lat}&lon=${lon}&appid=${appid}`
    );
  }

  /**
   * 5-day / 3-hour forecast by city name (OpenWeatherMap `/forecast?q=`).
   * @param {string} city
   * @param {{ appid?: string }} [options]
   */
  async getForecastByCity(city, options = {}) {
    const appid = options.appid ?? config.apiKey;
    const apiContext = await request.newContext();
    const q = encodeURIComponent(city);
    return await apiContext.get(
      `${config.baseURL}/forecast?q=${q}&appid=${appid}`
    );
  }
}

module.exports = new WeatherService();