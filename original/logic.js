let counter = 0;
let curIndex = 1;
let correctLetters = 0;
let guess = [];
let guessEl = '';
let dict = [];
let word = '';

const colors = {
  correct: 'green',
  misplaced: 'yellow',
  incorrect: 'lightgray'
};
const rootDiv = document.getElementById('wordle');
const wordId = 'word';
const letterId = 'letter';
const tabbableEls = [];
const wordMap = new Map();
window.wordle = {};
window.wordle.hint = hint;

function init() {
  counter = 0;
  fetchWords();
  document.addEventListener('keyup', handleKeyUp);
}

function fetchWords() {
  fetch('./words.json', {
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    return response.json()
  })
  .then(data => {
    dict = data;
    getRandomWord(data);
    generateBoard();
  });
}

function getRandomWord(list) {
  word = list[Math.floor(Math.random()*list.length)].split('');
}

function hint() {
  wordle.word = console.log(word.join(''));
}

function reset() {
  curIndex = 1;
  guess = [];
  correctLetters = 0;
}

function generateBoard() {
  let parentEl = '';
  for(let i = 0; i < 6; i++) {
    generateWordContainer(i);
    for(let j = 0; j < 5; j++) {
      parentEl = document.getElementById(`${wordId}${i}`);
      generateLetterInput(parentEl, j);
    }
  }
  guessEl = document.getElementById('word0');
}

function generateWordContainer(index) {
  let wordDiv = document.createElement('div');
  wordDiv.id = `${wordId}${index}`;
  wordDiv.className = 'word';
  rootDiv.appendChild(wordDiv);
}

function generateLetterInput(parentEl, index) {
  let letterInput = document.createElement('input');
  letterInput.type = 'text';
  letterInput.setAttribute('maxlength', 1);
  letterInput.id = `${letterId}${index}`;
  letterInput.className = 'letter';
  tabbableEls.push(letterInput);
  parentEl.appendChild(letterInput);
}

function getWord() {
  let letters = document.getElementById(`${wordId}${counter}`);
  for (let i = 0; i < letters.children.length; i++) {
    let letter = letters.children[i].value;
    if(letter !== '') guess.push(letter);
  }
}

function checkWord() {
  for(let i = 0; i < word.length; i++) {
    let index = word.indexOf(guess[i]);
    let bgColor = colors.incorrect;
    //let bgColor = (index === i) ? colors.correct : ((index > -1) ? colors.misplaced : colors.incorrect);
    // check the letter in the current spot
    if(word[i] === guess[i]) {
      bgColor = colors.correct;
    } else if(index > -1) {
      bgColor = colors.misplaced;
    }

    highlightLetter(i, bgColor);

    if(checkHasWon(bgColor)) {
      window.alert('You Won');
    }
  }
}

function highlightLetter(index, color) {
  guessEl = document.getElementById(`${wordId}${counter}`);
  guessEl.querySelector(`#${letterId}${index}`).style.backgroundColor = color;
}

function checkHasWon(correct) {
  let hasWon = false;
  if(correct === colors.correct) {
    correctLetters++;
  }
  if(correctLetters === 5) {
    hasWon = true;
  }

  return hasWon;
}

function handleSubmit() {
  // reset word
  reset();
  // populate word
  getWord();
  // check word
  if(validateWord()) {
    checkWord();
    counter++;
  } else {
    window.alert('Word is not valid');
  }
}

function validateWord() {
  let isValid = false;
  let validWord = dict.indexOf(guess.join('')) > -1;
  //check length and dictionary
  if(guess.length === 5 && validWord) {
    isValid = true;
  }
  return isValid;
}

function handleKeyUp(evt) {
  if(curIndex <= 4 && evt.key !== 'Enter') {
    let elIndex = tabbableEls.indexOf(document.activeElement) + 1;
    tabbableEls[elIndex].focus();
    curIndex++;
  };

  if(evt.key === 'Enter') handleSubmit();
}

init();