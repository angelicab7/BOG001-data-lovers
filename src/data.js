
/*Loading indicator*/
const loadingIndicator = document.querySelector('.loading-indicator');

// isLoading lo usaremos para saber si hay una petición en curso y evitar sobrecargar la API
let isLoading = false;

// Mantiene la cuenta de la pagina actual en la que estamos
let currentPage = 1;

// Mantiene un registro de la cantidad de paginas de personajes que tiene la API
let totalPages = 30;

let charactersContainer = document.querySelector('#characters-container');

/*Scroll to the top */
const backToTopButton = document.querySelector('#backTop-button');
backToTopButton.addEventListener("click", () => {
    // Cada vez que hacemos click al botón Back To Top se lleva al usuario al principio de la pagina

    window.scrollTo(0, 0);
});

let filtersApplied = false;


/*get characters*/
export async function getCharacters(page = 1) {
    // Si currentPage es 31 ya no dejará pedir más datos a la API porque quiere decir que llegamos al final y ya pedimos todos los personajes
    if (currentPage <= totalPages && !filtersApplied) {

        // Añadimos la clase active a nuestro Loading indicator en el HTML
        loadingIndicator.classList.add('active');
        // Con la variable isLoading podemos saber si la peticion está cargando
        isLoading = true;
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`); // Template literal para concatenar
        const data = await response.json();
        // Cuando termina la peticion ponemos isLoading como falso para indicar que terminó y ya no hay nada cargando
        isLoading = false;
        // Quitamos la clase active de nuestro loading indicator en el HTML
        loadingIndicator.classList.remove('active');
        console.log(data);
        totalPages = data.info.pages;
        data.results.forEach(character =>
            charactersContainer.innerHTML += cardCharacter(
                character.image,
                character.name,
                character.status,
                character.location.name,
                character.origin.name,
                character.species
            )
        );
    }
};

getCharacters();


/*Flip card*/
export function cardCharacter(urlImage, name, status, location, origin, specie) {
    return (
        `
        <div class="column">
                <div class="card flip">
                    <div class="card-container">
                        <div class="card-front">
                            <img src="${urlImage}" alt="image" class="card-image" />
                            <div class="card-content">
                                <h3 class="card-title">${name}</h3>
                            </div>
                        </div>
                        <div class="card-back font-color">
                            <div class="card-content">
                                <p class="card-description">
                                     <div class="conv-icon" id="main-menu-button"> 
                                     <i class="fas fa-heart"></i> Status: ${status}
                                    </div>
                                </p>
                                <p class="card-description">
                                     <div class="conv-icon" id="main-menu-button">
                                    <i class="fas fa-user-circle"></i>  Specie: ${specie}
                                   </div>
                                </p>
                                <p class="card-description"> 
                                    <div class="conv-icon" id="main-menu-button"> 
                                    <i class="fas fa-globe-americas"></i>  Origin: ${origin}
                                   </div>
                                </p>
                                <p class="card-description">
                                     <div class="conv-icon" id="main-menu-button"> 
                                    <i class="fas fa-map-pin"></i> Current location: ${location}
                                   </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    )
};

/*Infinite Scroll*/
//Calcula la altura del documento html
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

 //Este evento es llamado cada vez que el scroll se mueve


window.onscroll = function () {
    /**
     * Con la pocision del scroll se le suman 40 pixeles
     * Si la posicion del scroll es mayor a la altura del documento, quiere decir que hemos llegado al final de la pagina
     */
    const isAtTheEnd = getScrollTop() + 40 > getDocumentHeight() - window.innerHeight;
    if (isAtTheEnd) {
        /**
         * En caso que hayamos llegado al final del documento comprobamos si no está cargando previamente el fetch
         * para evitar que pida datos una tras otro y se sobrecargue
         * 
         * Si no está cargando entonces procedemos a hacer el fetch
         */
        if (!isLoading) {
            // La pagina comienza en 1
            // Cada vez que hacemos scroll aumentamos el paginador en 1
            currentPage++;
            // Luego de aumentar el paginador, hacemos el fetch
            getCharacters(currentPage);
        }
    }
};



//Buscador//

const searchForm = document.querySelector('#searchIn');
const searchButton = document.querySelector('#searchButton');

export const filter = async () => {

    if (searchForm.value) {
        filtersApplied = true;
    } else {
        filtersApplied = false;
    }
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(searchForm.value)}`);
    const data = await response.json();
    console.log(data);
    charactersContainer.innerHTML = "";
    data.results.forEach(character =>
        charactersContainer.innerHTML += cardCharacter(
            character.image,
            character.name,
            character.status,
            character.location.name,
            character.origin.name,
            character.species
        )
    );
}

searchButton.addEventListener('click', filter)



/*Sort function*/

const speciesSort = document.querySelector('#filter-input-species');

export const species = async () => {
    if (speciesSort.value) {
        filtersApplied = true;
    } else {
        filtersApplied = false;
    }
    const response = await fetch(`https://rickandmortyapi.com/api/character/?species=${speciesSort.value}`);
    const data = await response.json();
    console.log(data);
    charactersContainer.innerHTML = "";
    data.results.forEach(character =>
        charactersContainer.innerHTML += cardCharacter(
            character.image,
            character.name,
            character.status,
            character.location.name,
            character.origin.name,
            character.species
        )
    );
}

speciesSort.addEventListener('change', species)


/*alphabethic
async function searchOrder(specialName) {
    console.log(specialName);

    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${specialName}`);
    const data = await response.json();
    console.log(data);

    //charactersContainer.innerHTML = "";
    data.results.forEach(character =>
        charactersContainer.innerHTML += cardCharacter(
            character.image,
            character.name,
            character.status,
            character.location.name,
            character.origin.name,
            character.species
        )
    );

}
const alphabethicSort = document.querySelector('#filter-input-order');

const alphabethic = async () => {

    if (alphabethicSort.value) {
        filtersApplied = true;
    } else {
        filtersApplied = false;
    }


    if (alphabethicSort.value === "0") {
        returngetCharacters();
    }
    else if (alphabethicSort.value === "1") {

        let namesChar = [];
        for (var i = currentPage; i <= totalPages; i++) {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${i}`);
            const data = await response.json();
            console.log(data);
            totalPages = data.info.pages;

            data.results.forEach(character =>
                namesChar.push(character.name));
        }

        namesChar.sort();

        charactersContainer.innerHTML = "";
        namesChar.forEach(element => console.log(element));
        namesChar.forEach(element => searchOrder(element));
    }

    else if (alphabethicSort.value === "2") {

        let namesChar = [];
        for (var i = currentPage; i <= totalPages; i++) {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${i}`);
            const data = await response.json();
            console.log(data);
            totalPages = data.info.pages;

            data.results.forEach(character =>
                namesChar.push(character.name));
        }

        namesChar.sort();
        namesChar.reverse();
        charactersContainer.innerHTML = "";
        namesChar.forEach(element => console.log(element));
        namesChar.forEach(element => searchOrder(element));
    }
}

alphabethicSort.addEventListener('change', alphabethic)


