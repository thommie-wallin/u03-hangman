// Globala variabler

// Array: med spelets alla ord
const wordList = ['dinosaurs', 'lavish', 'duck', 'political', 'squash', 'page', 'place', 'silky', 'quick', 'bustling', 'veil', 'steel'];

// Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let selectedWord;    

let guesses = 0;     // Number: håller antalet gissningar som gjorts
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över

// DOM-nod: knappen som du startar spelet med
let startGameBtnEl = document.querySelector('#startGameBtn');
startGameBtnEl.addEventListener('click', startGame);
let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls;    // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

function startGame() {
  selectedWord = randomWord(wordList);
  createLetterBoxes(selectedWord);
}

// ----------------------------------------------------------------------
// Funktion som slumpar fram ett ord

function randomWord(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
}
// console.log("Function returns " + randomWord(wordList));
// ----------------------------------------------------------------------

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram

function createLetterBoxes(word) {
  let letters = word.split('');
  const letterBoxEls = document.querySelector('#letterBoxes > ul');  
  const removeEl = document.querySelectorAll('#letterBoxes li');
  const newLi = document.createElement('li');

  // Remove old word
  for (let i = 0; i < removeEl.length; i++) {
    letterBoxEls.removeChild(removeEl[i]);    
  }  
  
  // Set a new word
  for (let i = 0; i < letters.length; i++) {
        
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('disabled', 'true');
    newInput.setAttribute('value', letters[i]);
    
    newLi.appendChild(newInput);
    letterBoxEls.appendChild(newLi);
  }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på