import * as domElemCollection from './domElemCollection';
import * as helperFunctions from './helperFunctions';

export class View {
  static displayWeather(weatherDate) {
    const date = helperFunctions.timeConverter(weatherDate.current.dt);

    domElemCollection.todayTemp.textContent = weatherDate.current.temp
      .toString()
      .includes('.')
      ? weatherDate.current.temp.toString().split('.')[0] + '°'
      : weatherDate.current.temp + '°';
    domElemCollection.todayConditionIcon.src = require('../img/icons/' +
      weatherDate.current.weather[0].icon.substring(0, 2) +
      '.svg');
    domElemCollection.todayCondition.textContent =
      weatherDate.current.weather[0].description;
    console.log(weatherDate);
    domElemCollection.todayHumidity.textContent =
      weatherDate.current.humidity + ' %';
    domElemCollection.todayWindDirection.textContent = helperFunctions.degToCompass(
      weatherDate.current.wind_deg
    );
    domElemCollection.todayWindSpeed.textContent =
      weatherDate.current.wind_speed + ' km/h';

    domElemCollection.todayName.textContent = date.day;
    domElemCollection.todayDate.textContent = date.date;

    // api daily arr contain 8 day,
    // only need 7 so setting the max index to 7
    for (let index = 1; index < 7; index++) {
      const day = weatherDate.daily[index];
      const date = helperFunctions.timeConverter(day.dt);
      domElemCollection[`day_${index}_date`].textContent = date.day;
      domElemCollection[`day_${index}_icon`].src = require('../img/icons/' +
        day.weather[0].icon.substring(0, 2) +
        '.svg');
      domElemCollection[
        `day_${index}_maxTemp`
      ].textContent = day.temp.max.toString().includes('.')
        ? day.temp.max.toString().split('.')[0] + '°C'
        : day.temp.max + '°C';
      domElemCollection[
        `day_${index}_minTemp`
      ].textContent = day.temp.min.toString().includes('.')
        ? day.temp.min.toString().split('.')[0] + '°'
        : day.temp.min + '°';
    }

    if (domElemCollection.mainWeatherSection.classList.contains('d-none')) {
      domElemCollection.mainWeatherSection.classList.remove('d-none');
      domElemCollection.mainWeatherSection.classList.add('scale-in-center');
    }
  }

  static updateCityName(geoLocationData) {
    //if city name was passed as string or as object from api service
    if (typeof geoLocationData == 'string') {
      domElemCollection.todayCityName.textContent = geoLocationData;
    } else {
      domElemCollection.todayCityName.textContent =
        geoLocationData.osmtags.name_en;
    }
  }
}
