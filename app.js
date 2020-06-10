window.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementsByClassName('btn__reset')[0];
    const startScreen = document.getElementById('overlay');
    const qwerty = document.getElementById('qwerty');
    const phrase = document.getElementById('phrase');
    const letters = document.getElementsByClassName('letter');
    const tryList = document.getElementById('scoreboard').children[0];
    let missed = 0;
    const phrases = [
        'Once in a Lifetime', 
        'Burning Down the House', 
        'This Must Be the Place',
        'Road to Nowhere',
        'Psycho Killer',
        'Wild Wild LIfe',
        'And She Was',
        'Life During Wartime',
        'Flowers',
        'Crosseyed and Painless',
        'Girlfriend is Better',
        'I Zimbra',
        'Born Under Punches',
        'Heaven',
        'Slippery People',
        'Houses in Motion',
        'Cities',
        'The Great Curve',
        'Blind',
        'Found a Job',
        'Stay Up Late',
        'Making Flippy Floppy',
        'Pulled Up',
        'Swamp',
        'Artists Only',
        'Air',
        'Pull Up the Roots',
        'Seen and Not Seen',
        'Thank You for Sending Me an Angel',
    ];
    const keyRows = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ];

    //Hide Start Screen & Set Up Screen
    startButton.addEventListener('click', (e) => {
        startScreen.style.display = 'none';
        if(e.target.textContent == 'Next Round') {
            phrase.children[0].innerHTML = null;
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
        for(let i=0; i<5 - missed; i++) {
            document.getElementById('scoreboard').children[0].removeChild(document.getElementById('scoreboard').children[0].children[0]);
        }
        missed = 0;
        for(let i=0; i<5; i++) {
            let heart = document.createElement('li');
            heart.innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">';
            heart.className = 'tries';
            document.getElementById('scoreboard').children[0].appendChild(heart);
        }
    });

    //Generate Phrase To Be Guessed
    function getPhrase(phrase) {
        return phrase[Math.floor((Math.random() * phrase.length))];
    }

    let thePhrase = getPhrase(phrases);

    //Add Letters To Display
    function addToDisplay(word) {
        const ul = phrase.children[0];
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
    addToDisplay(thePhrase.toLowerCase());

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
    function getCurrentPhrase() {
        let currentPhrase = '';
        for(let i=0; i<phrase.children[0].children.length; i++) {
            currentPhrase += phrase.children[0].children[i].textContent;
        }
        return currentPhrase;
    }

    function checkWin() {
        if(document.getElementsByClassName('show').length == letters.length) {
            startScreen.className = 'win';
            startScreen.style.display = 'flex';
            startScreen.children[0].innerText = 'Victory!!!!';
            startScreen.children[1].innerText = 'The correct answer is "' + getCurrentPhrase() + ' ".';
            startButton.innerText = 'Next Round';
        }else if(missed == 5) {
            startScreen.className = 'lose';
            startScreen.style.display = 'flex';
            startScreen.children[0].innerText = 'Failure!!!!';
            startScreen.children[1].innerText = 'The correct answer is "' + getCurrentPhrase() + ' ".';
            startButton.innerText = 'Next Round';
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
});