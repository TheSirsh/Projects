// Burger-menu
let menuButton = document.querySelector('.menuImg');
let burgerMenu = document.querySelector('.navpanel')
let menuClose = document.querySelectorAll('.navLink');
let overlay = document.querySelector('.travel');

menuButton.addEventListener('click', function() {
    burgerMenu.classList.add('openM');
    burgerMenu.classList.remove('closeM');
})

menuClose.forEach(element=>element.addEventListener('click', function() {
    burgerMenu.classList.remove('openM');
    burgerMenu.classList.add('closeM');
}));

document.addEventListener('click', function(el) {
    if ( el.target.id != 'menuImg' && el.target.id != 'navpanel') {
    burgerMenu.classList.remove('openM');
    burgerMenu.classList.add('closeM');
    }
});

// Carousel
let positionCarousel = 0;
let element = document.getElementById('carouselCell');
let imageWidthMob = element.offsetWidth;
let marginPosition = 0;
let selArr = document.querySelectorAll('.circleDeact');

backArrow.addEventListener('click', function()
    {
        if (positionCarousel >= 1) {
            positionCarousel--;
            if ( positionCarousel == 0) {
                backArrow.classList.remove('backArrow');
                backArrow.classList.add('backArrowDeact');
            }
            marginPosition += imageWidthMob;
            carousel.style.marginLeft = marginPosition + 'px';
            forwArrow.classList.remove('forwArrowDeact');
            forwArrow.classList.add('forwArrow');
            circleSelectors (positionCarousel, 1);
}})

forwArrow.addEventListener('click', function()
    {
        if (positionCarousel <= 1) {
            positionCarousel++;
            if ( positionCarousel == 2) {
                forwArrow.classList.remove('forwArrow');
                forwArrow.classList.add('forwArrowDeact');
                }
            marginPosition -= imageWidthMob;
            carousel.style.marginLeft = marginPosition + 'px'
            backArrow.classList.remove('backArrowDeact');
            backArrow.classList.add('backArrow');
            circleSelectors (positionCarousel, -1);

}})

function circleSelectors (num, i) {
    let act = selArr[num];
    let deAct = selArr[num+i]
    act.classList.remove('circleDeact');
    act.classList.add('circle');
    deAct.classList.remove('circle');
    deAct.classList.add('circleDeact');
return 
}

//PopUp
let popUpLoginBtn = document.querySelectorAll('.popUpLoginBtn');
let popUpLogin = document.getElementById('popUp');
let blurPop = document.querySelector('.loginPopUpBackgroundDisable')


document.addEventListener('click', function(element) {
    if (element.target == blurPop) {
        popUpLogin.classList.add('loginPopUpDisable');
        popUpLogin.classList.remove('loginPopUpEnable');
        popUpLogin.classList.remove('signInPopUp');
        blurPop.classList.remove('loginPopUpBackground');
        blurPop.classList.add('loginPopUpBackgroundDisable');
        event.stopPropagation();
}});


popUpLoginBtn.forEach(element=>element.addEventListener('click', function()
    {
        popUpLogin.classList.remove('loginPopUpDisable');
        popUpLogin.classList.remove('signInPopUp');
        secondPop.forEach(element => element.classList.add('popUpDisable'));
        mainPopUp.forEach(element => element.classList.remove('popUpDisable'));
        popUpLogin.classList.add('loginPopUpEnable');
        blurPop.classList.remove('loginPopUpBackgroundDisable');
        blurPop.classList.add('loginPopUpBackground');
        event.stopPropagation();
}));

let form1 = document.forms.mail;
let form2 = document.forms.pass;
let signAlert1 = form1.elements.st
let signAlert2 = form2.elements.nd;

let popUpSignInBtn = document.querySelector('.popUpSignIn');

popUpSignInBtn.addEventListener('click', function() {
    alert('Your E-Mail: ' + signAlert1.value +'\nYour Password: ' + signAlert2.value);
});

let mainPopUp = document.querySelectorAll('.mainPop');
let secondPop = document.querySelectorAll('.secondPop');
let regSignIn = document.querySelector('.footLinkPopUpReg');
let logSignIn = document.querySelector('.footLinkPopUpLog')

regSignIn.addEventListener('click', function() {
    mainPopUp.forEach(element => element.classList.add('popUpDisable'));
    secondPop.forEach(element => element.classList.remove('popUpDisable'));
    popUpLogin.classList.remove('loginPopUpEnable');
    popUpLogin.classList.add('signInPopUp');
    event.stopPropagation();
});

logSignIn.addEventListener('click', function() {
    secondPop.forEach(element => element.classList.add('popUpDisable'));
    mainPopUp.forEach(element => element.classList.remove('popUpDisable'));
    popUpLogin.classList.remove('signInPopUp');
    popUpLogin.classList.add('loginPopUpEnable');
    event.stopPropagation();
});



