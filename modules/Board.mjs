export class Board {
  constructor(root = 'app', wordId = 'word', letterId = 'letter') {
    this.wordId = wordId;
    this.letterId = letterId;
    this.rootDiv = root;
    this.guessEl = '';

    this.generateBoard();
  }

  generateBoard() {
    let parentEl = {};
    for(let i = 0; i < 6; i++) {
      this.generateWordContainer(i);
      for(let j = 0; j < 5; j++) {
        parentEl = document.getElementById(`${this.wordId}${i}`);
        this.generateLetterInput(parentEl, j);
      }
    }
    this.guessEl = document.getElementById('word0');
  }
  
  generateWordContainer(index) {
    let wordDiv = document.createElement('div');
    wordDiv.id = `${this.wordId}${index}`;
    wordDiv.className = 'word';
    this.rootDiv.appendChild(wordDiv);
  }
  
  generateLetterInput(parentEl, index) {
    let letterContainer = document.createElement('div');
    letterContainer.className = 'flipper';
    let letterInput = document.createElement('input');
    letterInput.type = 'text';
    letterInput.setAttribute('maxlength', 1);
    letterInput.setAttribute('disabled', '');
    letterInput.id = `${this.letterId}${index}`;
    letterInput.className = `letter`;
    letterContainer.appendChild(letterInput);
    parentEl.appendChild(letterContainer);
  }
}