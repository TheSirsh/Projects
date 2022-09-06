import ancients from '../assets/Ancients/index.js'
import buttons from '../script/buttons.js'
import cardsBlue from '../assets/MythicCards/blue/index.js'
import cardsBrown from '../assets/MythicCards/brown/index.js'
import cardsGreen from '../assets/MythicCards/green/index.js'

const ancientsBox = document.querySelector('.ancientsBox')
const settingAncient = document.querySelector('.settingAncient');
let TheDifficulty = ''

let ancientsArr = []
let text = []
let blueSt = 0;
let blueNd = 0;
let blueRd = 0;
let brownSt = 0;
let brownNd = 0;
let brownRd = 0;
let greenSt = 0;
let greenNd = 0;
let greenRd = 0;

for (let i=0; i<ancients.length; i++) {
    let ancientCell = document.createElement('div')
    ancientCell.classList.add('ancientCell');
    ancientsArr[i] = document.createElement('div');
    ancientsArr[i].classList.add('ancientCard');
    ancientsArr[i].classList.add('inactive');
    ancientsArr[i].style.backgroundImage = 'url(' + ancients[i].imgSource + ')';
    text[i] = document.createElement('span')
    text[i].classList.add('ancientName')
    text[i].classList.add('inactive');
    text[i].textContent = ancients[i].ancientName
    ancientCell.append(ancientsArr[i])
    ancientCell.append(text[i])
    ancientsBox.append(ancientCell)
}


ancientsBox.addEventListener('click', chosenAncient);

const stage1 = document.querySelector('.stage1')
const stage2 = document.querySelector('.stage2')
const stage3 = document.querySelector('.stage3')
const difficult = document.querySelector('.difficult')
const bl1 = document.querySelector('.bl1');
const bl2 = document.querySelector('.bl2');
const bl3 = document.querySelector('.bl3');
const br1 = document.querySelector('.br1');
const br2 = document.querySelector('.br2');
const br3 = document.querySelector('.br3');
const gr1 = document.querySelector('.gr1');
const gr2 = document.querySelector('.gr2');
const gr3 = document.querySelector('.gr3');


function chosenAncient(elem) {
    let i = ancientsArr.indexOf(elem.target)
    text[i].classList.remove('inactive');
    text[i].classList.add('active');
    ancientsArr[i].classList.remove('inactive');
    ancientsArr[i].classList.add('active');
    settingAncient.classList.remove('inactive');
    settingAncient.textContent = 'Ваш Древний - ' + ancients[i].ancientName;
    blueSt = ancients[i].blue1;
    blueNd = ancients[i].blue2;
    blueRd = ancients[i].blue3;
    brownSt = ancients[i].brown1;
    brownNd = ancients[i].brown2;
    brownRd = ancients[i].brown3;
    greenSt = ancients[i].green1;
    greenNd = ancients[i].green2;
    greenRd = ancients[i].green3;
    bl1.textContent = blueSt;
    bl2.textContent = blueNd;
    bl3.textContent = blueRd;
    br1.textContent = brownSt;
    br2.textContent = brownNd;
    br3.textContent = brownRd;
    gr1.textContent = greenSt;
    gr2.textContent = greenNd;
    gr3.textContent = greenRd;

    settingAncient.classList.add('active');
    stage1.classList.add('hide');
    stage2.classList.remove('hide')
    difficult.classList.remove('hide')
    ancientsBox.removeEventListener('click', chosenAncient)
}

let difBtn = []

for (let i=0; i<buttons.length; i++) {
    let button = document.createElement('button')
    button.classList.add('btn')
    difBtn[i]= button;
    difBtn[i].textContent = buttons[i].buttontName
    difficult.append(difBtn[i])
}
const settingDiffuculty = document.querySelector('.settingDiffuculty')
difficult.addEventListener('click', chouseDifficult);


function chouseDifficult(elem) {
    let i = difBtn.indexOf(elem.target);
    TheDifficulty = buttons[i].difficulty;
    difficult.classList.add('hide');
    settingDiffuculty.classList.remove('inactive');
    settingDiffuculty.classList.add('active');
    settingDiffuculty.textContent = 'Ваш уровень сложность - ' + buttons[i].buttontName
    stage2.classList.add('hide')
    stage3.classList.remove('hide')
    difficult.removeEventListener('click', chouseDifficult)
}

