import { Weather } from './weatherAPI';
import { View } from './view.js';
import * as domElemCollection from './domElemCollection';
import { GoeLocation } from './geoLocationAPI';
import * as helperFunctions from './helperFunctions';

const weatherController = {
  getLocationAndWeather: function (queryString) {
    GoeLocation.getLatLonFromCityName(queryString)
      .then((geoLocation) => {
        // when no city was fond api response
        // with object containing err message
        if (!geoLocation.error) {
          Weather.getWeatherData({
            latitude: geoLocation.latt,
            longitude: geoLocation.longt,
          }).then((weatherData) => {
            console.log(weatherData);
            View.displayWeather(weatherData);
            View.updateCityName(queryString);
          });
        } else {
          // if no city was found
          console.log(geoLocation);
          const errorMessage = geoLocation.error.hasOwnProperty('description')
            ? geoLocation.error.description
            : geoLocation.error.hasOwnProperty('message')
            ? geoLocation.error.message
            : 'Oopsie Woopsie!';

          swal('', `${errorMessage}`, 'error');
        }
      })
      .then(() => {
        //reactivate find button
        domElemCollection.findButton.forEach((button) => {
          button.innerHTML = 'Find';
          button.disabled = false;
        });
      })
      .catch((err) => {
        swal('', `${err}`, 'error');
      });
  },
  domListeners: {
    onLoadListener: function () {
      const positionAccessGranted = function (location) {
        Promise.all([
          Weather.getWeatherData(location.coords),
          GoeLocation.getCityNameFromLatLon(location.coords),
        ])
          .then(([weatherData, geoLocationData]) => {
            if (!geoLocationData.error) {
              View.displayWeather(weatherData);
              View.updateCityName(geoLocationData);
            } else {
              console.log(geoLocationData);
              const errorMessage = geoLocationData.error.hasOwnProperty(
                'description'
              )
                ? geoLocationData.error.description
                : geoLocationData.error.hasOwnProperty('message')
                ? geoLocationData.error.message
                : 'Oopsie Woopsie!';

              swal('', `${errorMessage}`, 'error');
            }
          })
          .catch((err) => {
            console.log(err);
            swal('', `${err}`, 'error');
          });
      };

      const positionAccessDenied = function () {
        const newYorkCoordinates = { alt: 40.712772, lon: -74.006058 };
        Weather.getWeatherData(newYorkCoordinates).then((weatherData) => {
          View.displayWeather(weatherData);
          View.updateCityName('New York');
        });
      };

      // if user grant location access
      // show curr location forecast
      // else show new york's forecast
      navigator.geolocation.getCurrentPosition(
        positionAccessGranted,
        positionAccessDenied
      );
    },

    onFormSubmit: function (event) {
      event.preventDefault();
      const form = event.target;

      if (form.checkValidity() === false) {
        event.stopPropagation();
        form.classList.add('was-validated');
      } else {
        form.classList.remove('was-validated');

        const cityNameRegExp = RegExp(
          `^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$`
        );
        const formInput = [...form.children][0];
        const queryString = formInput.value.trim();

        // test for potential wrong city names
        // if test false add is-invalid flag to input
        //else remove it if exist
        if (cityNameRegExp.test(queryString)) {
          formInput.classList.remove('is-invalid');

          //deactivate find button to prevent
          //flooding api with multiple requests
          domElemCollection.findButton.forEach((button) => {
            const image = document.createElement('img');
            helperFunctions.setAttributes(image, {
              src: require('../img/Dual Ring-1s-200px.svg'),
              class: 'img-fluid',
              width: '25',
              height: '25',
            });
            button.innerHTML = '';
            button.appendChild(image);
            button.disabled = true;
          });

          //get request weather data
          weatherController.getLocationAndWeather(queryString);
        } else {
          formInput.classList.add('is-invalid');
        }
      }
    },
  },
};

// get current location of the user on load
window.addEventListener('load', weatherController.domListeners.onLoadListener);

// validity for nav bar form
// and the mobile view form
domElemCollection.locationForm.forEach((form) => {
  form.addEventListener('submit', weatherController.domListeners.onFormSubmit);
});
