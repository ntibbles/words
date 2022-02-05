import { colors, messages } from "./constants.mjs";
import { alertMessage, annouce } from "./utils.mjs";

export class Scoring {
  constructor (game, popUp, wordId = 'word', letterId = 'letter', atEl) {
    this.wordId = wordId;
    this.letterId = letterId;
    this.correctLetters = 0;
    this.counter = 0;
    this.hasWon = false;
    this.atEl = atEl;
    this.a11yFeatures = false;
    this.game = game;
    this.popUp = popUp;
    this.isGameOver = false;
  }

  getWinMessage() {
    let msg = '';
    switch(this.counter) {
      case 0:
        msg = messages[0];
        break;
      case 1:
        msg = messages[1];
        break;
      case 2:
        msg = messages[2];
        break;
      case 3:
        msg = messages[3];
        break;
      case 4:
        msg = messages[4];
        break;
      default:
        msg = messages[5];
    }

    return msg;
  }

  gameOver() {
    console.log('game over');
    this.game.disableInput();
    this.isGameOver = true;
  }

  checkHasWon(correct) {
    if(correct === colors.correct) {
      this.correctLetters++;
    }
    if(this.correctLetters === 5) {
      this.hasWon = true;
      // alertMessage(this.getWinMessage());
      this.gameOver();
    }
  }

  checkHasLost(word) {
    if(this.counter === 5 && !this.hasWon) {
      this.popUp.show(`The word was '${word}'`);
      // alertMessage(`The word was '${word}'`);
      this.gameOver();
    }
  }

  flipLetter(el, color) {
    setTimeout(() => {
      el.classList.add('rotate', color);
    }, 400);
  }

  highlightLetter(index, color) {
    let el = document.getElementById(`${this.wordId}${this.counter}`);
    let letter =  el.querySelector(`#${this.letterId}${index}`);
    letter.parentElement.classList.add('flip');
    this.flipLetter(letter, color);
    if(this.a11YFeatures && color === colors.misplaced) {
      letter.style.borderStyle = "dashed";
      annouce(this.atEl, `${letter.value} is in the word but not in the correct position`);
    }
    if(this.a11YFeatures && color === colors.correct) {
      letter.style.borderWidth = "3px";
      annouce(this.atEl, `${letter.value} is in the word and in the correct position`);
    }

    if(index === 4) {
      this.counter++;
      this.game.startWord();

      if(this.hasWon) {
        this.popUp.show(this.getWinMessage());
      }
    }
  }
} 