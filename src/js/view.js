import * as domElemCollection from './domElemCollection';
import * as helperFunctions from './helperFunctions';

export class View {
  static displayWeather(weatherDate) {
    const date = helperFunctions.timeConverter(weatherDate.current.dt);

    const convertedCurrentTemp = helperFunctions.convertTemp(
      weatherDate.current.temp
    );
    domElemCollection.todayTemp.textContent = helperFunctions.truncateTemp(
      convertedCurrentTemp
    );

    domElemCollection.todayConditionIcon.src = require('../img/icons/' +
      weatherDate.current.weather[0].icon.substring(0, 2) +
      '.svg');

    domElemCollection.todayCondition.textContent =
      weatherDate.current.weather[0].description;

    domElemCollection.todayHumidity.textContent =
      weatherDate.current.humidity + ' %';

    domElemCollection.todayWindDirection.textContent = helperFunctions.degToCompass(
      weatherDate.current.wind_deg
    );

    domElemCollection.todayWindSpeed.textContent = helperFunctions.convertSpeed(
      weatherDate.current.wind_speed
    );
    // weatherDate.current.wind_speed + ' km/h';

    domElemCollection.todayName.textContent = date.day;
    domElemCollection.todayDate.textContent = date.date;

    // api daily arr contain 8 day,
    // only need 7 so setting the max index to 7
    const tempUnit = localStorage.getItem('temperatureUnit')
      ? localStorage.getItem('temperatureUnit')
      : 'C';
    for (let index = 1; index < 7; index++) {
      const day = weatherDate.daily[index];
      const date = helperFunctions.timeConverter(day.dt);

      domElemCollection[`day_${index}_date`].textContent = date.day;

      domElemCollection[`day_${index}_icon`].src = require('../img/icons/' +
        day.weather[0].icon.substring(0, 2) +
        '.svg');

      const truncatedMaxTemp = Math.trunc(
        helperFunctions.convertTemp(day.temp.max)
      );
      domElemCollection[`day_${index}_maxTemp`].textContent =
        truncatedMaxTemp + '°' + tempUnit;

      const truncatedMinTemp = Math.trunc(
        helperFunctions.convertTemp(day.temp.min)
      );
      domElemCollection[`day_${index}_minTemp`].textContent =
        truncatedMinTemp + '°' + tempUnit;
    }

    if (domElemCollection.mainWeatherSection.classList.contains('d-none')) {
      domElemCollection.loadingPageAnimation.classList.add('d-none');

      domElemCollection.mainWeatherSection.classList.remove('d-none');
      domElemCollection.mainWeatherSection.classList.add('scale-in-center');
      setTimeout(() => {
        domElemCollection.mainWeatherSection.classList.remove(
          'scale-in-center'
        );
      }, 1000);
    }
  }

  static updateCityName(geoLocationData) {
    //if city name was passed as string or as object from api service
    if (typeof geoLocationData == 'string') {
      domElemCollection.todayCityName.textContent = geoLocationData;
    } else {
      domElemCollection.todayCityName.textContent = `${geoLocationData.osmtags.name_en}, ${geoLocationData.prov}`;
    }
  }
}
