function burger() {
    const burgerMenuOpen = document.querySelector('.burgerMenu');
    const menu = document.querySelector('.burger');
    const burgerMenuClose = document.querySelectorAll('.clsMenu');
    
    burgerMenuOpen.addEventListener('click', openMenu);
    
    function openMenu () {
        menu.classList.remove('burgerHide');
        menu.classList.add('burgerVis')
        burgerMenuOpen.removeEventListener('click', openMenu);
        burgerMenuClose.forEach(el => el.addEventListener('click', closeMenu))
    }
    
    function closeMenu () {
        menu.classList.remove('burgerVis');
        menu.classList.add('burgerHide');
        burgerMenuOpen.addEventListener('click', openMenu);
        burgerMenuClose.forEach(el => el.removeEventListener('click', closeMenu))
    }
}

export {burger}