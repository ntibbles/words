# Words, a Wordle clone

**Overview**  
This is my version of Wordle. Wordle doesn't user double letters as the answer, and the same approach is used here. 

**How it works:**  
There are 2 data files (dictionary.json and words.json). The dictionary is an extract of all 5 letter words from Websters (it doesn't include plural 4 letter words). The words.json file is a curated list of words that don't contain any duplicate letters (you can add as many new ones as you'd like, it's only a partial list extracted from dictionary.json). Then when you enter a word it checks your word against the dictionary to make sure it's valid and then checks if the word is correct. Simple.

**Requirements**  
Node.js  
http-server  

**Known Issues**  
If the user inputs a double letter word and the second letter is in the correct position the first letter will be yellow and the second green. (for example: guess = taste, solution = suite)