const cardBg = document.querySelector('.cardBackground');
const cards1 = document.querySelector('.cards1');
const cards2 = document.querySelector('.cards2');
const cards3 = document.querySelector('.cards3');

function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

cardBg.addEventListener('click', setUpDeck1);
let cardDeck = [];
const settingDeck = document.querySelector('.settingDeck');

function removeCard() {
if (TheDifficulty === 'veryEasy') {
    cardsBlue.splice(3,9);
    cardsGreen.splice(13,5);
    cardsBrown.splice(16,5);
    return
}
if (TheDifficulty === 'easy') {
    cardsBlue.splice(8,4);
    cardsGreen.splice(13,5);
    cardsBrown.splice(16,5);
    return
}
if (TheDifficulty === 'hard'){
    cardsBlue.splice(0,4);
    cardsGreen.splice(0,5);
    cardsBrown.splice(0,5);
    return
}
if (TheDifficulty === 'veryHard'){
    cardsBlue.splice(0,7);
    cardsGreen.splice(0,5);
    cardsBrown.splice(0,5);
    return
}
}

let cardCounterBlue = 0

function firstBlue(bl, k) {
    for (let i=0; i<bl; i++) {
        let j= randomIntFromInterval(0, (cardsBlue.length-1));

        if (TheDifficulty === 'veryEasy'  && cardCounterBlue <  4) {
            while (cardsBlue[j].type == 'normal') { j= randomIntFromInterval(0, (cardsBlue.length-1-cardCounterBlue))}
            cardCounterBlue++;
        }
        if (TheDifficulty === 'veryHard'  && cardCounterBlue <  4) {
            while (cardsBlue[j].type == 'normal') { j= randomIntFromInterval(cardCounterBlue, (cardsBlue.length-1))}
            cardCounterBlue++;
        }
        
        cardDeck[i] = cardsBlue[j];
        let cardCell = document.createElement('div');
        cardCell.classList.add('cardCell');
        let cardImg = document.createElement('div');
        cardImg.classList.add('cardImg');
        cardImg.style.background = 'url(' + cardsBlue[j].imgSrc + ')';
        cardImg.classList.add('blue');
        let cardName = document.createElement('span');
        cardName.classList.add('cardName');
        cardName.textContent = cardsBlue[j].cardName;
        cardsBlue.splice(j,1);
        cardCell.append(cardImg);
        cardCell.append(cardName);
        if (k==1) {
            cards1.append(cardCell)
            bl1.textContent = blueSt-i-1;
        }
        if (k==2) {
            cards2.append(cardCell)
            bl2.textContent = blueNd-i-1;
        }
        if (k==3) {
            cards3.append(cardCell)
            bl3.textContent = blueRd-i-1;
        }
    }
}
let cardCounterBrown = 0

function firstBrown(bl, br, k) {
    for (let i=bl; i<(bl+br); i++) {
        let j= randomIntFromInterval(0, (cardsBrown.length-1));

        if (TheDifficulty === 'veryEasy'  && cardCounterBrown <  5) {
            while (cardsBrown[j].type == 'normal') { j= randomIntFromInterval(0, (cardsBrown.length-1-cardCounterBrown))}
            cardCounterBrown++;
        }
        if (TheDifficulty === 'veryHard'  && cardCounterBrown <  5) {
            while (cardsBrown[j].type == 'normal') { j= randomIntFromInterval(cardCounterBrown, (cardsBrown.length-1))}
            cardCounterBrown++;
        }

        cardDeck[i] = cardsBrown[j];
        let cardCell = document.createElement('div')
        cardCell.classList.add('cardCell');
        let cardImg = document.createElement('div');
        cardImg.classList.add('cardImg');
        cardImg.style.background = 'url(' + cardsBrown[j].imgSrc + ')';
        cardImg.classList.add('brown');
        let cardName = document.createElement('span');
        cardName.classList.add('cardName');
        cardName.textContent = cardsBrown[j].cardName;
        cardsBrown.splice(j,1);
        cardCell.append(cardImg);
        cardCell.append(cardName);
        if (k==1) {
            cards1.append(cardCell)
            br1.textContent = brownSt-i-1+bl;
        }
        if (k==2) {
            cards2.append(cardCell)
            br2.textContent = brownNd-i-1+bl;
        }
        if (k==3) {
            cards3.append(cardCell)
            br3.textContent = brownRd-i-1+bl;
        }
}}

