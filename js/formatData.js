const defaultDateOptions = {
  day: 'numeric',
  weekday: 'long',
  month:'long'
}

export function formantDate (date, config = defaultDateOptions){
  return new Intl.DateTimeFormat('es', config).format(date);
}

export function formatTemp(value){
  return `${Math.floor(value)}°`
}

export function formatWeekList(rawData){
  const weekList = [] ;
  let dayList = [];
  rawData.forEach((item, index) => {
    dayList.push(item);
      if ( (index+1) % 8 === 0 ){
        weekList.push(dayList);
        dayList = [];
      }
  });
  return weekList;
}

export function createDOM (string){
  const parse = new DOMParser();
  return parse.parseFromString(string, "text/html").body.firstChild;

}