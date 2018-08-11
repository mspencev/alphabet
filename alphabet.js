

// We want to be able to iterate through the alphabet, either in order, or randomly.
// Not seeing the same letter twice until we hit the reset button.

const ALPH_LEN = 26;
let alphabet = []; // list of capital alphabet caracters
let random = false;

let cardDiv;


//  Load the association svg into the DOM
document.addEventListener('DOMContentLoaded', init);

function init() {

    alphabet = getCapitalAlphabet();

    cardDiv = document.getElementsByClassName('card')[0];

    //////  DOM VARIABLES
    const nextBtn = document.getElementById('next-btn');
    const resetBtn = document.getElementById('reset-btn');
    const randomCb = document.getElementById('random-cb');

    /////  ADD LISTENERS
    nextBtn.addEventListener('click', onNext);
    resetBtn.addEventListener('click', onReset);

    randomCb.addEventListener('change', () => {
        random = randomCb.checked;
    });

    // Show the right app
    onNext();
}

/**
 * Returns an upper-case alphabet array.
 */
const getCapitalAlphabet = () => {
    // Ascii 65-90 (upper), 97-122 (lower)
    const ascii = Array.from({length: ALPH_LEN}, (x,i) => i+65);
    return String.fromCharCode.apply(null, ascii).split('');
}

const onNext = () => {
    if(alphabet.length === 0) {
        cardDiv.innerHTML = 'End';
    } else if(random) {
        cardDiv.innerHTML = nextRandom();
    } else {
        cardDiv.innerHTML = alphabet.shift();
    }
}

const onReset = () => {
    alphabet = getCapitalAlphabet();
    onNext();
}

/**
 * Return a random letter that hasn't been seen yet
 */
const nextRandom = () => {

    const idx = Math.floor(Math.random() * 100) % alphabet.length;
    return alphabet.splice(idx, 1);
}