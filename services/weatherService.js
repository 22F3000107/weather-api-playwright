const { request } = require('@playwright/test');
const config = require('../utils/config');

class WeatherService {
  async getWeather(city) {
    const apiContext = await request.newContext();
    return await apiContext.get(
      `${config.baseURL}/weather?q=${city}&appid=${config.apiKey}`
    );
  }
}

module.exports = new WeatherService();