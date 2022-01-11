
import {formatTemp, formatKm,formatHume} from './formatData.js'
let max =document.querySelector('#max-desc')
let min =document.querySelector('#min-desc')
let vien=document.querySelector('#vien-desc')
let hume=document.querySelector('#hume-desc')
let we= null;


export function configDayTabs(weather){
  we=weather;
  const $dayList = document.querySelectorAll('.dayWeather-item');

    $dayList.forEach(($element, index) => {
    $element.addEventListener('click', habdelSelectDayTabClick)
    if (index === 0 ){
      $element.classList.add('is-selected');
      setDataDescription(0,0)
    }
  });
}

function setDataDescription(cord1,cord2){
  max.textContent= formatTemp(we[cord1][cord2].main.temp_max);
  min.textContent= formatTemp(we[cord1][cord2].main.temp_min);
  vien.textContent= formatKm(we[cord1][cord2].wind.speed);
  hume.textContent= formatHume(we[cord1][cord2].main.humidity);

}
function habdelSelectDayTabClick(event){
  let $tabSelect = event.target;
  if(!event.path[0].nodeName.startsWith('LI')){
     $tabSelect = event.path[1];
  }
  let cord = $tabSelect.id.split("-");
  remove();
  $tabSelect.classList.add('is-selected');
   setDataDescription(cord[1],cord[0])
}

function remove(){
  const $dayList = document.querySelectorAll('.dayWeather-item');
  $dayList.forEach(($element, index) => {
     $element.classList.remove('is-selected');
  });

}