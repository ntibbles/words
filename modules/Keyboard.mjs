export class Keyboard {
  constructor(parentEl, guessEl) {
    this.rowId = 'kbRow';
    this.letterId = 'kbLetter';
    this.layout = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','Enter','Backspace'];
    this.rowValues = [10,9,7,2];
    this.curRow = 0;
    this.curLetter = 0;
    this.parentEl = parentEl;
    this.guessEl = guessEl;
    this.keyMap = new Map();

    document.addEventListener('touchend', evt => this.dispatchKeyDown(evt));
    this.generateKeyboard();
  }

  generateKeyboard() {
    let parentEl = {};
    for(let i = 0; i < 4; i++) {
      this.generateRow(i);
      for(let j = 0; j < this.rowValues[this.curRow]; j++) {
        parentEl = document.getElementById(`${this.rowId}${i}`);
        this.generateKey(parentEl, this.layout[this.curLetter]);
        this.curLetter++;
      }
      this.curRow++;
    }
  }

  generateRow(index) {
    let kbDiv = document.createElement('div');
    kbDiv.id = `${this.rowId}${index}`;
    kbDiv.className = 'kbRow';
    this.parentEl.appendChild(kbDiv);
  }

  generateKey(parentEl, value) {
    let btn = document.createElement('button');
    btn.innerHTML = value;
    btn.setAttribute('value', value);
    btn.id = `${this.letterId}-${value}`;
    btn.className = `kbLetter key-${value}`;
    btn.style.backgroundColor = 'transparent';
    btn.addEventListener('ontouchstart', evt => this.dispatchKeyUp(evt));
    btn.addEventListener('click', evt => this.dispatchKeyUp(evt));
    parentEl.appendChild(btn);
  }

  updateKey(keyValue, color) {
    let key = document.getElementById(`${this.letterId}-${keyValue}`);
    key.style.backgroundColor = color;
  }

  dispatchKeyDown(evt) {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: value }));
  }

  dispatchKeyUp(evt) {
    let value = evt.target.innerHTML;
    if(value !== 'Enter' && value !== 'Backspace') {
      this.guessEl.value += value;
    }
    if(value === 'Backspace') {
      this.guessEl.value = this.guessEl.value.slice(0, -1);
    }
    this.guessEl.dispatchEvent(new KeyboardEvent('keyup', { key: value, code: evt.target.value }));
  }
}