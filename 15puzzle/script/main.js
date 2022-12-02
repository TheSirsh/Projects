import {timeConvert} from './timeConvert.js'

let gameSize = Number;
let moveValue = 0;
let emptyCell = Number;
let soundMove = new Audio('../assets/soundMove.mp3');
let soundWrong = new Audio('../assets/soundWrong.mp3');
let soundWin = new Audio('../assets/soundWin.mp3');
let soundClick = new Audio('../assets/soundClick.mp3');
let soundCreate = new Audio('../assets/soundCreate.mp3');
let body = document.querySelector('.body');
let isVin = false;
let isMute = true;
let isPause = true;
let isDrop = true;
let currentTime = 0;
let timer = 0;
let numberCell = [];
let textNumber =[];


let header = document.createElement('header');
header.classList.add('header');
body.append(header);

    let nav = document.createElement('nav');
    nav.classList.add('nav');
    header.append(nav);

        let ul = document.createElement('ul');
        ul.classList.add('ul');
        nav.append(ul);

for (let i = 0; i < 4; i++) {
    let li = document.createElement('li')
    li.classList.add('li')
    if (i == 0) { 
        li.textContent = 'Shuffle and start';
        li.classList.add('shuffleBtn');
    }   else if  (i == 1) { 
            li.textContent = 'Pause';
            li.classList.add('pauseTimer');
            li.classList.add('redBtn');
        }   else if  (i == 2) { 
                li.textContent = 'Save';
                li.classList.add('saveButton');
            }    else if  (i == 3) { 
                    li.textContent = 'Results';
                    li.classList.add('results');
                }
    ul.append(li);
}

let results = document.querySelector('.results');
results.addEventListener('click', popupResults);

function popupResults() {
    let popupBg = document.createElement('div');
    let resLoad = JSON.parse(localStorage.getItem('result'))
    popupBg.classList.add('popupBg');
    body.append(popupBg);

        let popup = document.createElement('div');
        popup.classList.add('popup')
        popupBg.append(popup)

        for (let i = 0; i < 33; i++) {
            let gridCell = document.createElement('div')
                if (i == 0) {
                    gridCell.textContent = 'Number';
                    gridCell.classList.add('gridCellTitle')
                }   else if (i == 1) { 
                        gridCell.textContent = 'Moves'
                        gridCell.classList.add('gridCellTitle')
                    }   else if ( i == 2 ) {
                            gridCell.textContent = 'Time'
                            gridCell.classList.add('gridCellTitle')
                        }   else if (i % 3 == 0) {
                                gridCell.textContent = i/3
                                gridCell.classList.add('gridCell')
                            }   else if (i % 3 == 1) {
                                    if (resLoad == null || resLoad[Math.floor(i/3-1)] == null) { gridCell.textContent = 0 }
                                        else { gridCell.textContent = resLoad[Math.floor(i/3-1)].moves}
                                    gridCell.classList.add('gridCell')
                                }   else if (i % 3 == 2) {
                                        if (resLoad == null || resLoad[Math.floor(i/3-1)] == null) { gridCell.textContent = 0 }
                                            else { gridCell.textContent = resLoad[Math.floor(i/3-1)].time}
                                        gridCell.classList.add('gridCell')
                                }
                    popup.append(gridCell)
        }
    popupBg.addEventListener('click', () => popupBg.remove())
}

let pauseTimer = document.querySelector('.pauseTimer');
pauseTimer.addEventListener('click', timerFunc);

function timerFunc() {
    if (isPause == true) {
        isPause = false;
        timer = currentTime;
        pauseTimer.textContent = 'Play';
        pauseTimer.classList.add('greenBtn');
        pauseTimer.classList.remove('redBtn');
    } else {
        isPause = true;
        currentTime = timer;
        pauseTimer.textContent = 'Pause';
        pauseTimer.classList.add('redBtn');
        pauseTimer.classList.remove('greenBtn');
    }
}

let saveButton = document.querySelector('.saveButton')
saveButton.addEventListener('click', saveProgress)

