function validateWeatherResponse(body) {
  if (!body.main) throw new Error("Missing 'main' object");
  if (!body.weather) throw new Error("Missing 'weather' object");

  if (!body.main.temp) throw new Error("Temperature missing");
  if (!body.main.humidity) throw new Error("Humidity missing");

  if (!body.weather[0].description) {
    throw new Error("Weather description missing");
  }
}

module.exports = { validateWeatherResponse };