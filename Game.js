/**
 * Known issues:
 * - If the user inputs a double letter word and the second letter is 
 * in the correct position the first letter will be yellow and the second green.
 * (for example: guess = taste, solution = suite)
 * To-do:
 * - Add settings for a11y support
 */

import { Board } from './modules/Board.mjs';
import { Scoring } from './modules/Scoring.mjs';
import { Keyboard } from './modules/Keyboard.mjs';
import { PopUp } from './modules/PopUp.mjs';
import { loader, validateWord } from './modules/utils.mjs';
import { colors } from './modules/constants.mjs';

class Game {
  constructor() {
    this.curIndex = 0;
    this.guess = [];
    this.dict = [];
    this.tabbableEls = [];
    this.word = '';
    this.wordId = 'word';
    this.letterId = 'letter';
    this.isGameOver = false;
    this.scoring = {};
    this.keyboard = {};
    this.wordEl = {};
    this.rootDiv = document.getElementById('wordle');
    this.guessTxt = document.getElementById('guessTxt');
    this.atTxt = document.getElementById('liveTxt');
    this.curWord = {};
    this.popUp = new PopUp(this.rootDiv);
    
    this.loadDictionary();
    this.loadWord();
  }

  loadDictionary() {
    loader('./data/dictionary.json')
    .then(data => {
      this.dict = data;
      this.generateBoard();
      this.generateKeyboard();
      this.generateScoring();
      this.generateHandlers();
      this.startWord();
    });
  }

  loadWord() {
    loader('./data/words.json')
    .then(data => {
      this.word = this.getRandomWord(data);
      window.getHint = () => console.log(this.getHint());
    });
  }

  // Generators
  generateHandlers() {
    document.addEventListener('keydown', evt => this.handleKeyDown(evt));
    this.guessTxt.addEventListener('keyup', evt => this.handleKeyUp(evt));
  }

  generateBoard() {
    new Board(this.rootDiv, this.wordId, this.letterId);
  }

  generateScoring() {
    this.scoring = new Scoring(this, this.popUp, this.wordId, this.letterId, this.atTxt);
  }

  generateKeyboard() {
    this.keyboard = new Keyboard(document.getElementById('keyboard'), this.guessTxt);
  }

  // Getters
  getRandomWord(list) {
    return list[Math.floor(Math.random()*list.length)].split('');
  }

  getHint() {
    return this.word.join('');
  }

  startWord() {
    if(!this.scoring.isGameOver) {
      this.enableInput();
      this.reset();
      this.wordEl = document.getElementById(`${this.wordId}${this.scoring.counter}`);
    }
  }

  endWord() {
    this.guess = this.guessTxt.value.split('');
    this.wordEl.classList.remove('shake');
    this.disableInput();
  }

  reset() {
    this.curIndex = 1;
    this.guess = [];
    this.guessTxt.value = '';
    this.scoring.correctLetters = 0;
  }

  disableInput() {
    document.getElementById('guessTxt').setAttribute('disabled', true);
  }

  enableInput() {
    document.getElementById('guessTxt').removeAttribute('disabled', true);
  }

  checkWord() {
    let markedLetter = '';
    for(let i = 0; i < this.word.length; i++) {
      let index = this.word.indexOf(this.guess[i]);
      let bgColor = (this.word[i] === this.guess[i]) ? colors.correct : ((index > -1) ? colors.misplaced : colors.incorrect);
  
      setTimeout(() => {
        this.scoring.highlightLetter(i, bgColor);
      }, i * 500);
      
      this.keyboard.updateKey(this.guess[i], bgColor);
      this.scoring.checkHasWon(bgColor);
    }
    this.scoring.checkHasLost(this.getHint());
  }

  insertLetter() {
    let letter = this.guessTxt.value.split('');
    for (let i = 0; i < letter.length; i++) {
      let txtInput = this.wordEl.querySelector(`#${this.letterId}${i}`);
      txtInput.classList.add('pop');
      txtInput.value = letter[i];
    }
  }

  removeLetter() {
    let letter = this.guessTxt.value.split('');
    let txtInput = this.wordEl.querySelector(`#${this.letterId}${letter.length}`);
    txtInput.classList.remove('pop');
    txtInput.value = '';
  }
  
  // Handlers
  handleKeyUp(evt) {
    let isBackspace = (evt.key === 'Backspace');
    let isEnter = (evt.key === 'Enter');
   
    if(!isEnter && !isBackspace) {
      this.insertLetter();
    };

    if(!isEnter && isBackspace) {
      this.removeLetter();
    }

    if(isEnter) {
      this.handleSubmit();
    }
  }

  handleKeyDown() {
    this.guessTxt.focus();
    if(this.popUp.isOpen) {
      this.popUp.hide();
    }
  }

  handleSubmit() {
    if(validateWord(this.dict, this.guessTxt.value)) {
      this.endWord();
      this.checkWord();
    } else {
      this.enableInput();
      this.popUp.show('The word is not in the dictionary');
      this.wordEl.classList.add('shake');
      // alertMessage('The word is not in the dictionary', this.atTxt);
    }
  }
}

new Game();