function saveProgress() {
    localStorage.setItem('saveProgress', true);
    localStorage.setItem('gameSize', gameSize);
    localStorage.setItem('moves', moveValue);
    localStorage.setItem('time', timer);
    for (let i = 0; i < gameSize * gameSize; i++) {
        if (textNumber[i].textContent == '') {
            localStorage.setItem(`save${i}`, 0)
        }   else {
                localStorage.setItem(`save${i}`, textNumber[i].textContent)
            }
    }
}

let stat = document.createElement('div');
stat.classList.add('stat');
body.append(stat);

    let moves = document.createElement('div');
    moves.classList.add('moves');
    moves.textContent = 'Moves: ' + moveValue
    stat.append(moves);

    let playTime = document.createElement('div');
    playTime.classList.add('playTime');
    playTime.textContent = timeConvert(timer)
    stat.append(playTime)


let game = document.createElement('section');
game.classList.add('game');
body.append(game);

let field = document.createElement('div');
field.classList.add('field');

getLocalStorage()

function setGrid() {
    field.classList.remove('fieldThree');
    field.classList.remove('fieldFour');
    field.classList.remove('fieldFive');
    field.classList.remove('fieldSix');
    field.classList.remove('fieldSeven');
    field.classList.remove('fieldEight');
    if (gameSize == 3) { field.classList.add('fieldThree')}
        else if (gameSize == 4) { field.classList.add('fieldFour')}
            else if (gameSize == 5) { field.classList.add('fieldFive')}
                else if (gameSize == 6) { field.classList.add('fieldSix')}
                    else if (gameSize == 7) { field.classList.add('fieldSeven')}
                        else { field.classList.add('fieldEight')}
}

game.append(field);

function getLocalStorage() {
    if (localStorage.getItem('saveProgress') === 'true') {
        gameSize =  localStorage.getItem('gameSize');
        moveValue = localStorage.getItem('moves');
        moves.textContent = 'Moves: ' + moveValue;
        playTime.textContent = timeConvert(timer);
        timer = localStorage.getItem('time');
        currentTime = localStorage.getItem('time');
            for (let  i = 0; i < gameSize * gameSize; i++) {
                if  (localStorage.getItem(`save${i}`) == 0) { numberCell[i] = ''}
                numberCell[i] = localStorage.getItem(`save${i}`)
            }
    } else {
        gameSize = 4
        setCell();
        shuffle(numberCell);
        checkGame();
    }
    setGrid();
}

function setCell(){
    for (let i = 0; i < gameSize * gameSize; i++) {
        numberCell[i] = i
    }
}

let frameSize = document.createElement('div');
frameSize.classList.add('frameSize');
frameSize.textContent = 'Frame size: ' + gameSize + ' x ' + gameSize;
stat.append(frameSize);

function checkGame() {
    let count = 0;
    let emptyCellNum = 0;
    
        for (let i = 0; i < numberCell.length; i++) {
            for (let j=i+1; j < numberCell.length; j++) {
                if (numberCell[i] == 0) {
                    emptyCellNum = i + 1;
                }
                    else if (numberCell[i] > numberCell[j] && numberCell[j] != 0) {
                        count++;
                }
            }
        }
        if (emptyCellNum == 0) (emptyCellNum = gameSize * gameSize)
        if (((gameSize % 2 == 1) && (count % 2 == 1)) || ((gameSize % 2 == 0) && ((Math.ceil(emptyCellNum / gameSize) + +count)  % 2 == 1)))
        {   
            if (numberCell[0] == 0) {
                count = numberCell[1];
                numberCell[1] = numberCell[2];
                numberCell[2] = count;
            } else if (numberCell[1] == 0 ) {
                count = numberCell[0];
                numberCell[0] = numberCell[2];
                numberCell[2] = count;
            } else {
                count = numberCell[0];
                numberCell[0] = numberCell[1];
                numberCell[1] = count;
                }

        }
    }

let cards = [];
genCard();

