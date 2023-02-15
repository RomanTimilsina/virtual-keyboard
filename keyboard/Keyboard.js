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

    this.elements.main.classList.add('keyboard','keyboard__hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');

    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.main.appendChild(this.elements.keysContainer)
    document.body.appendChild(this.elements.main)

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    document.querySelectorAll('.use-keyboard-input').forEach(element => {
      element.addEventListener('focus', () => {
        this.open(element.value , currentValue => {
          element.value = currentValue
        })
      })
    })
    },
    

  _createKeys(){
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
      "space"
  ];

  const createIcon = (icon) => {
    return `<i class="material-icons">${icon}</i>`
  }

  keyLayout.forEach(key => {
    const keyElement = document.createElement('button');
    const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;
    
    keyElement.setAttribute('type','button')
    keyElement.classList.add('keyboard__key')

    switch(key){
      case "backspace" : 
      keyElement.classList.add('keyboard__key--wide');
      keyElement.innerHTML = createIcon('backspace');

      keyElement.addEventListener('click', (e) => {
        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
        this._triggerEvent('oninput');
        console.log(this.properties.value)
      })

      break;

      case "space" : 
      keyElement.classList.add('keyboard__key--extra-wide');
      keyElement.innerHTML = createIcon('space_bar');

      keyElement.addEventListener('click', (e) => {
        this.properties.value += ' ';
        this._triggerEvent('oninput');
        console.log(this.properties.value + 'a')
      })

      break;

      case "caps" : 
      keyElement.classList.add('keyboard__key--wide','keyboard__key--activatable');
      keyElement.innerHTML = createIcon('keyboard_capslock');

      keyElement.addEventListener('click', (e) => {
        this._toggleCapsLock();
        keyElement.classList.toggle('keyboard__key--active', this.properties.capslock);
        
      })

      break;

      case "enter" : 
      keyElement.classList.add('keyboard__key--wide');
      keyElement.innerHTML = createIcon('keyboard_return');

      keyElement.addEventListener('click', (e) => {
        this.properties.value += '\n';
        this._triggerEvent('oninput');
        console.log(this.properties.value + 'a')
      })

      break;

      case "done" : 
      keyElement.classList.add('keyboard__key--wide','keyboard__key--dark');
      keyElement.innerHTML = createIcon('check_circle');

      keyElement.addEventListener('click', (e) => {
        this._triggerEvent('onclose')
        this.close()
      })

      break;

      default:
      keyElement.textContent = key;

      keyElement.addEventListener('click', () => {
        this.properties.value += this.properties.capslock ? key.toUpperCase() : key.toLowerCase() ;
        this._triggerEvent('oninput');
        
      })

      break;

    }
    fragment.appendChild(keyElement);

    if(insertLineBreak) {
      fragment.appendChild(document.createElement('br'))
    }
    
  })

  return fragment;
  },

  _triggerEvent(handlerName){
    console.log(typeof this.eventHandlers[handlerName] )
    if(typeof this.eventHandlers[handlerName] == 'function'){
     this.eventHandlers[handlerName](this.properties.value)
     
    }
  },

  _toggleCapsLock(){
  this.properties.capslock = !this.properties.capslock;

  for( key of this.elements.keys){
    
    if(key.children.length < 1){
    key.innerText = this.properties.capslock ? key.innerText.toUpperCase() : key.innerText.toLowerCase()
  }}
  },

  open(initialValue, oninput, onclose){
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard__hidden')

  },

  close(){
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard__hidden')
  }
}

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init()
})


