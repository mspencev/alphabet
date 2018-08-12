

// We want to be able to iterate through the alphabet, either in order, or randomly.
// Not seeing the same letter twice until we hit the reset button.

const ALPH_LEN = 26;
let alphabet = []; // list of capital alphabet caracters
let previous = [];
let random = false;
let currentLetter = '';

let cardDiv;

//////  DOM VARIABLES
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const resetBtn = document.getElementById('reset-btn');
const randomCbSpan = document.getElementById('random-cb-span');


//  Load the association svg into the DOM
document.addEventListener('DOMContentLoaded', init);

function init() {

    alphabet = getCapitalAlphabet();

    cardDiv = document.getElementsByClassName('card')[0];

    /////  ADD LISTENERS
    prevBtn.addEventListener('click', onPrevious);
    nextBtn.addEventListener('click', onNext);
    resetBtn.addEventListener('click', onReset);
    randomCbSpan.addEventListener('click', onRandom);

    // Show the right app
    onReset();
}


const onPrevious = () => {
    let next = '';
    if(random) {
        next = nextRandom(previous)
    } else {
        next = previous.pop();
    }

    if(previous.length > 0){
        alphabet.push(next);
    }
    alphabet.sort();
    cardDiv.innerHTML = next;

    updateButtonState();
}

const onNext = () => {
    let next = '';

    if(random){
        next = nextRandom(alphabet);
    } else {
        next = alphabet.shift();
    }

    if(alphabet.length > 0) {
        previous.push(next);
    }
    cardDiv.innerHTML = next;
    currentLetter = next;
    
    updateButtonState();
}

const onReset = () => {
    alphabet = getCapitalAlphabet();
    previous = [];

    onNext();
}

const onRandom = () => {
    random = !random;
    console.log('random = ', random);
    const fa = random ? 'check-square' : 'square';
    randomCbSpan.children[0].setAttribute('data-icon', fa);
};


/**
 * Returns an upper-case alphabet array.
 */
const getCapitalAlphabet = () => {
    // Ascii 65-90 (upper), 97-122 (lower)
    const ascii = Array.from({length: ALPH_LEN}, (x,i) => i+65);
    return String.fromCharCode.apply(null, ascii).split('');
}

/**
 * Return a random letter that hasn't been seen yet
 */
const nextRandom = (letterList) => {
    const idx = Math.floor(Math.random() * 100) % letterList.length;
    return letterList.splice(idx, 1);
}

const updateButtonState = () => {
    if(alphabet.length === 0){
        nextBtn.classList.add('disabled');
    } else {
        nextBtn.classList.remove('disabled');
    }
    
    if(previous.length === 0){
        prevBtn.classList.add('disabled');
    } else {
        prevBtn.classList.remove('disabled');
    }
}