function genCard() {
    cards.splice(0, 64)

    for (let i=0; i < gameSize * gameSize; i++) {
        cards[i] = document.createElement('div')
        if (gameSize > 6) {
            cards[i].classList.add('cellMin');
            cards[i].classList.remove('cell');
        } else {
            cards[i].classList.add('cell');
            cards[i].classList.remove('cellMin');
        }
        cards[i].classList.add(`${i}`);
        
        field.append(cards[i]);
        textNumber[i] = document.createElement('span');
        textNumber[i].classList.add('textNumber');
        cards[i].append(textNumber[i]);

        if (numberCell[i] == 0) { 
            cards[i].classList.add('empty');
            textNumber[i].textContent = '';
            emptyCell = i;
        }
            else { textNumber[i].textContent = numberCell[i] }
        changeColor()
    }
}

let hint = document.createElement('div');
hint.classList.add('hint');
body.append(hint);

   
// Sound Button
let soundButton = document.createElement('div');
soundButton.classList.add('soundButton');
if (isMute) {
    soundButton.textContent = 'Sound: Off';
    soundButton.classList.add('redBtn');
} else {
    soundButton.textContent = 'Sound: On';
    soundButton.classList.add('greenBtn');
}
hint.append(soundButton);

soundButton.addEventListener('click', toogleSound);

function toogleSound() {
    if (isMute == true) {
        soundClick.play();
        soundButton.textContent = 'Sound: On';
        soundButton.classList.add('greenBtn');
        soundButton.classList.remove('redBtn');
        isMute = false;
    } else {
        isMute = true;
        soundButton.textContent = 'Sound: Off';
        soundButton.classList.remove('greenBtn');
        soundButton.classList.add('redBtn');
    }
}

// Drag'n'Drop Button
let dragNdropBtn = document.createElement('div');
dragNdropBtn.classList.add('dragNdropBtn');
toogleDrop()
hint.append(dragNdropBtn);

dragNdropBtn.addEventListener('click', toogleDrop)

function toogleDrop() {
    if (isDrop == false) {
        isDrop = true;
        dragNdropBtn.textContent = 'Drag and drop: On'
        dragNdropBtn.classList.add('greenBtn')
        dragNdropBtn.classList.remove('redBtn')
    } else {
        isDrop = false;
        dragNdropBtn.textContent = 'Drag and drop: Off'
        dragNdropBtn.classList.add('redBtn')
        dragNdropBtn.classList.remove('greenBtn')
    }
}


let changeSize = document.createElement('div');
changeSize.classList.add('changeSize');
    let changeSizeText = document.createElement('span');
    changeSizeText.classList.add('changeSizeText')
    changeSizeText.textContent = 'Other size: '
changeSize.append(changeSizeText);




let changeSizeNumber = [];
createChangers();

function createChangers() {
    for (let i = 3; i < 9; i++) {
        changeSizeNumber[i] = document.createElement('div');
        changeSizeNumber[i].textContent = i + 'x' + i;
        if (i != gameSize) {
            changeSizeNumber[i].classList.add('changeSizeNumber')
            changeSizeNumber[i].classList.remove('changeSizeNumberCurrent')
        } else {
            changeSizeNumber[i].classList.add('changeSizeNumberCurrent')
            changeSizeNumber[i].classList.remove('changeSizeNumber')
        }
        changeSize.append(changeSizeNumber[i]);
    }
}

body.append(changeSize);

changeSizeNumber.forEach(function(elem, i) {
    elem.addEventListener('click', function() {
        size(i)
    })
})

function size(i) {
    numberCell.splice(0, numberCell.length)
    changeSizeNumber[gameSize].classList.add('changeSizeNumber')
    changeSizeNumber[gameSize].classList.remove('changeSizeNumberCurrent')
    changeSizeNumber[i].classList.add('changeSizeNumberCurrent')
    changeSizeNumber[i].classList.remove('changeSizeNumber')
    gameSize = i;
    frameSize.textContent = 'Frame size: ' + gameSize + ' x ' + gameSize;
    setCell();
    resetGame();
    setGrid();
}

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}

function gamePlay() {
    cards.forEach(function(elem, i) {
        elem.addEventListener('mousedown', function() {
            cellDrag(elem, i)
        })
        elem.addEventListener('click', function() {
            changeCell(i)
        })
    }
)}



