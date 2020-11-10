// Globala variabler

// Array: med spelets alla ord
const wordList = ['dinosaurs', 'duck']; 
// , 'lavish', 'duck', 'political', 'squash', 'page', 'place', 'silky', 'quick', 'bustling', 'veil', 'steel'

// Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let selectedWord;    


let guesses = 0;     // Number: håller antalet gissningar som gjorts
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över

// DOM-nod: knappen som du startar spelet med
let startGameBtnEl = document.querySelector('#startGameBtn');
startGameBtnEl.addEventListener('click', startGame);


// Array av DOM-noder: Knapparna för bokstäverna
let letterButtonEls = document.querySelectorAll('#gameBoard .btn');




// Array av DOM-noder: Rutorna där bokstäverna ska stå
let letterBoxEls = document.querySelector('#letterBoxes > ul');


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
  const removeEl = document.querySelectorAll('#letterBoxes li');  

  // Remove old word
  for (let i = 0; i < removeEl.length; i++) {
    letterBoxEls.removeChild(removeEl[i]);    
  }  
  
  // Set a new word
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
    const btnValue = e.target.value;    
    // console.log(btnValue)

    

    const selectedUpper = selectedWord.toUpperCase();
    const letters = selectedUpper.split('');
    // console.log(letters)    
    const index = letters.indexOf(btnValue);
    const index2 = letters.indexOf(btnValue, (index + 1));    
    const index3 = letters.indexOf(btnValue, (index2 + 1));    
    // console.log(index2)

    if (index == -1) {
      // console.log('Wrong letter!')
      if (guesses < 6) {
        guesses++;
        hangmanImg = `images/h${guesses}.png`
        document.querySelector('#gameBoard img').setAttribute('src', hangmanImg);
        console.log(hangmanImg)
      } else {
        console.log('You loose!');
      }
      
    } else {
      // debugger
      const letter = document.querySelector(`#letterBoxes li:nth-child(${index + 1})`);
      // console.log(letter)
      letter.firstChild.setAttribute('value', btnValue)
      buttonOff(e.target);
      
      if (index2 != -1) {
        const letter = document.querySelector(`#letterBoxes li:nth-child(${index2 + 1})`);
        console.log(letter)
        letter.firstChild.setAttribute('value', btnValue)

        if (index3 != -1) {
          const letter = document.querySelector(`#letterBoxes li:nth-child(${index3 + 1})`);
          console.log(letter)
          letter.firstChild.setAttribute('value', btnValue)
        }
      }
    }
  })
})



// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på

function buttonOff(button) {
  button.setAttribute('disabled', 'true');
}