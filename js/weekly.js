
import {getLatLon} from './geolocation.js';
import {getWeeklyWeather} from './service/weather.js'
import {formatWeekList, createDOM,formantDate,formatTemp } from './formatData.js';
import draggble from './draggble.js';

function tabPanelTemplate (index){
  return`
  <div class="tabPanel" tabindex="0" aria-labelledby="tab-${index}">
    <div class="dayWeather" id="dayWeather-${index}">
      <ul class="dayWeather-list" id="dayWeather-list-${index}">

      </ul>
    </div>
  </div>`
}

function tabDayTempleate ({temp,date,icon,description}){
 return `
    <li class="dayWeather-item is-selected">
      <span class="dayWeather-time">${date}</span>
      <img class="dayWeather-icon" height="48" width="48" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" rain="">
      <span class="dayWeather-temp">${temp}</span>
    </li>
 `
}

function createTabPanel(id){
  const $panel = createDOM(tabPanelTemplate(id));
   id === 0 ? null : $panel.hidden = true;
  return $panel
}

function createDayPanel(weather){
  const dateOption = {
    hour:'numeric',
    hour12:true,

  }
  const config = {
    temp: formatTemp(weather.main.temp),
    date: formantDate((weather.dt*1000),dateOption),
    icon: weather.weather[0].icon,
    description: weather.weather[0].description,
  }
  const $panel = createDOM(tabDayTempleate(config));
  return $panel
}


export default async function weekly(){
  const $element= document.querySelector('.weeklyWeather')
  const lonLat = await getLatLon();
    if (!lonLat) return console.log('Hay un error');
  const {data: weekly} = await getWeeklyWeather(lonLat.lat, lonLat.lon);
    if(!weekly) return console.log('Hay un error externo en la api');
  const weeklyList = formatWeekList(weekly.list);
  configCurrentWeekly(weeklyList);
  draggble($element);
}


function configCurrentWeekly(weekly){
  const $container = document.querySelector ('.tabs');
  weekly.forEach((item,index) => {
      const $panel =createTabPanel(index);
      $container.append( $panel);
       item.forEach(weather => {
        $panel.querySelector('.dayWeather-list').append(createDayPanel(weather));
       });
  });
}