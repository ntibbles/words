export function loader(path) {
  return fetch(path, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data;
    });
}

export function validateWord(dict, word) {
  let isValid = false;
  let validWord = (dict.indexOf(word) > -1 && word.length === 5);

  if (validWord) {
    isValid = true;
  }
  return isValid;
}

export function alertMessage(msg, atEl) {
  setTimeout(() => {
    window.alert(msg);
  }, 50);
}

export function annouce(el, msg) {
  el.innerHTML += msg + ", ";
  setTimeout(() => {
    el.innerHTML = "";
  }, 5000);
}

// https://www.codegrepper.com/code-examples/javascript/find+duplicate+characters+from+string+in+javascript
export function getRepeatedChars(str) {
  const chars = {};
  for (const char of str) {
    chars[char] = (chars[char] || 0) + 1;
  }
  return Object.entries(chars).filter(char => char[1] > 1).map(char => char[0]);
}