/* menu*/
const buttonMenu = document.querySelector('#main-menu-button');
buttonMenu.addEventListener('click', toggleMenu);

const mainMenu = document.querySelector('.main-menu');

let menuOpened = false;

/**
 * Toggles main menu
 * @param {Event} event 
 */
function toggleMenu() {
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
//funcion slider automatico//
let indice = 1;
muestraSlides(indice);

setInterval(function tiempo() {
    muestraSlides(indice += 1)
}, 8000);
function muestraSlides(n) {
    let i;
    let slides = document.getElementsByClassName('Slider');
    let barras = document.getElementsByClassName('barra');

    if (n > slides.length) {
        indice = 1;
    }
    if (n < 1) {
        indice = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (i = 0; i < barras.length; i++) {
        barras[i].className = barras[i].className.replace(" active", "");
    }

    slides[indice - 1].style.display = 'block';
    barras[indice - 1].className += ' active';
}

/*Scroll to the top */
const backToTopButton = document.querySelector('#backTop-button');
if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
        // Cada vez que hacemos click al botón Back To Top se lleva al usuario al principio de la pagina

        window.scrollTo(0, 0);
    });
}