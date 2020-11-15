
// Globala variabler

// Array: med spelets alla ord
const wordList = ['dinosaurs', 'duck', 'lavish', 'political', 'squash', 'page', 'place', 'silky', 'quick', 'bustling', 'veil', 'steel']; 

// Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let selectedWord;    

// Number: håller antalet gissningar som gjorts
let guesses = 0;     

// Number: räknar antalet korrekta gissningar
let correctGuesses = 0;

// Sträng: sökväg till bild som kommer visas (och ändras) fel svar. 
let hangmanImg;      

// DOM-nod: Ger meddelande när spelet är över
let msgHolderEl = document.querySelector('#message');

// DOM-nod: knappen som du startar spelet med
let startGameBtnEl = document.querySelector('#startGameBtn');
startGameBtnEl.addEventListener('click', startGame);

// DOM-nod: knappen som startar om spelet.
let restartGameBtnEl = document.querySelector('#restartGameBtn');
restartGameBtnEl.addEventListener('click', restartGame);

// Array av DOM-noder: Knapparna för bokstäverna
let letterButtonEls = document.querySelectorAll('#gameBoard .btn');

// Array av DOM-noder: Rutorna där bokstäverna ska stå
let letterBoxEls = document.querySelector('#letterBoxes > ul');



// Spelets funktioner

// ---------------------------------------------------------------------------
// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function startGame() {
  selectedWord = randomWord(wordList);  
  createLetterBoxes(selectedWord);  
  display();
}

// ----------------------------------------------------------------------
// Funktion som slumpar fram ett ord

function randomWord(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
}

// ----------------------------------------------------------------------
// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram

function createLetterBoxes(word) {
  let letters = word.split('');  
  const removeEl = document.querySelectorAll('#letterBoxes li');  

  // Tar bort gamla ordet
  for (let i = 0; i < removeEl.length; i++) {
    letterBoxEls.removeChild(removeEl[i]);    
  }  
  
  // Sätter dit det nya ordet
  for (let i = 0; i < letters.length; i++) {        
    const newLi = document.createElement('li');
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('disabled', 'true');
    newInput.setAttribute('value', '');
    
    newLi.appendChild(newInput);
    letterBoxEls.appendChild(newLi);
  }
}

// -----------------------------------------------------------------------
// Funktion som körs när du trycker på bokstäverna och gissar bokstav

letterButtonEls.forEach(function(btn){
  btn.addEventListener('click', function(e){   
    
    // Knappvärde
    const btnValue = e.target.value;    
    
    // Gör om selectedWord till versaler och en array
    const selectedUpper = selectedWord.toUpperCase();
    const letters = selectedUpper.split('');
     
    // Sök efter knappvärdet i letters-arrayen. Kan hitta upp till tre likadan
    // bokstäver i letters.
    const index = letters.indexOf(btnValue);
    const index2 = letters.indexOf(btnValue, (index + 1));    
    const index3 = letters.indexOf(btnValue, (index2 + 1));    
    
    // Om knappvärdet inte finns i letters-arrayen läggs en del av hangman-gubben 
    // till på skärmen. Vid 6 felgissningar förlorar användaren.
    if (index == -1) {  
      guesses++;
      
      if (guesses < 7) {
        hangmanImg = `images/h${guesses}.png`
        document.querySelector('#gameBoard img').setAttribute('src', hangmanImg);  

        if (guesses == 6) {
          gameFinished(guesses);
          allButtonsOff(letterButtonEls);
          msgHolderEl.scrollIntoView();
        }  
      } 
    } else {
      // Om knappvärdet finns läggs det till bokstavsrutorna. Upp till och med
      // tre bokstäver kan läggas till samtidigt. Ifall antalet rätta gissningar är
      // lika många som antalet bokstäver i letters-arrayen vinner användaren.
      if (correctGuesses == letters.length - 1) {
        gameFinished(guesses)
        allButtonsOff(letterButtonEls);
        msgHolderEl.scrollIntoView();
      } 

      const letter = document.querySelector(`#letterBoxes li:nth-child(${index + 1})`);
      
      letter.firstChild.setAttribute('value', btnValue)
      buttonOff(e.target);      
      correctGuesses++;      

      if (index2 != -1) {
        const letter = document.querySelector(`#letterBoxes li:nth-child(${index2 + 1})`);        
        letter.firstChild.setAttribute('value', btnValue)
        correctGuesses++;        

        if (index3 != -1) {
          const letter = document.querySelector(`#letterBoxes li:nth-child(${index3 + 1})`);          
          letter.firstChild.setAttribute('value', btnValue)
          correctGuesses++;  
        }
      }
    }
  })
})


// ----------------------------------------------------------------------
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Antalet gissningar avgör vilket meddelande som visas.
function gameFinished(guesses) { 

  if (guesses == 6) {       
    document.querySelector('#msgLose').classList.remove('display-none');
    document.querySelector('#restartGameBtn').classList.remove('display-none');
    
  } else {      
    document.querySelector('#msgWin').classList.remove('display-none');
    document.querySelector('#restartGameBtn').classList.remove('display-none');
  }
}


// ---------------------------------------------------------------------
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på

// En knapp avstängd
function buttonOff(button) {
  button.setAttribute('disabled', 'true');
}

// Alla knappar avstängda
function allButtonsOff(buttons) {
  buttons.forEach(element => element.setAttribute('disabled', true));  
}

// Alla knappar påslagna
function allButtonsOn(buttons) {
  buttons.forEach(element => element.removeAttribute('disabled'));  
}


// --------------------------------------------------------------------
// Funktion för hur design på sidan ska visas.

function display() {
  // Bokstavtangenterna och hangman-bilden visas och centreras.
  document.querySelector('#gameBoard').classList.remove('display-none');
  
  document.querySelector('#gameBoard').classList.add('display-flex');

  document.querySelector('#hangman').classList.remove('display-none');
  
  if (selectedWord != undefined) {
    // Startknappen försvinner
    document.querySelector('#startGameBtn').classList.add   ('display-none');

    // Instruktionerna och välkomsttext försvinner.
    document.querySelector('article').classList.add('display-none');

  }
}


// -------------------------------------------------------------------
// När sidan laddas in visas inte bokstavstangenterna och hangman-bilden. Och 
// inte heller win/lose-elementen.

if (selectedWord == undefined) {  
  document.querySelector('#gameBoard').classList.add('display-none');
  document.querySelector('#msgLose').classList.add('display-none');
  document.querySelector('#msgWin').classList.add('display-none');
  document.querySelector('#restartGameBtn').classList.add('display-none');
}


// ---------------------------------------------------------------------
// Restart-knappen:
function restartGame() {
  selectedWord = '';
  guesses = 0;     
  correctGuesses = 0;  
  document.querySelector('#msgLose').classList.add('display-none');
  document.querySelector('#msgWin').classList.add('display-none');  
  document.querySelector('#restartGameBtn').classList.add('display-none');  
  document.querySelector('#gameBoard img').setAttribute('src', `images/h0.png`);
  allButtonsOn(letterButtonEls);
  startGame();
}