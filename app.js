const startButton = document.getElementsByClassName('btn__reset')[0];
const startScreen = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const letters = document.getElementsByClassName('letter');
let missed = 0;
const phrases = [
    'once in a lifetime', 
    'burning down the house', 
    'this must be the place',
    'road to nowhere',
    'psycho killer'
];

//Hide Start Screen
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
});

//Generate Phrase To Be Guessed
function getPhrase(phrase) {
    return phrase[Math.floor((Math.random() * phrase.length))];
}
const guessPhrase = getPhrase(phrases);

//Add Letters To Display
function addToDisplay(word) {
    const ul = document.getElementById('phrase').children[0];
    for(let i=0; i<word.length; i++) {
        const li = document.createElement('li');
        li.textContent = word[i].toLowerCase();
        if (word[i] !== ' ') {
            li.className = 'letter';
        }
        ul.appendChild(li);
    }
}
addToDisplay(guessPhrase);

//Check Letter Guesses
function checkLetter(letter) {
    let goodLetter;
    for(let i=0; i<letters.length; i++) {
        if(letters[i].textContent == letter) {
            letters[i].classList.add('show');
            goodLetter = letter;
        }
    }
    if (goodLetter === letter) {
        return goodLetter;
    }else{
        return null;
    }
}

//Keyboard Event Listeners