let fiveLetterWords = [];

function fetchDictionary() {
  fetch('./utils/dictionary.json', {
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    return response.json()
  })
  .then(data => {
    let words = Object.keys(data);
    for(var i = 0; i < words.length; i++) {
      if(words[i].length === 5) {
        fiveLetterWords.push(words[i]);
      }
    }
    console.log('words: ', JSON.stringify(fiveLetterWords));
  });
}