const screenWidth = window.screen.width;

const halK = document.getElementById('0.5k');
const quaK = document.getElementById('0.25k');
const oneT = document.getElementById('0.1k');
const halT = document.getElementById('0.05k');
const quaT = document.getElementById('0.025k');
let oneK = '';
let twoK = '';
let fivK = '';

const formVar = document.forms.donate;
const val = formVar.elements.amount;

import {burger} from './burger.js'

halK.addEventListener('click', halKAmount);
quaK.addEventListener('click', quaKAmount);
oneT.addEventListener('click', oneTAmount);
halT.addEventListener('click', halTAmount);
quaT.addEventListener('click', quaTAmount);

if (screenWidth < 640) {
    halK.checked = true;
    halKAmount();
    burger();
    }
    else if (screenWidth < 1000) {
        halK.checked = true;
        burger();
        halKAmount();
    }
        else if (screenWidth < 1600) {
            oneK = document.getElementById('1k');
            twoK = document.getElementById('2k');
            oneK.addEventListener('click', oneKAmount);
            twoK.addEventListener('click', twoKAmount);
            twoK.checked = true;
            twoKAmount();
        }
            else {
                oneK = document.getElementById('1k');
                twoK = document.getElementById('2k');
                fivK = document.getElementById('5k');
                oneK.addEventListener('click', oneKAmount);
                twoK.addEventListener('click', twoKAmount);
                fivK.addEventListener('click', fivKAmount);
                fivK.checked = true;
                fivKAmount();
                }

function halKAmount() {
    val.value = 500
}

function quaKAmount() {
    val.value = 250
}

function oneTAmount() {
    val.value = 100
}

function halTAmount() {
    val.value = 50
}

function quaTAmount() {
    val.value = 25
}

function oneKAmount() {
    val.value = 1000
}

function twoKAmount() {
    val.value = 2000
}

function fivKAmount() {
    val.value = 5000
}

window.addEventListener('change', changeDon)

function changeDon() {
    if (val.value == '5000' && screenWidth >= 1600) { fivK.checked = true }
     else if (val.value == '2000' && screenWidth >= 1000) { twoK.checked = true }
        else if (val.value == '1000' && screenWidth >= 1000) { oneK.checked = true }
            else if (val.value == '500') { halK.checked = true }
                else if (val.value == '250') { quaK.checked = true }
                    else if (val.value == '100') { oneT.checked = true }
                        else if (val.value == '50') { halT.checked = true }
                            else if (val.value == '25') { quaT.checked = true }
                                else { 
                                    quaT.checked = false
                                    halT.checked = false
                                    oneT.checked = false
                                    quaK.checked = false
                                    halK.checked = false
                                    if (screenWidth >= 1000) {oneK.checked = false }
                                    if (screenWidth >= 1000) {twoK.checked = false }
                                    if (screenWidth >= 1600) {fivK.checked = false }
                                }
}