let cardCounterGreen = 0

function firstGreen(bl, br, gr, k) {
    for (let i=(bl+br); i<(bl+br+gr); i++) {
        let j= randomIntFromInterval(0, (cardsGreen.length-1));

        if (TheDifficulty === 'veryEasy' && cardCounterGreen < 5) {
            while (cardsGreen[j].type == 'normal') { j= randomIntFromInterval(0, (cardsGreen.length-1-cardCounterGreen))}
            cardCounterGreen++;
        }   
        if (TheDifficulty === 'veryHard'  && cardCounterGreen <  5) {
            while (cardsGreen[j].type == 'normal') { j= randomIntFromInterval(cardCounterGreen, (cardsGreen.length-1))}
            cardCounterGreen++;
        }

        cardDeck[i] = cardsGreen[j];
        let cardCell = document.createElement('div');
        cardCell.classList.add('cardCell');
        let cardImg = document.createElement('div');
        cardImg.classList.add('cardImg');
        cardImg.style.background = 'url(' + cardsGreen[j].imgSrc + ')';
        cardImg.classList.add('green');
        let cardName = document.createElement('span');
        cardName.classList.add('cardName');
        cardName.textContent = cardsGreen[j].cardName;
        cardsGreen.splice(j,1);
        cardCell.append(cardImg);
        cardCell.append(cardName);
        if (k==1) {
            cards1.append(cardCell)
            gr1.textContent = greenSt-i-1+bl+br;
        }
        if (k==2) {
            cards2.append(cardCell)
            gr2.textContent = greenNd-i-1+bl+br;
        }
        if (k==3) {
            cards3.append(cardCell)
            gr3.textContent = greenRd-i-1+bl+br;
        }
}}

function setUpDeck1() {
    let bl = blueSt
    let br = brownSt
    let gr = greenSt
    settingDeck.classList.remove('inactive')
    settingDeck.textContent = 'Колода замешивается - прогресс 1/3'

    removeCard();
    firstBlue(bl, 1);
    firstBrown(bl, br, 1);
    firstGreen(bl, br, gr, 1);

    cardBg.removeEventListener('click', setUpDeck1)
    cardBg.addEventListener('click', setUpDeck2);

}

function setUpDeck2() {
    let bl = blueNd
    let br = brownNd
    let gr = greenNd
    settingDeck.textContent = 'Колода замешивается - прогресс 2/3'

    firstBlue(bl, 2) 
    firstBrown(bl, br, 2)
    firstGreen(bl, br, gr, 2)

    cardBg.removeEventListener('click', setUpDeck2)
    cardBg.addEventListener('click', setUpDeck3);
}



function setUpDeck3() {
    let bl = blueRd
    let br = brownRd
    let gr = greenRd
    settingDeck.textContent = 'Колода замешана'

    firstBlue(bl, 3) 
    firstBrown(bl, br, 3)
    firstGreen(bl, br, gr, 3)

    cardBg.classList.add('inactive');
    cardBg.removeEventListener('click', setUpDeck3);
    stage3.classList.add('hide')
    stage4.classList.remove('hide')
    btnFinal.addEventListener('click', deckFinal);
}

const cards = document.querySelector('.cards');
const stage4 = document.querySelector('.stage4');
const stage5 = document.querySelector('.stage5');
const settingFinal = document.querySelector('.settingFinal');
const btnFinal = document.querySelector('.btnFinal');
const settingItsDone = document.querySelector('.settingItsDone');

function deckFinal() {
    settingFinal.classList.remove('inactive')
    settingFinal.textContent = 'Колода сложена'
    cards.classList.add('hide')
    stage4.classList.add('hide')
    stage5.classList.remove('hide')
    settingItsDone.classList.remove('hide')
}
