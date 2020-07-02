const buttonMenu = document.querySelector('#main-menu-button');

buttonMenu.addEventListener('click', toggleMenu);

/**
 * Toggles main menu
 * @param {Event} event 
 */
function toggleMenu(event) {
    const mainMenu = document.querySelector('.main-menu');
    mainMenu.classList.toggle('active');
}