function changeCell(i) {
    if (isDrop == true) {return}
    if (isPause == true) {timerFunc()}
    
    if (i == emptyCell - gameSize) {
        cards[emptyCell].classList.remove('empty');
        cards[emptyCell].classList.add('downToUpCell')
        textNumber[emptyCell].textContent = textNumber[emptyCell - gameSize].textContent;
        cards[emptyCell - gameSize].classList.add('empty');
        textNumber[emptyCell - gameSize].textContent = '';
        emptyCell = emptyCell- gameSize;
        if (isMute == false) { soundMove.play()}
        moveValue++;
        moves.textContent = 'Moves: ' + moveValue;

        } else if (i == emptyCell + +gameSize) {
            cards[emptyCell].classList.remove('empty');
            cards[emptyCell].classList.add('upToDownCell')
            textNumber[emptyCell].textContent = textNumber[emptyCell + +gameSize].textContent;
            cards[emptyCell + +gameSize].classList.add('empty');
            textNumber[emptyCell + +gameSize].textContent = '';
            emptyCell = emptyCell + +gameSize;
            if (isMute == false) { soundMove.play()}
            moveValue++;
            moves.textContent = 'Moves: ' + moveValue;

            } else if (i == emptyCell + 1) {
                cards[emptyCell].classList.remove('empty');
                cards[emptyCell].classList.add('leftToRightCell');
                textNumber[emptyCell].textContent = textNumber[emptyCell + 1].textContent;
                cards[emptyCell + 1].classList.add('empty');
                textNumber[emptyCell + 1].textContent = '';
                emptyCell = emptyCell + 1;
                if (isMute == false) { soundMove.play()};
                moveValue++;
                moves.textContent = 'Moves: ' + moveValue;

                } else if (i == emptyCell - 1) {
                    cards[emptyCell].classList.remove('empty')
                    cards[emptyCell].classList.add('rightToLeftCell');
                    textNumber[emptyCell].textContent = textNumber[emptyCell - 1].textContent;
                    cards[emptyCell - 1].classList.add('empty');
                    textNumber[emptyCell - 1].textContent = '';
                    emptyCell = emptyCell - 1;
                    if (isMute == false) { soundMove.play()};
                    moveValue++;
                    moves.textContent = 'Moves: ' + moveValue;

                    } else if (isMute == false) { soundWrong.play()}
    setTimeout(changeColor, 350)
}

function changeColor() {
    let vinCheck = 0
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('downToUpCell');
        cards[i].classList.remove('upToDownCell');
        cards[i].classList.remove('leftToRightCell');
        cards[i].classList.remove('rightToLeftCell');
    if (textNumber[i].textContent == i+1) {
            cards[i].classList.remove('red')
            cards[i].classList.add('green')
            vinCheck++;
        } else {
            cards[i].classList.remove('green')
            cards[i].classList.add('red')
        }
    }
    if ( vinCheck == gameSize * gameSize - 1) {
        if (isVin == false) {
            isVin = true
            localStorage.setItem('saveProgress', false);
            if (isMute == false) { soundWin.play()}
            isPause = true
            let res = {
                time: timer,
                moves: moveValue
            }
            let resArray = []
            if (JSON.parse(localStorage.getItem('result')) != null) {
                resArray = JSON.parse(localStorage.getItem('result'))
            }
    
            resArray.push(res)
    
            resArray.sort((a,b) => a.moves - b.moves);
            
            localStorage.setItem('result', JSON.stringify(resArray))
            popupVin()
        }
    }
}

// Win PopUp
function popupVin() {
    let popupBg = document.createElement('div');
    popupBg.classList.add('popupBg');
    body.append(popupBg);

        let popupMes = document.createElement('div')
        popupMes.classList.add('popupMes')
        popupMes.textContent = 'Hooray! You solved the puzzle in ' + timeConvert(timer) + ' and ' + moveValue + ' moves!';
        popupBg.append(popupMes)

        popupBg.addEventListener('click', () => popupBg.remove())
}

let shuffleBtn = document.querySelector('.shuffleBtn');
shuffleBtn.addEventListener('click', resetGame)

function resetGame() {
    if (isMute == false) { soundClick.play()}
    field.remove();
    moveValue = 0;
    moves.textContent = 'Moves: ' + moveValue;
    shuffle(numberCell);
    checkGame();
    field = document.createElement('div');
    field.classList.add('field');
    setGrid()
    game.append(field);
    genCard();
    if (isMute == false) { soundCreate.play()}
    cards.forEach(function(elem, i) {
        elem.addEventListener('click', function() {
            changeCell(i)
        })
    })
    timer = 0;
    gamePlay()
}

