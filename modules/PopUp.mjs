export class PopUp {
  constructor (parentEl) {
    this.el = {};
    this.msgEl = {};
    this.closeBtn = {};
    this.msg = '';
    this.isOpen = false;

    this.generatePopUp(parentEl);
  }

  generatePopUp(parentEl) {
    this.el = document.createElement('div');
    this.el.className = 'popup';
    this.msgEl = document.createElement('p');
    this.msgEl.className = 'popup-msg';
    this.closeBtn = document.createElement('button');
    this.closeBtn.setAttribute('aria-label', 'close');
    this.closeBtn.innerHTML = 'x';
    this.closeBtn.className = 'close-btn';
    this.closeBtn.addEventListener('click', evt => this.handleClose(evt));
    
    this.el.appendChild(this.closeBtn);
    this.el.appendChild(this.msgEl);
    parentEl.appendChild(this.el);
  }

  show(msg) {
    this.el.classList.remove('hide');
    this.el.classList.add('show');
    this.msgEl.innerHTML = msg;
    this.isOpen = true;
    this.closeBtn.focus();
  }

  hide() {
    this.el.classList.remove('show');
    this.el.classList.add('hide');
    this.isOpen = false;
  }

  handleClose(evt) {
    evt.preventDefault();
    this.hide();
  }
}