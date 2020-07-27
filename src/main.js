import {getCharacters}  from './data.js';

// isLoading lo usaremos para saber si hay una petición en curso y evitar sobrecargar la API
let isLoading = false;
// Numero inicial de la pagina
let currentPage = 1;
/*Loading indicator*/
const loadingIndicator = document.querySelector('.loading-indicator');
getCharacters(currentPage, isLoading, loadingIndicator);


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


//funcion slider automatico//
let indice = 1;
muestraSlides(indice);


function posicionSlide(n){
    muestraSlides(indice=n);
}
setInterval(function tiempo(){
    muestraSlides(indice+=1)
},10000);
function muestraSlides(n){
    let i;
    let slides = document.getElementsByClassName('Slider');
    let barras = document.getElementsByClassName('barra');

    if(n > slides.length){
        indice = 1;
    }
    if(n < 1){
        indice = slides.length;
    }
    for(i = 0; i < slides.length; i++){
        slides[i].style.display = 'none';
    }
    for(i = 0; i < barras.length; i++){
        barras[i].className = barras[i].className.replace(" active", "");
    }

    slides[indice-1].style.display = 'block';
    barras[indice-1].className += ' active';
}


/*Infinite Scroll Calcula la altura del documento html*/
function getDocumentHeight() {
    const body = document.body; // Obtener todo el body del documento
    const html = document.documentElement; // Obtener todo el documento html

    // Math.max retorna el mayor numero dada una lista de numeros
    return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
};
//Calcula la posicion actual del scroll
function getScrollTop() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

/*Scroll to the top */
const backToTopButton = document.querySelector('#backTop-button');
if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
        // Cada vez que hacemos click al botón Back To Top se lleva al usuario al principio de la pagina

        window.scrollTo(0, 0);
    });
}


//Este evento es llamado cada vez que el scroll se mueve
window.onscroll = function () {
    /* Con la pocision del scroll se le suman 40 pixeles
     * Si la posicion del scroll es mayor a la altura del documento, quiere decir que hemos llegado al final de la pagina */

    const isAtTheEnd = getScrollTop() + 40 > getDocumentHeight() - window.innerHeight;
    if (isAtTheEnd) {
        /*En caso que hayamos llegado al final del documento comprobamos si no está cargando previamente el fetch
         * para evitar que pida datos una tras otro y se sobrecargue
         * Si no está cargando entonces procedemos a hacer el fetch
         */
        if (!isLoading) {
            // La pagina comienza en 1
            // Cada vez que hacemos scroll aumentamos el paginador en 1
            currentPage++;
            // Luego de aumentar el paginador, hacemos el fetch
            //loadingIndicator.classList.add('active');
            getCharacters(currentPage, isLoading, loadingIndicator);
            //loadingIndicator.classList.remove('active');
        }
    }
};