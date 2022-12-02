const screenWidth = window.screen.width;
let animalCardCount = 6;
let testimonialCount = 4;
let testimonialInit = 0;
let animalCardInit = randomIntFromInterval(0 , animalsDescr.length)


import {burger} from './burger.js'
import {animalsDescr} from './animals.js'
import {testimonialsDescr} from './testimonials.js'

let animalCards = document.querySelector('.animalCards');
let testimonialScroll = document.querySelector('.testimonialScroll');

window.addEventListener('load', load)
function load() {
    if (screenWidth < 640) {
        animalCardCount = 4;
        testimonialCount = 3;
        burger();
    }
        else if (screenWidth > 639.5 && screenWidth < 1000) {
            animalCardCount = 4;
            testimonialCount = 3;
            burger();
            slider();
        }
            else if (screenWidth > 999.5 && screenWidth < 1600) {
                animalCardCount = 6;
                testimonialCount = 3;
                slider();
            }
                else if (screenWidth > 1599.5){
                    animalCardCount = 6;
                    testimonialCount = 4;
                    slider();
                }
    
    animalCardCreate(animalCardCount, animalCardInit)
    testimonialCreate(testimonialCount , testimonialInit);

    }

function animalCardCreate(count , pos) {

    let card = []

    for (let i = 0; i < count; i++) {

        let j = 0;
        if ( i+pos < animalsDescr.length) { j = i + pos}
         else { j = i + pos - animalsDescr.length} 

        card[i] = document.createElement('div');
        card[i].classList.add('card');
        
            let element = document.createElement('img');
            element.classList.add('imageCard');
            element.src = animalsDescr[j].source
            card[i].append(element);
            
            let textCard = document.createElement('div');
            textCard.classList.add('textCard');
            card[i].append(textCard);
        
                let elementTextCell = document.createElement('div');
                textCard.append(elementTextCell);
        
                    element = document.createElement('h4');
                    element.classList.add('titleCard');
                    element.textContent = animalsDescr[j].name;
                    elementTextCell.append(element);
            
                    element = document.createElement('p');
                    element.classList.add('descrCard');
                    element.textContent = animalsDescr[j].native;
                    elementTextCell.append(element);
        
            element = document.createElement('img');
            if (animalsDescr[j].food == 'meat') { element.classList.add('foodCardMeat')}
                else { element.classList.add('foodCardPlant') }
            element.src = animalsDescr[j].foodSource;
            textCard.append(element)
        
        animalCards.append(card[i])
    }
    animalCardInit = animalCardInit + randomIntFromInterval(animalCardCount, (animalsDescr.length - animalCardCount));
    if (animalCardInit > animalsDescr.length) {animalCardInit -= animalsDescr.length}
}

let card = [];

function testimonialCreate(count, pos) {

    for (let i=0; i < count; i++) {

        card[i] = document.createElement('div');
        card[i].classList.add('testimonialCard');

            let testimonialHead = document.createElement('div');
            testimonialHead.classList.add('testimonialHead');
            card[i].append(testimonialHead);

                let element = document.createElement('img');
                element.classList.add('testimonialUserIcon');
                element.src = testimonialsDescr[i+pos].imageSource;
                testimonialHead.append(element);

                let testimonialHeadText = document.createElement('div');
                testimonialHeadText.classList.add('testimonialHeadText');
                testimonialHead.append(testimonialHeadText);

                    element = document.createElement('div');
                    element.classList.add('testimonialUserName');
                    element.textContent = testimonialsDescr[i+pos].name;
                    testimonialHeadText.append(element);

                    element = document.createElement('div');
                    element.classList.add('testimonialUserLocation');
                    element.textContent = testimonialsDescr[i+pos].location + ' • ' + testimonialsDescr[i+pos].day;
                    testimonialHeadText.append(element);

            element = document.createElement('p');
            element.classList.add('testimonialText');
            element.textContent = testimonialsDescr[i+pos].content;
            card[i].append(element);

        testimonialScroll.append(card[i])
    }
}

function randomIntFromInterval(min, max) { 
    let i = Math.floor(Math.random() * (max - min) + min)
    return i
 }

function slider() {
    const nextBtn = document.querySelector('.rightArrow');
    const prevBtn = document.querySelector('.leftArrow');
    nextBtn.addEventListener('click', generateNewCard);
    prevBtn.addEventListener('click', generateNewCard);
}

function generateNewCard() {

    let animalCardsCell = document.querySelector('.animalCardsCell');
    setTimeout(runCard, 300)

    function runCard() {
        animalCards.remove()
        animalCards  = document.createElement('div');
        animalCards.classList.add('animalCards');
        animalCardsCell.append(animalCards);
        animalCardCreate(animalCardCount, animalCardInit)
    }
}

let testiForm = document.getElementById('testiForm')

testiForm.addEventListener('change', testSelect)

function testSelect() {
    let testimonialScrollCell = document.querySelector('.testimonialScrollCell')

    testimonialScroll.remove();
    testimonialScroll = document.createElement('div');
    testimonialScroll.classList.add('testimonialScroll');
    testimonialScrollCell.append(testimonialScroll);


    let count = testimonialCount;
    let val = Number(document.getElementById('testiForm').value);


    testimonialCreate(count, val)
}
let popupBg = document.querySelector('.popupBg')
let popup = document.querySelector('.popup')

card.forEach(function(elem, i) {
    elem.addEventListener('click', function() {
        popupStart(i)
    })
})


function popupStart(i) {
    popupBg.classList.add('popupBgactive')
    popup.classList.add('popupActive')
    let popUpCard = document.createElement('div');
    popUpCard.classList.add('testimonialCardPopup');

        let testimonialHead = document.createElement('div');
        testimonialHead.classList.add('testimonialHeadPopup');
        popUpCard.append(testimonialHead);

            let element = document.createElement('img');
            element.classList.add('testimonialUserIconPopup');
            element.src = testimonialsDescr[i].imageSource;
            testimonialHead.append(element);

            let testimonialHeadText = document.createElement('div');
            testimonialHeadText.classList.add('testimonialHeadTextPopup');
            testimonialHead.append(testimonialHeadText);

                element = document.createElement('div');
                element.classList.add('testimonialUserNamePopup');
                element.textContent = testimonialsDescr[i].name;
                testimonialHeadText.append(element);

                element = document.createElement('div');
                element.classList.add('testimonialUserLocationPopup');
                element.textContent = testimonialsDescr[i].location + ' • ' + testimonialsDescr[i].day;
                testimonialHeadText.append(element);

        element = document.createElement('p');
        element.classList.add('testimonialTextPopup');
        element.textContent = testimonialsDescr[i].content;
        popUpCard.append(element);

        popup.append(popUpCard)
        let imgElement = document.createElement('img');
        imgElement.classList.add('popupImg');
        popup.append(imgElement);

    document.addEventListener('click', (el) => {
        if (el.target == popupBg || el.target == imgElement) {
            popupBg.classList.remove('popupBgactive')
            popup.classList.remove('popupActive')
            popUpCard.remove();
            imgElement.remove();
        }
    })
}

