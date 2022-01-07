export function getViewPort(){
  return window.innerHeight;
}

export function onViewPortResize(callback){
  window.addEventListener('resize', callback );
}

export function offViewPortResize(callback){
  window.removeEventListener('resize', callback );
}

export function viewportSize($el){
  setviewPortSize($el)
  onViewPortResize(()=>setviewPortSize($el));
}

export function setviewPortSize($el){
  $el.style.blockSize=`${getViewPort()}px`;
}