const $tabs = document.querySelector('#tabs');

const $tabList = $tabs.querySelectorAll('.tab');


const toDay = new Date();
let weekday = toDay.getDay();

const week = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado'
]

function nextDay(day){
  return day === 6 ? 0 : day+1;
}



$tabList.forEach(($element, index) => {
  $element.addEventListener('click', habdelSelectTabClick )
  index === 0 ? $element.textContent = 'Hoy' : $element.textContent=week[weekday];
  weekday = nextDay(weekday);
});

function habdelSelectTabClick(event) {
  const $tabSelect = event.target;
  const id = $tabSelect.id;
  const $tabActive = document.querySelector('.tab[aria-selected="true"]');
  $tabActive.removeAttribute('aria-selected');
  $tabSelect.setAttribute('aria-selected', true);
  const $tabPanel = document.querySelector(`[aria-labelledby=${id}]`);
  const $tabPanelSelect = document.querySelector(`.tabPanel:not([hidden])`);
  $tabPanel.hidden = false;
  $tabPanelSelect.hidden = true;
}

