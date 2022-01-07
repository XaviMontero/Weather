
import currentWeather from './current-weather.js';
import {viewportSize} from './viewport.js';
import weekly from './weekly.js'
import './tabs.js'
const $el  = document.querySelector('#app');
const $loader = document.querySelector('#loading');
viewportSize($el)
viewportSize($loader)
currentWeather();
weekly();