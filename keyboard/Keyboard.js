const Keyboard = {
  elements:{
    main: null,
    keysContainer: null,
    keys:[]
  },

  eventHandlers:{
    oninput: null,
    onclose: null
  },

  properties:{
    value: '',
    capslock: false
  },

  init(){
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');

    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.main.appendChild(this.elements.keysContainer)
    document.body.appendChild(this.elements.main)
  },

  _createKeys(){
    const fragment = document.createDocumentFragment();
  },

  _triggerEvent(handlerName){

  },

  _toggleCapsLock(){

  },

  open(initialValue, oninput, onclose){

  },

  close(){

  }
}

document.addEventListener('DOMContentLoaded', () => {
  Keyboard.init()
})


