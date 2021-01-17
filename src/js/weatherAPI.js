// this should be hidden
const _WeatherAPIKey = '260900576590c23a8d0950d747779286';

export class Weather {
  // using async instead of promises
  static async getWeatherData({ latitude, longitude }) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,alerts&appid=${_WeatherAPIKey}&units=metric`;
    const rowWeatherData = await fetch(url);
    const parsedWeatherData = await rowWeatherData.json();
    return parsedWeatherData;
  }
}
