import {formantDate, formatTemp} from './formatData.js'
import {weatherCondincionCode} from './constans.js';
import {getLatLon} from './geolocation.js';
import {getCurrentWeather} from './service/weather.js'

export default async function currentWeather(){

  const lonLat = await getLatLon();
    if (!lonLat) return console.log('Hay un error');
  const {data: weather} = await getCurrentWeather(lonLat.lat, lonLat.lon);
    if(!weather) return console.log('Hay un error externo en la api');

  configCurrentWeather(weather);
}

function configCurrentWeather(weather) {

  const $currentWeatherCity = document.querySelector('#current-weather-city');
  const $currentWeatherDate = document.querySelector('#current-weather-date');
  const $currentWeatherTemp = document.querySelector('#current-weather-temp');
  const $el  = document.querySelector('#app');
  const $loader = document.querySelector('#loading');
  showCurrentWeather($el,$loader);
  const date = new Date();
  const city = weather.name;
  const temp = weather.main.temp;
  const x = weather.sys.sunrise;
  const y = weather.sys.sunset;
  const sunRiseTime = new Date (x*1000);
  const clima = String(weather.weather[0].id).charAt(0);

  setcurrentWeather( $currentWeatherCity, city);
  setcurrentWeather( $currentWeatherDate, formantDate(date));
  setcurrentWeather( $currentWeatherTemp, formatTemp(temp));
  setBackground($el, statusDay(sunRiseTime,clima));
  //loader
}

function setcurrentWeather( $currentWeatherCity, name){
  $currentWeatherCity.textContent = name;
}

function setBackground($el, status){
  $el.style.backgroundImage = `url("../Weather/img/${status}.jpg")`;
  //  style.backgroundImage
}

function showCurrentWeather($el,$loader){
  $el.hidden = false;
  $loader.hidden = true;
}

function statusDay(sunRiseTime,clima){
  const currentHours = new Date().getHours();
  const condicionWeather = weatherCondincionCode[clima];
  const pixel = window.matchMedia("(-webkit-min-device-pixel-ratio:2)").matches ? '@2x':'';
 return sunRiseTime  >= currentHours? `morning-${condicionWeather}${pixel}` : `night-${condicionWeather}${pixel}` ;

}