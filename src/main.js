import { getCharacters, species, cardCharacter } from './data.js';

/* menu*/
const buttonMenu = document.querySelector('#main-menu-button');
buttonMenu.addEventListener('click', toggleMenu);

const mainMenu = document.querySelector('.main-menu');

let menuOpened = false;

/**
 * Toggles main menu
 * @param {Event} event 
 */
function toggleMenu(event) {
    mainMenu.classList.toggle('active');
    menuOpened = !menuOpened;
}

window.addEventListener('click', (event) => {
    if (menuOpened && !mainMenu.contains(event.target) && !buttonMenu.contains(event.target)) {
        mainMenu.classList.remove('active');
        menuOpened = false;
    }
});


//funcion slider//

const slidesElement = document.querySelector(".slider");
const indicatorElement = document.querySelector(".slider-indicator");

if (slidesElement && indicatorElement) {
    const slides = slidesElement.children;
    const indicator = indicatorElement.children;

    for (let i = 0; i < indicator.length; i++) {
        indicator[i].addEventListener("click", function () {

            for (let j = 0; j < indicator.length; j++) {
                indicator[j].classList.remove("active");
            }
            this.classList.add("active");
            const id = this.getAttribute("data-id");
            for (let j = 0; j < slides.length; j++) {
                slides[j].classList.remove("active");
            }

            slides[id].classList.add("active");

        })
    }
}




