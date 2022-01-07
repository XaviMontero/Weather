
import {API_KEY, API } from '../constans.js';
export async function getCurrentWeather(lat, lon){
  const response = await fetch(`${API}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  console.log(response);
  if(!response.ok)return {data: null}
  const data = await response.json();
  return {data}
}


export async function getWeeklyWeather(lat, lon){
  const response = await fetch(`${API}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  console.log(response);
  if(!response.ok)return {data: null}
  const data = await response.json();
  return {data}
}