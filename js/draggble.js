const defaultConfig ={
  open:true,
  debug:true,
  animable:true
}

export default function draggble($element, confi=defaultConfig){
  if (!($element instanceof HTMLElement)) console.warn('Elemento invalido')
  const x = $element.getBoundingClientRect();
  let isDraning =false;
  const ELEMENT_BLOCK_SIZE = x.height;
  const $marke = document.querySelector('[data-marker]')
  const xMarke = $marke.getBoundingClientRect();
  const MARKER_BLOCK_SIZE = xMarke.height;
  let isOpen = confi.open;
  const VISIBLE_Y_POSITION = 0;
  const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE-MARKER_BLOCK_SIZE;
  let witdgetPosition = VISIBLE_Y_POSITION;
  isOpen ? open():close();
  let startY = 0;
  $marke.addEventListener('click', handleClik)
  $marke.addEventListener('pointerdown', handlePointerdown)
  $marke.addEventListener('pointerup', handlePointerUp)
  $marke.addEventListener('pointerout', handlePointerOut)
  $marke.addEventListener('pointercancel', handlePointerCancel)
  $marke.addEventListener('pointermove', handlePointerMove)
  if (confi.animable){
    animable();
  }

  function animable(){
    $element.style.transition = 'margin-bottom .3s'
  }

  function bounce(){
    if(witdgetPosition < ELEMENT_BLOCK_SIZE/2){
      return open();
    }else {
      return close();
    }
  }

  function dragEnd(){
    isDraning=false;
    logger('drag End')
    bounce();
  }

  function handlePointerMove(event) {
    logger('MOVE');
    drag(event);
  }

  function drag(event){
    const cusorY = event.pageY || event.touches[0].pageY;
    const moveMENTy = cusorY - startY;
    witdgetPosition = witdgetPosition + moveMENTy;
    logger (moveMENTy);
    startY = cusorY;
    if (witdgetPosition > HIDDEN_Y_POSITION){
      return false;
    }
    setWitdgetPosition(witdgetPosition);
  }

  function handlePointerCancel(event) {
    logger('Cancel');
    dragEnd()
  }

  function handlePointerOut(event) {
    logger('OUT');
    dragEnd()
  }

  function handlePointerUp(event) {
    logger('UP');
    dragEnd()
  }

  function handlePointerdown (event){
    logger('DOWN');
    startDrag(event);

  }

  function startDrag(event){
    isDraning = true;
    const  y = event.pageY || event.touches[0].pageY;
    startY = y;

  }

  function handleClik(event){
    logger('Click');
    toggle(event);
  }

  function toggle(event){
    if(!isDraning){
      return !isOpen ? open():close();
    }
  }

  function logger (message){
    if (confi.debug){
      console.info(message);
    }
  }
  function open(){
    logger('Abrir Widget');
    isOpen = true;
     witdgetPosition = VISIBLE_Y_POSITION;
    setWitdgetPosition(witdgetPosition)
  }

  function close(){
    logger('Cerrar Widget');
    isOpen = false;
    witdgetPosition = HIDDEN_Y_POSITION;
    setWitdgetPosition(witdgetPosition)
  }
  function setWitdgetPosition(value){
    $element.style.marginBottom= `-${value}px`
  }
}