setInterval(updateTimer, 1000);
function updateTimer() {
    playTime.textContent = timeConvert(timer)
    if (isPause == false) {
        timer++;
        }
}

gamePlay()

// Drag'n'drop
function cellDrag(elem, i) {
    if (isDrop == false) {return}
        if ((i == emptyCell - gameSize) || (i == emptyCell - 1) || (i == emptyCell + 1) || (i == emptyCell + +gameSize)) {

            tr(event)

            function tr(event) {
                if (isPause == true) {timerFunc()}
                let sizeCell = ''

                cards[i].classList.add('drag')
                if (document.getElementsByClassName('cell')[0] == undefined) {
                     sizeCell = document.getElementsByClassName('cellMin')[0].offsetHeight
                } else {
                     sizeCell = document.getElementsByClassName('cell')[0].offsetHeight
                }

                
                let dragElem = document.createElement('div');
                dragElem.style.height = sizeCell + 'px'
                dragElem.style.width = sizeCell + 'px'
                dragElem.classList.add('cellDrag')
                    let textDrag = document.createElement('span');
                    textDrag.classList.add('textNumber');
                    textDrag.textContent = cards[i].textContent;
                dragElem.append(textDrag);

                let shiftX = event.clientX - cards[i].getBoundingClientRect().left;
                let shiftY = event.clientY - cards[i].getBoundingClientRect().top;


                dragElem.style.position = 'absolute';
                dragElem.style.zIndex = 5;
                body.append(dragElem);


                moveElem(event.pageX, event.pageY)

    
                function moveElem(pageX, pageY) {
                    dragElem.style.left = pageX  - shiftX  + 'px';
                    dragElem.style.top = pageY - shiftY  + 'px';
                }
    
                function onMouseMove(event) {   
                    moveElem(event.pageX, event.pageY);
                }
            
            document.addEventListener('mousemove', onMouseMove)
            

            dragElem.onmouseup = function(event) {

                dragElem.remove();
                document.removeEventListener('mousemove', onMouseMove);
                dragElem.onmouseup = null;
                let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                cards[i].classList.remove('drag');
                
                if (elemBelow.textContent == '') {

                    let cur = document.querySelector('.empty');
                    cur.classList.remove('empty');
                    cur.lastChild.textContent = cards[i].textContent
    
                    cards[i].classList.remove('drag');
                    cards[i].classList.add('empty');
    
    
                    if (i == emptyCell - gameSize) {
                        textNumber[emptyCell - gameSize].textContent = '';
                        emptyCell = emptyCell- gameSize;
                        if (isMute == false) { soundMove.play()}
                        moveValue++;
                        moves.textContent = 'Moves: ' + moveValue;
                    }
                        else if (i == emptyCell + +gameSize) {
                            textNumber[emptyCell + +gameSize].textContent = '';
                            emptyCell = emptyCell + +gameSize;
                            if (isMute == false) { soundMove.play()}
                            moveValue++;
                            moves.textContent = 'Moves: ' + moveValue;
                            }
                            else if (i == emptyCell + 1) {
                                textNumber[emptyCell + 1].textContent = '';
                                emptyCell = emptyCell + 1;
                                if (isMute == false) { soundMove.play()};
                                moveValue++;
                                moves.textContent = 'Moves: ' + moveValue;
                                    }
                                else if (i == emptyCell - 1) {
                                    textNumber[emptyCell - 1].textContent = '';
                                    emptyCell = emptyCell - 1;
                                    if (isMute == false) { soundMove.play()};
                                    moveValue++;
                                    moves.textContent = 'Moves: ' + moveValue;
                                            } 
                                    else if (isMute == false) { soundWrong.play()}
                                    changeColor()
                    }
                }

            setTimeout(clearDrag, 1000)

            function clearDrag() {
                dragElem.remove();
                cards[i].classList.remove('drag');
            }


            dragElem.ondragstart = function() {
                return false;
                }; 
                
            }; 
    }

}
