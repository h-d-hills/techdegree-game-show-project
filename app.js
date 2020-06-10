const startButton = document.getElementsByClassName('btn__reset')[0];
const startScreen = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const letters = document.getElementsByClassName('letter');
const tryList = document.getElementById('scoreboard').children[0];
let missed = 0;
const phrases = [
    'once in a lifetime', 
    'burning down the house', 
    'this must be the place',
    'road to nowhere',
    'psycho killer'
];
const keyRows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

//Hide Start Screen
startButton.addEventListener('click', (e) => {
    startScreen.style.display = 'none';
    if(e.target.textContent == 'Reset Game') {
        document.getElementById('phrase').children[0].innerHTML = null;
        addToDisplay(getPhrase(phrases));
        for(let i=0; i<qwerty.children.length; i++) {
            document.getElementsByClassName('keyrow')[i].innerHTML = null;
        }
    }
    for(let i=0; i<qwerty.children.length; i++){
        for(let j=0; j<keyRows[i].length; j++) {
            let button = document.createElement('button');
            button.textContent = keyRows[i][j];
            document.getElementsByClassName('keyrow')[i].appendChild(button);
        }
    }
});

//Generate Phrase To Be Guessed
function getPhrase(phrase) {
    return phrase[Math.floor((Math.random() * phrase.length))];
}

//Add Letters To Display
function addToDisplay(word) {
    const ul = document.getElementById('phrase').children[0];
    for(let i=0; i<word.length; i++) {
        const li = document.createElement('li');
        li.textContent = word[i].toLowerCase();
        if (word[i] !== ' ') {
            li.className = 'letter';
        }else{
            li.className = 'space';
        }
        ul.appendChild(li);
    }
}
addToDisplay(getPhrase(phrases));

//Check Letter Guesses
function checkLetter(letter) {
    let goodLetter;
    for(let i=0; i<letters.length; i++) {
        if(letters[i].textContent == letter) {
            letters[i].classList.add('show');
            letters[i].style.transition = '0.5s';
            goodLetter = letter;
        }
    }
    if (goodLetter === letter) {
        return goodLetter;
    }else{
        return null;
    }
}

//Check Win Or Lose
function checkWin() {
    if(document.getElementsByClassName('show').length == letters.length) {
        startScreen.className = 'win';
        startScreen.style.display = 'flex';
        startScreen.children[0].innerText = 'Congratulations!';
        startScreen.children[1].innerText = 'You have won the game!';
        startButton.innerText = 'Reset Game';
    }else if(missed == 5) {
        startScreen.className = 'lose';
        startScreen.style.display = 'flex';
        startScreen.children[0].innerText = 'Failure!';
        startScreen.children[1].innerText = 'I could not be more displeased. You will pay greatly for your sin.';
        startButton.innerText = 'Reset Game';
    }
}

//Keyboard Event Listeners
qwerty.addEventListener('click', (e) => {
    if(e.target.tagName == 'BUTTON') {
        let letterFound = checkLetter(e.target.textContent);
        e.target.className = 'chosen';
        e.target.disabled = true;
        if(letterFound == null) {
            missed++;
            tryList.removeChild(tryList.children[tryList.children.length - 1]);
        }
        checkWin();
    } 
});