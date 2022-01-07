
import {getLatLon} from './geolocation.js';
import {getWeeklyWeather} from './service/weather.js'


export default async function weekly(){
   const lonLat = await getLatLon();
    if (!lonLat) return console.log('Hay un error');
  const {data: weekly} = await getWeeklyWeather(lonLat.lat, lonLat.lon);
    if(!weekly) return console.log('Hay un error externo en la api');
  configCurrentWeekly(weekly);
}


function configCurrentWeekly(weekly){
  console.log(weekly);
}